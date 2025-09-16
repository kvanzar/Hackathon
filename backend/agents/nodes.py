import json
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from .prompts import ROUTER_PROMPT, ITINERARY_PROMPT
from .state import AgentState

# Initialize models and parsers
llm = ChatOpenAI(model="gpt-4o", temperature=0)
str_parser = StrOutputParser()
json_parser = JsonOutputParser()

def router_node(state: AgentState) -> str:
    """Decides the next step in the workflow."""
    print("---ROUTER---")
    prompt = PromptTemplate(
        template=ROUTER_PROMPT,
        input_variables=["state", "user_query"],
    )
    chain = prompt | llm | str_parser
    next_step = chain.invoke({
        "state": {k: v for k, v in state.items() if k != 'messages'},
        "user_query": state['user_query']
    })
    
    # Basic validation
    valid_steps = ['research', 'logistics', 'experience', 'synthesize', 'end']
    if next_step.lower().strip() in valid_steps:
        return next_step.lower().strip()
    return 'end' 

def research_node(state: AgentState) -> dict:
    """
    Analyzes the user query to extract key information.
    This is a simplified version; a real one would use tools to find best dates, etc.
    """
    print("---RESEARCHER---")

    state['destination'] = "Paris"
    state['travel_dates'] = {"start": "2025-10-05", "end": "2025-10-10"}
    state['budget'] = 2000
    state['preferences'] = {"interests": ["art", "food", "history"]}
    return state

def logistics_node(state: AgentState) -> dict:
    """Finds transportation options."""
    print("---LOGISTICS EXPERT---")

    state['transport_options'] = [{
        "flight": "Air France AF101", "price": 500, "duration": "8h"
    }]
    return state
    
def experience_node(state: AgentState) -> dict:
    """Finds accommodation and activities."""
    print("---EXPERIENCE CURATOR---")
    # Mocked data. A real agent would call the find_points_of_interest tool.
    state['accommodation_options'] = [{"name": "Hotel de Louvre", "price_per_night": 300}]
    state['activity_options'] = [{"name": "Eiffel Tower"}, {"name": "Louvre Museum"}]
    return state

def synthesize_node(state: AgentState) -> dict:
    """Generates the final itinerary."""
    print("---ITINERARY SYNTHESIZER---")
    prompt = PromptTemplate(
        template=ITINERARY_PROMPT,
        input_variables=list(state.keys())
    )
    chain = prompt | llm | json_parser
    
    itinerary_json = chain.invoke(state)
    state['itinerary'] = itinerary_json
    return state