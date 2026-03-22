import yfinance as yf
import pandas as pd
import pandas_ta as ta
from typing import Optional, Dict, Any
from data_utils.utils.logger import setup_logger

logger = setup_logger(__name__)

class DataFetcher:
    """
    Handles fetching historical and real-time data using yfinance.
    """
    def __init__(self):
        pass

    def get_data(self, symbol: str, timeframe: str) -> pd.DataFrame:
        tf_map = {
            "1m": ("1m", "7d"),
            "5m": ("5m", "30d"),
            "15m": ("15m", "60d"),
            "1h": ("60m", "90d"),
            "1d": ("1d", "max")
        }
        interval, period = tf_map.get(timeframe, ("5m", "60d"))
        
        if not symbol.endswith(".NS") and not symbol.endswith(".BO"):
            ticker_symbol = f"{symbol}.NS"
        else:
            ticker_symbol = symbol

        try:
            ticker = yf.Ticker(ticker_symbol)
            df = ticker.history(period=period, interval=interval)
            
            if df.empty:
                logger.warning(f"No data found for {ticker_symbol}")
                return pd.DataFrame()
            
            # FORCE ALL COLUMNS TO LOWERCASE
            df.columns = [str(c).lower() for c in df.columns]
            
            # Ensure index is datetime and named 'timestamp' or something consistent
            df.index.name = 'timestamp'
            
            return df
        except Exception as e:
            logger.error(f"Error fetching data for {ticker_symbol}: {e}")
            return pd.DataFrame()

    def add_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        if df.empty:
            return df
            
        # Ensure columns are lowercase before indicators
        df.columns = [str(c).lower() for c in df.columns]
        
        try:
            df.ta.sma(length=20, append=True)
            df.ta.sma(length=50, append=True)
            df.ta.ema(length=12, append=True)
            df.ta.ema(length=26, append=True)
            df.ta.bbands(length=20, std=2, append=True)
            df.ta.rsi(length=14, append=True)
            df.ta.macd(fast=12, slow=26, signal=9, append=True)
            df.ta.atr(length=14, append=True)
            df.ta.vwap(append=True)
        except Exception as e:
            logger.error(f"Error adding indicators: {e}")
            
        return df
