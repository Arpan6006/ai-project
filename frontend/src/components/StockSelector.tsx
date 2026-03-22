'use client';

import { Search, Clock } from 'lucide-react';

export default function StockSelector({ symbol, setSymbol, timeframe, setTimeframe, loading }: any) {
  const symbols = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK'];
  const timeframes = ['1m', '5m', '15m', '1h', '1d'];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="flex-1 w-full space-y-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center gap-1">
          <Search className="w-3 h-3" /> Select Institutional Asset
        </label>
        <select 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          disabled={loading}
          className="w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          {symbols.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex-1 w-full space-y-2">
        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Analysis Timeframe
        </label>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          disabled={loading}
          className="w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          {timeframes.map(tf => <option key={tf} value={tf}>{tf}</option>)}
        </select>
      </div>
      
      {loading && (
        <div className="flex items-center gap-2 text-blue-400 font-medium animate-pulse mt-6 px-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
          Retraining Model...
        </div>
      )}
    </div>
  );
}
