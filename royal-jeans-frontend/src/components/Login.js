import React, { useState } from 'react';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt with username:', username);
    try {
      const response = await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        setError('');
      } else {
        setError(data.detail || 'خطا در ورود');
        console.log('Login error:', data.detail);
      }
    } catch (err) {
      setError('اتصال به سرور ناموفق بود');
      console.log('Login fetch error:', err.message);
    }
  };

  return (
    <div>
      <h2>ورود</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="نام کاربری"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
        />
        <button type="submit">ورود</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;