from fastapi import APIRouter, HTTPException
from langchain_core.messages import HumanMessage

from app.schemas import PlanRequest, PlanResponse
from agents.graph import agent_executor # <-- Ensure this line is correct

router = APIRouter()

@router.post("/plan", tags=["Planning"])
async def get_plan(request: PlanRequest):
    if not request.user_query:
        raise HTTPException(status_code=400, detail="User query cannot be empty.")

    try:
        inputs = {"messages": [HumanMessage(content=request.user_query)]}
        
        final_state = None
        async for event in agent_executor.astream_events(inputs, version="v2"):
            kind = event["event"]
            if kind == "on_chain_end":
                final_state = event["data"]["output"]

        if not final_state or not final_state.get("itinerary"):
            raise HTTPException(status_code=500, detail="Agent failed to generate a valid itinerary.")
            
        return {"itinerary": final_state["itinerary"]}

    except Exception as e:
        print(f"An unexpected error occurred during planning: {e}")
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {str(e)}")