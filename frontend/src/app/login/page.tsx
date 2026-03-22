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
    <div style={{ minHeight: '100vh', backgroundColor: '#161A1E', color: '#EAECEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: '#1E2329', padding: '40px', borderRadius: '8px', width: '400px', border: '1px solid #2B3139', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>StockPredict AI Login</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#848E9C', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }} 
              placeholder="Enter your email" 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#848E9C', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', padding: '10px', borderRadius: '4px', outline: 'none' }} 
              placeholder="Enter your password" 
            />
          </div>
          
          <button type="submit" style={{ marginTop: '10px', backgroundColor: '#2962ff', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>
            Sign In
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#848E9C' }}>
          <span style={{ cursor: 'pointer', color: '#2962ff' }}>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
}
