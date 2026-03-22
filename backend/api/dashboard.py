import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import requests
from datetime import datetime

st.set_page_config(page_title="Institutional Prediction Dashboard", layout="wide")

st.title("🛡️ Institutional Stock Prediction & Decision Intelligence")

# Sidebar
symbol = st.sidebar.selectbox("Select Asset", ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK"])
timeframe = st.sidebar.selectbox("Select Timeframe", ["1m", "5m", "15m", "1h", "1d"])

# Main Metrics
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Direction", "UP", delta="+2.5% Prob")
with col2:
    st.metric("Confidence", "87%", delta="High")
with col3:
    st.metric("Risk Score", "2/10", delta="Low")
with col4:
    st.metric("Volatility Regime", "Low Clustering")

# Charts
st.subheader(f"Price Analysis: {symbol} ({timeframe})")
# Mock data for demonstration
df = pd.DataFrame({
    'date': pd.date_range(start='2026-03-01', periods=100, freq='H'),
    'close': [100 + i + (i % 5) for i in range(100)],
    'prediction': [100 + i + 2 for i in range(100)]
})

fig = go.Figure()
fig.add_trace(go.Scatter(x=df['date'], y=df['close'], name='Live Price', line=dict(color='#00ff00')))
fig.add_trace(go.Scatter(x=df['date'].iloc[-10:], y=df['prediction'].iloc[-10:], name='AI Prediction', line=dict(dash='dash', color='#ff00ff')))
st.plotly_chart(fig, use_container_width=True)

# Feature Importance (SHAP)
st.subheader("💡 Explainable AI (SHAP Feature Importance)")
features = {"RSI": 0.45, "EMA_200": 0.30, "MACD": 0.15, "Volatility": 0.10}
st.bar_chart(pd.Series(features))

# Log Table
st.subheader("Recent Signals History")
st.table(pd.DataFrame([
    {"Time": "13:30", "Symbol": symbol, "Signal": "UP", "Prob": "89%", "Status": "Target Hit"},
    {"Time": "13:15", "Symbol": symbol, "Signal": "DOWN", "Prob": "72%", "Status": "Exit Signal"},
]))
