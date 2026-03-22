'use client';

import { useState, useEffect } from 'react';
import StockSelector from './StockSelector';
import MetricsCards from './MetricsCards';

export default function Dashboard() {
  const [symbol, setSymbol] = useState('RELIANCE');
  const [timeframe, setTimeframe] = useState('5m');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  const fetchMetrics = async (s: string, t: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/metrics/${s}?tf=${t}`);
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to fetch metrics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics(symbol, timeframe);
  }, [symbol, timeframe]);

  return (
    <div className="space-y-8">
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-xl">
        <StockSelector 
          symbol={symbol} 
          setSymbol={setSymbol} 
          timeframe={timeframe} 
          setTimeframe={setTimeframe} 
          loading={loading}
        />
      </div>

      <MetricsCards metrics={metrics} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111] p-6 rounded-2xl border border-gray-800 h-[400px] flex items-center justify-center text-gray-500 italic">
          Dynamic Chart Visualization (TradingView) - [Placeholder]
        </div>
        <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Signal Intelligence</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-gray-400">Direction</span>
              <span className="font-bold text-green-500 uppercase">UP</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-gray-400">Probability</span>
              <span className="font-bold text-blue-400">89%</span>
            </div>
          </div>
          <button 
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]"
            onClick={() => fetchMetrics(symbol, timeframe)}
          >
            Refresh Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
