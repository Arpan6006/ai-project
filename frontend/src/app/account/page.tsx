'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<string | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [brokerModalOpen, setBrokerModalOpen] = useState(false);
  const [activeBroker, setActiveBroker] = useState('Zerodha Kite');
  const [tempBroker, setTempBroker] = useState('Zerodha Kite');
  const [savedToast, setSavedToast] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem('auth_user');
    if (!authUser) {
      router.push('/login');
    } else {
      setUser(authUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    router.push('/login');
  };

  const saveBroker = () => {
    setActiveBroker(tempBroker);
    setBrokerModalOpen(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  if (!user) return <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-panel)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Checking authentication...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-panel)', color: 'var(--text-primary)', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Notification */}
      {savedToast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'var(--accent-green)', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000, transition: 'opacity 0.3s' }}>
          Account settings updated!
        </div>
      )}

      {/* Broker Modal */}
      {brokerModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '30px', borderRadius: '8px', width: '400px', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Select Broker Interface</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
              {['Zerodha Kite', 'Upstox Pro', 'Alpaca Trading', 'Interactive Brokers'].map(b => (
                <button 
                  key={b} 
                  onClick={() => setTempBroker(b)}
                  style={{ textAlign: 'left', padding: '15px', backgroundColor: tempBroker === b ? 'var(--brand)' : 'var(--bg-main)', border: '1px solid var(--border)', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: tempBroker === b ? 'bold' : 'normal' }}
                >
                  {b}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setBrokerModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={saveBroker} style={{ padding: '10px 20px', backgroundColor: 'var(--accent-green)', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save Selection</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Account Hub</h1>
          <Link href="/" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          {/* Profile Card */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '25px', borderRadius: '8px', border: '1px solid var(--border)', height: 'fit-content' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--brand)', color: '#fff', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
              {user.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '18px' }}>{user.split('@')[0]}</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>{user}</p>
            
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '10px', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Subscription Tier</div>
              <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginTop: '4px' }}>PRO TRADER</div>
            </div>

            <button onClick={handleLogout} style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '10px', borderRadius: '4px', cursor: 'pointer', transition: '0.2s', fontWeight: 'bold' }}>
              Log Out
            </button>
          </div>

          {/* Details Box */}
          <div style={{ backgroundColor: 'var(--bg-hover)', padding: '25px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '20px' }}>Account Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>API Usage (This Month)</div>
                <div style={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span>4,250 / 10,000 requests</span>
                  <span style={{ color: 'var(--accent-red)', fontSize: '12px', padding: '2px 6px', backgroundColor: 'rgba(246, 70, 93, 0.1)', borderRadius: '4px' }}>42.5% Used</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-main)', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '42.5%', height: '100%', backgroundColor: 'var(--brand)' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Connected Broker</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{activeBroker} connected for live execution</div>
                </div>
                <button onClick={() => { setTempBroker(activeBroker); setBrokerModalOpen(true); }} style={{ backgroundColor: 'var(--border)', border: 'none', color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Change</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '12px', color: is2FAEnabled ? 'var(--accent-green)' : 'var(--accent-red)', marginTop: '4px' }}>
                    {is2FAEnabled ? 'Protected via Authenticator App' : 'Warning: Not Secured'}
                  </div>
                </div>
                
                {/* Custom Toggle Switch */}
                <div 
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  style={{ width: '46px', height: '24px', backgroundColor: is2FAEnabled ? 'var(--accent-green)' : 'var(--text-secondary)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
                >
                  <div style={{ position: 'absolute', top: '2px', left: is2FAEnabled ? '24px' : '2px', width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', transition: '0.3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
