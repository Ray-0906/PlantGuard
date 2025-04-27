import { useState } from 'react';
import axios from 'axios'; // commented for now

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      console.log('Login submitted', res.data.user);
  
      // Store as string
      localStorage.setItem('user', JSON.stringify(res.data.user));
  
      // Redirect after login (example)
      window.location.href = '/plants'; // or use navigate('/dashboard')
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌿 Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-green-800 font-semibold block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-green-800 font-semibold block mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
