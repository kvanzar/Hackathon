from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class PlanRequest(BaseModel):
    user_query: str

class DailyPlan(BaseModel):
    day: int
    title: str
    activities: str
    accommodation: Optional[str] = None

class Itinerary(BaseModel):
    title: str
    destination: str
    budget_summary: Dict[str, Any]
    daily_plan: List[DailyPlan]
    transport_details: Optional[Dict[str, Any]] = None

class PlanResponse(BaseModel):
    itinerary: Itinerary