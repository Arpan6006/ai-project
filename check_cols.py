import yfinance as yf
import pandas_ta as ta

def check_columns():
    df = yf.Ticker("RELIANCE.NS").history(period="5d", interval="5m")
    df.columns = [c.lower() for c in df.columns]
    df.ta.sma(length=20, append=True)
    df.ta.rsi(length=14, append=True)
    print("Columns after indicators:", df.columns.tolist())

if __name__ == "__main__":
    check_columns()
