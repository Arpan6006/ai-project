'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<string | null>(null);
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

  if (!user) return <div style={{ minHeight: '100vh', backgroundColor: '#161A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#848E9C' }}>Checking authentication...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#161A1E', color: '#EAECEF', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#fff' }}>Account Hub</h1>
          <Link href="/" style={{ color: '#2962ff', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Dashboard</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          {/* Profile Card */}
          <div style={{ backgroundColor: '#1E2329', padding: '25px', borderRadius: '8px', border: '1px solid #2B3139' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#2962ff', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
              {user.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '18px' }}>{user.split('@')[0]}</h2>
            <p style={{ textAlign: 'center', color: '#848E9C', fontSize: '13px', marginBottom: '20px' }}>{user}</p>
            
            <div style={{ backgroundColor: '#0B0E11', padding: '10px', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#848E9C' }}>Subscription Tier</div>
              <div style={{ color: '#2dbd85', fontWeight: 'bold', marginTop: '4px' }}>PRO TRADER</div>
            </div>

            <button onClick={handleLogout} style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #f6465d', color: '#f6465d', padding: '10px', borderRadius: '4px', cursor: 'pointer', transition: '0.2s' }}>
              Log Out
            </button>
          </div>

          {/* Details Box */}
          <div style={{ backgroundColor: '#1E2329', padding: '25px', borderRadius: '8px', border: '1px solid #2B3139' }}>
            <h3 style={{ borderBottom: '1px solid #2B3139', paddingBottom: '10px', marginBottom: '20px' }}>Account Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#848E9C' }}>API Usage (This Month)</div>
                <div style={{ fontSize: '16px' }}>4,250 / 10,000 requests</div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#0B0E11', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ width: '42.5%', height: '100%', backgroundColor: '#2962ff' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #2B3139' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Connected Broker</div>
                  <div style={{ fontSize: '12px', color: '#848E9C' }}>Zerodha Kite</div>
                </div>
                <button style={{ backgroundColor: '#2B3139', border: 'none', color: '#EAECEF', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Manage</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #2B3139' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Security</div>
                  <div style={{ fontSize: '12px', color: '#848E9C' }}>2FA Enabled</div>
                </div>
                <button style={{ backgroundColor: '#2B3139', border: 'none', color: '#EAECEF', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
