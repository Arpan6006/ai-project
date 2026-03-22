import pandas as pd
import pandas_ta as ta
import numpy as np
from typing import List

class FeatureEngine:
    """
    Institutional-grade Feature Engineering Engine.
    Handles Technical Indicators, Price Action, and Market Regimes.
    """

    @staticmethod
    def calculate_technical_indicators(df: pd.DataFrame) -> pd.DataFrame:
        """Adds standard technical indicators using pandas-ta."""
        df.columns = [c.lower() for c in df.columns]
        # Trend
        df['EMA_9'] = ta.ema(df['close'], length=9)
        df['EMA_21'] = ta.ema(df['close'], length=21)
        df['EMA_50'] = ta.ema(df['close'], length=50)
        df['EMA_200'] = ta.ema(df['close'], length=200)
        
        # Momentum
        df['RSI'] = ta.rsi(df['close'], length=14)
        macd = ta.macd(df['close'])
        df = pd.concat([df, macd], axis=1)
        
        # Volatility
        bbands = ta.bbands(df['close'], length=20, std=2)
        df = pd.concat([df, bbands], axis=1)
        df['ATR'] = ta.atr(df['high'], df['low'], df['close'], length=14)
        
        # Volume/Price Flow
        df['VWAP'] = ta.vwap(df['high'], df['low'], df['close'], df['volume'])
        
        return df

    @staticmethod
    def add_price_action_features(df: pd.DataFrame) -> pd.DataFrame:
        """Detects candlestick patterns and momentum shifts."""
        # Simple Pin Bar detection (Tail is 2x Body)
        body = abs(df['close'] - df['open'])
        upper_tail = df['high'] - df[['open', 'close']].max(axis=1)
        lower_tail = df[['open', 'close']].min(axis=1) - df['low']
        
        df['bullish_pin'] = (lower_tail > 2 * body) & (upper_tail < body)
        df['bearish_pin'] = (upper_tail > 2 * body) & (lower_tail < body)
        
        # Breakout Detection
        df['rolling_max_20'] = df['high'].rolling(window=20).max()
        df['breakout_up'] = df['close'] > df['rolling_max_20'].shift(1)
        
        return df

    @staticmethod
    def add_statistical_features(df: pd.DataFrame) -> pd.DataFrame:
        """Adds Z-scores, log returns, and volatility clustering."""
        df['log_return'] = np.log(df['close'] / df['close'].shift(1))
        df['volatility_20'] = df['log_return'].rolling(window=20).std()
        
        # Z-score of close relative to 20 SMA
        df['sma_20'] = df['close'].rolling(window=20).mean()
        df['std_20'] = df['close'].rolling(window=20).std()
        df['z_score'] = (df['close'] - df['sma_20']) / df['std_20']
        
        return df

    @staticmethod
    def detect_market_regime(df: pd.DataFrame) -> pd.DataFrame:
        """Classifies market as Trending or Ranging based on ADX."""
        adx = ta.adx(df['high'], df['low'], df['close'], length=14)
        df = pd.concat([df, adx], axis=1)
        
        df['regime'] = np.where(df['ADX_14'] > 25, 'Trending', 'Ranging')
        return df

    def build_feature_set(self, df: pd.DataFrame) -> pd.DataFrame:
        """Combines all feature categories into a single dataframe."""
        df = self.calculate_technical_indicators(df)
        df = self.add_price_action_features(df)
        df = self.add_statistical_features(df)
        df = self.detect_market_regime(df)
        return df.dropna()
