'use client';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#161A1E', color: '#EAECEF', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#fff' }}>Platform Settings</h1>
          <Link href="/" style={{ color: '#2962ff', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#2B3139', border: 'none', color: '#EAECEF', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>General Preferences</button>
            <button style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: 'transparent', border: 'none', color: '#848E9C', borderRadius: '6px', cursor: 'pointer' }}>API Keys & Webhooks</button>
            <button style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: 'transparent', border: 'none', color: '#848E9C', borderRadius: '6px', cursor: 'pointer' }}>Model Configurations</button>
            <button style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: 'transparent', border: 'none', color: '#848E9C', borderRadius: '6px', cursor: 'pointer' }}>Data Sources</button>
          </div>

          {/* Content */}
          <div style={{ backgroundColor: '#1E2329', padding: '30px', borderRadius: '8px', border: '1px solid #2B3139' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid #2B3139', paddingBottom: '10px' }}>General Preferences</h2>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Theme</label>
              <select style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }}>
                <option>Dark Mode (Default)</option>
                <option>Light Mode</option>
                <option>System Default</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Default Timeframe</label>
              <select style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }}>
                <option>1 Minute</option>
                <option selected>5 Minutes</option>
                <option>1 Hour</option>
                <option>1 Day</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2962ff' }} />
                <span>Show predictions overlay on chart</span>
              </label>
            </div>

            <button style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
