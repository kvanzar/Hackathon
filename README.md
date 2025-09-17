# ✈️ Travel AI Agent

An autonomous AI agent that dynamically researches and plans detailed travel itineraries using a multi-tool workflow and real-world data.

[](https://opensource.org/licenses/MIT)
[](https://www.python.org/)
[](https://www.typescriptlang.org/)

This project leverages a sophisticated agentic backend built with LangChain and LangGraph to create a smart trip planner. The AI agent can understand complex user queries, search the web for information, scrape websites for details, find flights, and discover points of interest to construct a complete, day-by-day travel plan.

## ✨ Features

  - **Autonomous Agentic Workflow:** Powered by LangGraph, the agent reasons and decides which tools to use in a dynamic sequence.
  - **Real-Time Web Research:** Uses DuckDuckGo to find relevant information and Playwright to scrape websites for details.
  - **Live API Integration:** Connects to real-world APIs for flight data (Amadeus) and points of interest (Geoapify).
  - **Dynamic Itinerary Generation:** Synthesizes all gathered information into a structured, day-by-day itinerary.
  - **Interactive Frontend:** A clean, map-centric UI built with React, Vite, and TypeScript.

-----

## 🛠️ Tech Stack

| Area    | Technologies                                                                                             |
| :------ | :------------------------------------------------------------------------------------------------------- |
| **Backend** | Python, FastAPI, LangChain, LangGraph, OpenAI (`gpt-4o`), Uvicorn, Playwright, Amadeus, Geoapify         |
| **Frontend**| React, Vite, TypeScript, Tailwind CSS, Leaflet.js                                                        |
| **Tooling** | `uv` (Python), `npm` (Node.js), Git & GitHub                                                               |

-----

## ⚙️ System Architecture

The backend operates as a state machine where an AI agent loops through a "reason-act" cycle until it has gathered enough information to complete its goal.

```
User Query
     │
     ▼
┌────────────┐
│ Agent Node │
└────────────┘
     │
     ▼ (Decides which tool to use)
┌───────────┐      ┌────────────────────────────┐
│ Tool Node ├───►  │ [APIs & Web Scraping]      │
└───────────┘      │ - DuckDuckGo Search        │
     │             │ - Playwright Browse        │
     ▼ (Result)    │ - Amadeus Flights          │
┌────────────┐     │ - Geoapify Places          │
│ Agent Node │     └────────────────────────────┘
└────────────┘
     │
     ▼ (Decides the plan is ready)
┌──────────────────┐
│ Final Itinerary  │
└──────────────────┘
```

-----

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

  - Python 3.9+
  - Node.js 20.x or higher
  - `uv` Python package manager (`pip install uv`)
  - API Keys for:
      - OpenAI
      - Amadeus
      - Geoapify

### Backend Setup

1.  **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2.  **Create the Environment File**

      - Rename the `.env.example` file to `.env`.
      - Open the `.env` file and add your actual API keys.

    <!-- end list -->

    ```text
    OPENAI_API_KEY="sk-..."
    AMADEUS_API_KEY="..."
    AMADEUS_API_SECRET="..."
    GEOAPIFY_API_KEY="..."
    ```

3.  **Set Up Environment & Install Packages**

    ```bash
    # Create the virtual environment
    uv venv

    # Activate the environment (macOS/Linux)
    source .venv/bin/activate
    # On Windows: .venv\Scripts\activate

    # Install all packages from pyproject.toml
    uv pip install -e .
    ```

4.  **Install Playwright Browsers**
    This is a one-time setup to download the browsers needed for scraping.

    ```bash
    playwright install
    ```

5.  **Run the Backend Server**

    ```bash
    uvicorn app.main:app --reload
    ```

    The backend will be running at `http://localhost:8000`. Keep this terminal open.

### Frontend Setup

1.  **Open a New Terminal**
    Leave the backend server running in its own terminal.

2.  **Navigate to the Frontend Directory**

    ```bash
    cd frontend
    ```

3.  **Create the Environment File**

      - Rename `.env.local.example` to `.env.local` (or create it if it doesn't exist).
      - Ensure it has the following content:

    <!-- end list -->

    ```text
    VITE_API_BASE_URL="http://localhost:8000"
    ```

4.  **Install Dependencies**

    ```bash
    npm install
    ```

5.  **Run the Frontend Dev Server**

    ```bash
    npm run dev
    ```

    The frontend will be running at `http://localhost:5173`. Open this URL in your browser.

-----

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
