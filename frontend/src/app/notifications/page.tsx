'use client';
import Link from 'next/link';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'System', text: 'ML Ensemble models successfully retrained on latest EOD data.', time: '2 mins ago', color: 'var(--accent-green)' },
    { id: 2, type: 'Alert', text: 'RELIANCE (NSE) hit your price target of ₹2,950. High probability of resistance.', time: '1 hour ago', color: 'var(--brand)' },
    { id: 3, type: 'Warning', text: 'High market volatility detected globally. LSTM confidence scores may be lower than usual.', time: '3 hours ago', color: 'var(--accent-red)' },
    { id: 4, type: 'System', text: 'WebSocket connection re-established automatically.', time: 'Yesterday', color: 'var(--text-secondary)' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-panel)', color: 'var(--text-primary)', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Notifications center</h1>
          <Link href="/" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ backgroundColor: 'var(--bg-hover)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {notifications.map((n, i) => (
            <div key={n.id} style={{ padding: '20px', borderBottom: i === notifications.length - 1 ? 'none' : '1px solid var(--border)', display: 'flex', gap: '15px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: n.color, marginTop: '5px', flexShrink: 0 }}></div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{n.type} • {n.time}</div>
                <div style={{ fontSize: '15px', lineHeight: '1.5' }}>{n.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
