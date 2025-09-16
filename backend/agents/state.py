from typing import TypedDict, Annotated, List, Optional
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], lambda x, y: x + y]
    itinerary: Optional[dict]