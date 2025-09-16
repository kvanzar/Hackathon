# backend/services/tools.py

from langchain_core.tools import tool
from langchain_community.tools import DuckDuckGoSearchRun
from amadeus import Client, ResponseError
from playwright.async_api import async_playwright
import requests
import os
from pydantic.v1 import BaseModel, Field # <-- Import Pydantic models
from typing import List, Dict, Any, Optional

# --- New Pydantic Schema for the Final Itinerary ---
# This forces the AI to produce the correct JSON structure.
class DailyPlan(BaseModel):
    day: int = Field(..., description="The day number of the plan (e.g., 1, 2, 3).")
    title: str = Field(..., description="A creative title for the day's activities.")
    activities: str = Field(..., description="A detailed description of the activities for the day.")
    accommodation: Optional[str] = Field(None, description="The name of the hotel or accommodation for the night.")

class ItinerarySchema(BaseModel):
    title: str = Field(..., description="A creative and descriptive title for the entire travel plan.")
    destination: str = Field(..., description="The primary destination city and country.")
    budget_summary: Dict[str, Any] = Field(..., description="A summary of the estimated budget.")
    daily_plan: List[DailyPlan] = Field(..., description="A list of day-by-day plans.")
    transport_details: Optional[Dict[str, Any]] = Field(None, description="Details about flights or other transportation.")

# --- The New "Finish" Tool ---
@tool(args_schema=ItinerarySchema)
def finish_planning(title: str, destination: str, budget_summary: dict, daily_plan: list, transport_details: Optional[dict] = None) -> dict:
    """
    Submits the final, complete travel itinerary.
    Call this tool ONLY when you have gathered all necessary information (flights, attractions, etc.)
    and are ready to present the final plan to the user.
    """
    # The tool's job is just to return the data in a structured way.
    return {
        "title": title,
        "destination": destination,
        "budget_summary": budget_summary,
        "daily_plan": [plan.dict() for plan in daily_plan],
        "transport_details": transport_details,
    }

# --- Existing Tools (No Changes) ---
search_tool = DuckDuckGoSearchRun()

@tool
async def browse_website(url: str) -> str:
    # ... (no changes to this function)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto(url, timeout=15000)
            page_text = await page.evaluate("() => document.body.innerText")
        except Exception as e:
            await browser.close()
            return f"Error browsing website: {e}"
        await browser.close()
        return page_text

@tool
def search_flights(origin_iata: str, destination_iata: str, departure_date: str) -> dict:
    # ... (no changes to this function)
    try:
        client = Client(
            client_id=os.getenv("AMADEUS_API_KEY"),
            client_secret=os.getenv("AMADEUS_API_SECRET")
        )
        response = client.shopping.flight_offers_search.get(
            originLocationCode=origin_iata,
            destinationLocationCode=destination_iata,
            departureDate=departure_date,
            adults=1,
            max=3
        )
        return response.data
    except ResponseError as error:
        return {"error": f"Amadeus API Error: {error}"}

@tool
def find_points_of_interest(latitude: float, longitude: float, categories: list[str]) -> dict:
    # ... (no changes to this function)
    API_KEY = os.getenv("GEOAPIFY_API_KEY")
    if not API_KEY:
        return {"error": "Geoapify API key not configured."}
    API_URL = "https://api.geoapify.com/v2/places"
    params = {
        'categories': ",".join(categories),
        'filter': f'circle:{longitude},{latitude},5000',
        'bias': f'proximity:{longitude},{latitude}',
        'limit': 10,
        'apiKey': API_KEY
    }
    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": f"Geoapify API Error: {e}"}

# This is the new, updated list of tools for the agent
all_tools = [search_tool, browse_website, search_flights, find_points_of_interest, finish_planning]