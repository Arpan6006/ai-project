'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../theme-provider';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-panel)', color: 'var(--text-primary)', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Notification */}
      {savedToast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'var(--accent-green)', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000, transition: 'opacity 0.3s' }}>
          Settings successfully saved!
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Platform Settings</h1>
          <Link href="/" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setActiveTab('general')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'general' ? 'var(--border)' : 'transparent', border: 'none', color: activeTab === 'general' ? 'var(--text-primary)' : 'var(--text-secondary)', borderRadius: '6px', fontWeight: activeTab === 'general' ? 'bold' : 'normal', cursor: 'pointer' }}>General Preferences</button>
            <button onClick={() => setActiveTab('api')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'api' ? 'var(--border)' : 'transparent', border: 'none', color: activeTab === 'api' ? 'var(--text-primary)' : 'var(--text-secondary)', borderRadius: '6px', fontWeight: activeTab === 'api' ? 'bold' : 'normal', cursor: 'pointer' }}>API Keys & Webhooks</button>
            <button onClick={() => setActiveTab('models')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'models' ? 'var(--border)' : 'transparent', border: 'none', color: activeTab === 'models' ? 'var(--text-primary)' : 'var(--text-secondary)', borderRadius: '6px', fontWeight: activeTab === 'models' ? 'bold' : 'normal', cursor: 'pointer' }}>Model Configurations</button>
            <button onClick={() => setActiveTab('data')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'data' ? 'var(--border)' : 'transparent', border: 'none', color: activeTab === 'data' ? 'var(--text-primary)' : 'var(--text-secondary)', borderRadius: '6px', fontWeight: activeTab === 'data' ? 'bold' : 'normal', cursor: 'pointer' }}>Data Sources</button>
          </div>

          {/* Content */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '30px', borderRadius: '8px', border: '1px solid var(--border)', height: 'fit-content' }}>
            
            {activeTab === 'general' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>General Preferences</h2>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                    style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }}
                  >
                    <option value="dark">Dark Mode (Default)</option>
                    <option value="light">Light Mode</option>
                  </select>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Default Timeframe</label>
                  <select style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }}>
                    <option>1 Minute</option>
                    <option selected>5 Minutes</option>
                    <option>1 Hour</option>
                    <option>1 Day</option>
                  </select>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--brand)' }} />
                    <span>Show predictions overlay on chart</span>
                  </label>
                </div>
                <button onClick={handleSave} style={{ backgroundColor: 'var(--brand)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </>
            )}

            {activeTab === 'api' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>API Keys</h2>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Zerodha Kite API Key</label>
                  <input type="password" defaultValue="************************" style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Alpaca Trading Key</label>
                  <input type="password" placeholder="Enter key..." style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }} />
                </div>
                <button onClick={handleSave} style={{ backgroundColor: 'var(--brand)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save API Keys</button>
              </>
            )}

            {activeTab === 'models' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Model Configurations</h2>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                    <span>Ensemble Weights</span>
                    <span style={{ color: 'var(--brand)' }}>LSTM (60%) / XGBoost (40%)</span>
                  </label>
                  <input type="range" min="10" max="90" defaultValue="60" style={{ width: '100%', accentColor: 'var(--brand)' }} />
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }} />
                    <span>Auto-retrain at End of Day</span>
                  </label>
                </div>
                <button onClick={handleSave} style={{ backgroundColor: 'var(--brand)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Update Model Settings</button>
              </>
            )}

            {activeTab === 'data' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Data Sources</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>Manage where historical and real-time tick data is sourced from.</p>
                
                <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '4px', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Yahoo Finance (yfinance)</div>
                    <div style={{ fontSize: '12px', color: 'var(--accent-green)' }}>Active • Connected</div>
                  </div>
                  <button style={{ backgroundColor: 'var(--accent-red)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Disconnect</button>
                </div>
                <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '4px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Alpha Vantage</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Inactive</div>
                  </div>
                  <button style={{ backgroundColor: 'var(--border)', border: 'none', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Connect</button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
