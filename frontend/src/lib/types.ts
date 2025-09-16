export interface DailyPlan {
    day: number;
    title: string;
    activities: string;
    accommodation?: string;
  }
  
  export interface Itinerary {
    title: string;
    destination: string;
    budget_summary: {
      total: number;
      currency: string;
    };
    daily_plan: DailyPlan[];
    transport_details?: {
      description: string;
    };
  }