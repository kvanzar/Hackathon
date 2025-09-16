# backend/agents/graph.py

import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

from agents.state import AgentState
from agents.prompts import AGENT_PROMPT
from services.tools import all_tools

llm = ChatOpenAI(model="gpt-4o", temperature=0)
agent_runnable = AGENT_PROMPT | llm.bind_tools(all_tools)

def agent_node(state: AgentState):
    """The primary node that runs the agent and its tools."""
    result = agent_runnable.invoke(state)
    return {"messages": [result]}

tool_node = ToolNode(all_tools)

def should_continue(state: AgentState):
    """Determines whether to continue using tools or to finish."""
    last_message = state["messages"][-1]
    # If the agent has no more tools to call, we can finish
    if not last_message.tool_calls:
        return "end"
    # If the agent has decided to use the finish_planning tool, we are done
    if any(call["name"] == "finish_planning" for call in last_message.tool_calls):
        return "end"
    # Otherwise, continue the tool-calling loop
    return "continue"

def set_itinerary_node(state: AgentState):
    """
    Finds the result of the `finish_planning` tool call and sets it as the
    final itinerary in the state.
    """
    for message in reversed(state["messages"]):
        if isinstance(message, ToolMessage) and message.name == "finish_planning":
            # The content of the ToolMessage will be the JSON from our tool
            itinerary_data = json.loads(message.content)
            return {"itinerary": itinerary_data}
    return {}

workflow = StateGraph(AgentState)
workflow.add_node("agent", agent_node)
workflow.add_node("tools", tool_node)
workflow.add_node("set_itinerary", set_itinerary_node)

workflow.set_entry_point("agent")

workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "continue": "tools",
        "end": "tools", # The finish_planning tool still needs to run
    },
)

workflow.add_edge("tools", "agent")

# A new path to set the itinerary and end the graph
workflow.add_conditional_edges(
    "tools",
    # After tools run, check if the last message was a `finish_planning` call
    lambda state: "end" if isinstance(state["messages"][-1], ToolMessage) and state["messages"][-1].name == "finish_planning" else "continue",
    {
        "continue": "agent",
        "end": "set_itinerary"
    }
)
workflow.add_edge("set_itinerary", END)

agent_executor = workflow.compile()