import pandas as pd
from typing import List, Dict, Any

class SignalGenerator:
    """
    Generates human-readable analysis signals based on technical indicators.
    Matches the "ANALYSIS SIGNALS" section in the UI.
    """
    
    @staticmethod
    def get_signals(df: pd.DataFrame) -> List[Dict[str, Any]]:
        if df.empty or len(df) < 2:
            return []
            
        last = df.iloc[-1]
        prev = df.iloc[-2]
        signals = []
        
        # RSI Signal
        rsi = last.get('RSI_14', 50)
        if rsi > 70:
            signals.append({"name": "RSI Overbought", "value": f"{rsi:.1f}", "status": "bearish", "weight": 1.5})
        elif rsi < 30:
            signals.append({"name": "RSI Oversold", "value": f"{rsi:.1f}", "status": "bullish", "weight": 1.5})
        else:
            status = "bullish" if rsi > 50 else "bearish"
            signals.append({"name": f"RSI Leaning {status.capitalize()}", "value": f"{rsi:.1f}", "status": status, "weight": 1.0})
            
        # MACD Signal
        macd = last.get('MACD_12_26_9', 0)
        signal = last.get('MACDs_12_26_9', 0)
        if macd > signal and prev.get('MACD_12_26_9', 0) <= prev.get('MACDs_12_26_9', 0):
            signals.append({"name": "MACD Bullish Crossover", "value": f"{macd:.2f}", "status": "bullish", "weight": 2.0})
        elif macd < signal:
            signals.append({"name": "MACD Bearish Momentum", "value": f"{macd:.2f}", "status": "bearish", "weight": 2.0})
        else:
            signals.append({"name": "MACD Bullish Momentum", "value": f"{macd:.2f}", "status": "bullish", "weight": 1.5})
            
        # SMA/EMA Trends
        sma20 = last.get('SMA_20', 0)
        sma50 = last.get('SMA_50', 0)
        price = last.get('close', 0)
        if price > sma20 > sma50:
            signals.append({"name": "Strong Uptrend (Price > SMA20 > SMA50)", "value": "Bullish", "status": "bullish", "weight": 2.5})
        elif price < sma20 < sma50:
            signals.append({"name": "Strong Downtrend (Price < SMA20 < SMA50)", "value": "Bearish", "status": "bearish", "weight": 2.5})
            
        # Bollinger Bands
        upper = last.get('BBU_20_2.0', 0)
        lower = last.get('BBL_20_2.0', 0)
        if price >= upper:
            signals.append({"name": "At Upper Bollinger Band", "value": f"{price:.2f}", "status": "bearish", "weight": 1.5})
        elif price <= lower:
            signals.append({"name": "At Lower Bollinger Band", "value": f"{price:.2f}", "status": "bullish", "weight": 1.5})
            
        # VWAP
        vwap = last.get('VWAP_D', 0)
        if price > vwap:
            signals.append({"name": "Above VWAP", "value": f"{vwap:.2f}", "status": "bullish", "weight": 1.0})
        else:
            signals.append({"name": "Below VWAP", "value": f"{vwap:.2f}", "status": "bearish", "weight": 1.0})
            
        return signals
