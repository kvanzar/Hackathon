# backend/utils/parsers.py

import json
from langchain_core.output_parsers import BaseOutputParser
from typing import Any

class ItineraryJsonParser(BaseOutputParser):
    """
    A custom parser to extract a JSON object from the LLM's string output.
    It handles cases where the JSON is embedded in markdown code blocks.
    """
    def parse(self, text: str) -> Any:
        # Check if the response is wrapped in a markdown code block
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            # If parsing fails, the graph will not update the itinerary
            print("---PARSING FAILED: LLM output was not valid JSON.---")
            return None