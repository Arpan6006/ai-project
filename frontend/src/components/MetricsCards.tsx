'use client';

import { Activity, Target, TrendingUp, ShieldAlert } from 'lucide-react';

export default function MetricsCards({ metrics, loading }: { metrics: any, loading: boolean }) {
  const cards = [
    { title: 'Model Accuracy', value: metrics?.accuracy ? `${(metrics.accuracy * 100).toFixed(1)}%` : '--', icon: Target, color: 'text-blue-500' },
    { title: 'Sharpe Ratio', value: metrics?.sharpe_ratio || '--', icon: Activity, color: 'text-purple-500' },
    { title: 'Win Rate', value: metrics?.win_rate ? `${(metrics.win_rate * 100).toFixed(1)}%` : '--', icon: TrendingUp, color: 'text-green-500' },
    { title: 'Risk Score', value: '2.4 / 10', icon: ShieldAlert, color: 'text-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className={`bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden group transition-all hover:border-gray-700 ${loading ? 'animate-pulse' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold tracking-tight">{card.value}</h3>
            </div>
            <card.icon className={`w-8 h-8 ${card.color} opacity-80 group-hover:scale-110 transition-transform`} />
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        </div>
      ))}
    </div>
  );
}
