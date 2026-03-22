# Institutional Stock Prediction (ISP) AI

A production-ready, AI-powered stock market prediction platform built with Next.js, FastAPI, and Machine Learning. The application dynamically predicts stock price movements (UP, DOWN, HOLD) using a dual-layered ML ensemble (LSTM & XGBoost).

## Project Structure (Monorepo)

This repository is split into four distinct modules:
- `frontend/`: Next.js React application (UI & Dashboard)
- `backend/`: FastAPI Python server (API & WebSockets)
- `model_engine/`: Machine Learning inference and feature generation
- `data_utils/`: Historical and real-time data fetching utilities

---

## How to Run Locally

You will need two terminal windows to run the frontend and backend simultaneously.

### 1. Start the Backend API (Python)
The backend handles data fetching, indicator calculation, and AI predictions.

1. Open a terminal in the root directory.
2. Ensure you have Python installed and the virtual environment is activated (if you use one).
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server using Uvicorn:
   ```bash
   python -m uvicorn backend.api.api:app --port 8000 --host 0.0.0.0
   ```
   *The API will be available at http://localhost:8000*

### 2. Start the Frontend Dashboard (Next.js)
The frontend provides the interactive trading chart and prediction interface.

1. Open a **second terminal** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. **View the App**: Open your browser and go to http://localhost:3000

---

## How to Run using Docker (Production & Easy Setup)

If you have Docker installed, you can spin up the entire stack with a single command. The `docker-compose.yml` file is pre-configured to handle both the frontend, backend, and internal database/redis requirements.

1. Open a terminal in the root directory.
2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
3. Once the build completes, access the dashboard at http://localhost:3000

---

## Features
- Real-time Candlestick charts with dynamic timeframes (1m, 5m, 1h, 1d)
- AI Ensemble Predictions combining LSTM Deep Learning and XGBoost models
- Live Technical Analysis Signals (RSI, MACD, Bollinger Bands, VWAP)
- WebSocket integration for live data streaming
