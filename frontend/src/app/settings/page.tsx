'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#161A1E', color: '#EAECEF', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Notification */}
      {savedToast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#2dbd85', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000, transition: 'opacity 0.3s' }}>
          Settings successfully saved!
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#fff' }}>Platform Settings</h1>
          <Link href="/" style={{ color: '#2962ff', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setActiveTab('general')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'general' ? '#2B3139' : 'transparent', border: 'none', color: activeTab === 'general' ? '#EAECEF' : '#848E9C', borderRadius: '6px', fontWeight: activeTab === 'general' ? 'bold' : 'normal', cursor: 'pointer' }}>General Preferences</button>
            <button onClick={() => setActiveTab('api')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'api' ? '#2B3139' : 'transparent', border: 'none', color: activeTab === 'api' ? '#EAECEF' : '#848E9C', borderRadius: '6px', fontWeight: activeTab === 'api' ? 'bold' : 'normal', cursor: 'pointer' }}>API Keys & Webhooks</button>
            <button onClick={() => setActiveTab('models')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'models' ? '#2B3139' : 'transparent', border: 'none', color: activeTab === 'models' ? '#EAECEF' : '#848E9C', borderRadius: '6px', fontWeight: activeTab === 'models' ? 'bold' : 'normal', cursor: 'pointer' }}>Model Configurations</button>
            <button onClick={() => setActiveTab('data')} style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: activeTab === 'data' ? '#2B3139' : 'transparent', border: 'none', color: activeTab === 'data' ? '#EAECEF' : '#848E9C', borderRadius: '6px', fontWeight: activeTab === 'data' ? 'bold' : 'normal', cursor: 'pointer' }}>Data Sources</button>
          </div>

          {/* Content */}
          <div style={{ backgroundColor: '#1E2329', padding: '30px', borderRadius: '8px', border: '1px solid #2B3139', height: 'fit-content' }}>
            
            {activeTab === 'general' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid #2B3139', paddingBottom: '10px' }}>General Preferences</h2>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Theme</label>
                  <select style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }}>
                    <option>Dark Mode (Default)</option>
                    <option>Light Mode</option>
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
                <button onClick={handleSave} style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
              </>
            )}

            {activeTab === 'api' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid #2B3139', paddingBottom: '10px' }}>API Keys</h2>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Zerodha Kite API Key</label>
                  <input type="password" defaultValue="************************" style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Alpaca Trading Key</label>
                  <input type="password" placeholder="Enter key..." style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }} />
                </div>
                <button onClick={handleSave} style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save API Keys</button>
              </>
            )}

            {activeTab === 'models' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid #2B3139', paddingBottom: '10px' }}>Model Configurations</h2>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                    <span>Ensemble Weights</span>
                    <span style={{ color: '#2962ff' }}>LSTM (60%) / XGBoost (40%)</span>
                  </label>
                  <input type="range" min="10" max="90" defaultValue="60" style={{ width: '100%', accentColor: '#2962ff' }} />
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2dbd85' }} />
                    <span>Auto-retrain at End of Day</span>
                  </label>
                </div>
                <button onClick={handleSave} style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Update Model Settings</button>
              </>
            )}

            {activeTab === 'data' && (
              <>
                <h2 style={{ fontSize: '20px', marginBottom: '25px', borderBottom: '1px solid #2B3139', paddingBottom: '10px' }}>Data Sources</h2>
                <p style={{ color: '#848E9C', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>Manage where historical and real-time tick data is sourced from.</p>
                
                <div style={{ backgroundColor: '#0B0E11', border: '1px solid #2B3139', borderRadius: '4px', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Yahoo Finance (yfinance)</div>
                    <div style={{ fontSize: '12px', color: '#2dbd85' }}>Active • Connected</div>
                  </div>
                  <button style={{ backgroundColor: '#f6465d', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Disconnect</button>
                </div>
                <div style={{ backgroundColor: '#0B0E11', border: '1px solid #2B3139', borderRadius: '4px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Alpha Vantage</div>
                    <div style={{ fontSize: '12px', color: '#848E9C' }}>Inactive</div>
                  </div>
                  <button style={{ backgroundColor: '#2B3139', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Connect</button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
