import { Itinerary } from "@/lib/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const generatePlan = async (query: string): Promise<Itinerary> => {
  const response = await fetch(`${API_BASE_URL}/api/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_query: query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'An unknown error occurred while generating the plan.');
  }

  const data = await response.json();
  return data.itinerary;
};