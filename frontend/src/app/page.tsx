'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';
import TradingChart from '../components/TradingChart';
import PredictionPanel from '../components/PredictionPanel';
import { Search, Bell, User, Settings, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const SYMBOL_NAMES: Record<string, string> = {
  'RELIANCE': 'Reliance Industries',
  'TCS': 'Tata Consultancy Services',
  'INFY': 'Infosys Limited',
  'HDFCBANK': 'HDFC Bank Limited',
  'SBIN': 'State Bank of India',
  'ICICIBANK': 'ICICI Bank Limited'
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [symbol, setSymbol] = useState('RELIANCE');
  const [timeframe, setTimeframe] = useState('5m');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndicators, setActiveIndicators] = useState<Set<string>>(new Set(['EMA 12']));

  const timeframes = ['1m', '5m', '15m', '30m', '1h', '1d'];

  const toggleIndicator = (name: string) => {
    const newSet = new Set(activeIndicators);
    if (newSet.has(name)) newSet.delete(name);
    else newSet.add(name);
    setActiveIndicators(newSet);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/api/dashboard/${symbol}?tf=${timeframe}`);
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || 'Failed to fetch data');
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      console.error('Failed to fetch dashboard data', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const ws = new WebSocket(`ws://localhost:8000/ws/${symbol}?tf=${timeframe}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'update') {
        setData(message.data);
      }
    };

    ws.onerror = (err) => {
      console.warn('WebSocket error, falling back to polling...', err);
    };

    return () => ws.close();
  }, [symbol, timeframe]);

  if (error) {
    return (
      <div className={styles.dashboard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <AlertCircle size={48} color="#f6465d" />
        <h2 style={{ marginTop: '20px' }}>Dashboard Error</h2>
        <p style={{ color: '#848E9C' }}>{error}</p>
        <button className={styles.btn} style={{ marginTop: '20px' }} onClick={fetchData}>Retry</button>
      </div>
    );
  }

  if (!data && loading) return <div className={styles.dashboard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Platform...</div>;

  const ohlc = data?.ohlc_data || [];
  const volumeData = ohlc.map((d: any) => ({
    time: d.time,
    value: d.volume,
    color: d.close >= d.open ? '#2dbd85' : '#f6465d'
  }));

  const hasPriceData = data && data.current_price !== undefined;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#2962ff' }}>StockPredict AI</span> <span style={{ fontSize: '10px', background: '#2B3139', padding: '2px 4px', borderRadius: '2px' }}>NSE</span>
        </div>


        {hasPriceData && (
          <div style={{ marginLeft: '40px' }}>
            <div style={{ fontSize: '12px', color: '#848E9C' }}>{data?.symbol} <span style={{ fontSize: '10px' }}>{SYMBOL_NAMES[data?.symbol] || 'Equity'}</span></div>
            <div className={styles.priceDisplay}>
              ₹{data?.current_price?.toLocaleString()}
              <span className={(data?.price_change ?? 0) >= 0 ? styles.changePositive : styles.changeNegative} style={{ fontSize: '14px', marginLeft: '10px' }}>
                {(data?.price_change ?? 0) >= 0 ? '+' : ''}{(data?.price_change ?? 0).toFixed(2)} ({(data?.price_change_pct ?? 0).toFixed(2)}%)
              </span>
            </div>
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', color: '#848E9C' }}>
          
          <div className={styles.headerIconContainer}>
            <Search size={20} />
          </div>

          <Link href="/notifications" className={styles.headerIconContainer} style={{ color: 'inherit' }}>
            <Bell size={20} />
            <div style={{position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', background: '#f6465d', borderRadius: '50%'}}></div>
          </Link>

          <Link href="/settings" className={styles.headerIconContainer} style={{ color: 'inherit' }}>
            <Settings size={20} />
          </Link>

          <Link href="/account" className={styles.headerIconContainer} style={{ color: 'inherit' }}>
            <User size={20} />
          </Link>

        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.signalTitle}>Watchlist</div>
        {['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'SBIN', 'ICICIBANK'].map(s => (
          <button
            key={s}
            className={styles.btn}
            style={{ textAlign: 'left', borderColor: symbol === s ? '#2962ff' : 'transparent', background: symbol === s ? '#1e2329' : 'transparent' }}
            onClick={() => setSymbol(s)}
          >
            {s}
          </button>
        ))}
      </aside>

      <main className={styles.main}>
        <div className={styles.controlBar}>
          {timeframes.map(tf => (
            <button
              key={tf}
              className={`${styles.btn} ${timeframe === tf ? styles.btnActive : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.toUpperCase()}
            </button>
          ))}

        </div>

        <div className={styles.chartContainer}>
          <TradingChart
            data={ohlc}
            volumeData={volumeData}
            activeIndicators={activeIndicators}
          />
          {data && data.prediction && (
            <PredictionPanel
              prediction={data.prediction}
              signals={data.analysis_signals || []}
              timeframe={timeframe}
            />
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          <div className={styles.chartContainer} style={{ height: 'auto' }}>
            <div className={styles.signalTitle}>Model Accuracy</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2dbd85' }}>{((data?.metrics?.accuracy ?? 0) * 100).toFixed(1)}%</div>
          </div>
          <div className={styles.chartContainer} style={{ height: 'auto' }}>
            <div className={styles.signalTitle}>Win Rate</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{((data?.metrics?.win_rate ?? 0) * 100).toFixed(1)}%</div>
          </div>
          <div className={styles.chartContainer} style={{ height: 'auto' }}>
            <div className={styles.signalTitle}>Sharpe Ratio</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.metrics?.sharpe ?? '0.00'}</div>
          </div>
          <div className={styles.chartContainer} style={{ height: 'auto' }}>
            <div className={styles.signalTitle}>Max Drawdown</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f6465d' }}>{((data?.metrics?.max_drawdown ?? 0) * 100).toFixed(1)}%</div>
          </div>
        </div>
      </main>
    </div>
  );
}
