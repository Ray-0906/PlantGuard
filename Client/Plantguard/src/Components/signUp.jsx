import { useState } from 'react';
 import axios from 'axios'; // commented for now
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const handleSignup = async (e) => {
   
    e.preventDefault();
    try {
      // Uncomment when backend is ready
      console.log('Signup submitted', { name, email, password });
     const user= await axios.post('http://localhost:5000/api/auth/signup', { name, email, password }, { withCredentials: true });
      console.log('Signup submitted', { name, email, password });
      localStorage.setItem('user', JSON.stringify(user.data.user)); // Store user data as string
       navigate('/plants'); // Redirect to plants page after signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌱 Signup</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="text-green-800 font-semibold block mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
