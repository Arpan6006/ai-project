'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('auth_user', email);
      router.push('/account');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-panel)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: 'var(--bg-hover)', padding: '40px', borderRadius: '8px', width: '400px', border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', textAlign: 'center' }}>StockPredict AI Login</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }} 
              placeholder="Enter your email" 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px', outline: 'none' }} 
              placeholder="Enter your password" 
            />
          </div>
          
          <button type="submit" style={{ marginTop: '10px', backgroundColor: 'var(--brand)', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
            Sign In
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--brand)' }}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
}
