import { useEffect, useState } from 'react';
// import axios from 'axios'; // commented for now

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Uncomment this once backend ready
      // const res = await axios.get('/api/user/profile');
      // setUser(res.data.user);

      // Hardcoded dummy user for now
      const dummyUser = {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-15T00:00:00Z'
      };
      setUser(dummyUser);

    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-green-700 text-xl">Loading your profile... 🌿</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">👤 My Profile</h1>

        <div className="space-y-4 text-left">
          <p><span className="font-semibold text-green-800">Name:</span> {user.name}</p>
          <p><span className="font-semibold text-green-800">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-green-800">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <button
          className="mt-8 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default User;
