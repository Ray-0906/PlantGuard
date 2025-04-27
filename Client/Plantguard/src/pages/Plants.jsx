import { useEffect, useState } from 'react';
// import axios from 'axios'; // Commented for now

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlants = async () => {
    try {
      // Uncomment and use API later
      // const res = await axios.get('/api/plants/myplants');
      // setPlants(res.data.plants);

      // Hardcoded data for now
      const dummyPlants = [
        {
          _id: '1',
          name: 'Tomato',
          disease: 'Leaf Spot',
          cure: 'Remove infected leaves. Apply organic fungicide.'
        },
        {
          _id: '2',
          name: 'Rose',
          disease: 'Powdery Mildew',
          cure: 'Use neem oil spray weekly.'
        },
        {
          _id: '3',
          name: 'Mango',
          disease: 'Anthracnose',
          cure: 'Apply copper-based fungicide.'
        },
      ];
      setPlants(dummyPlants);

    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-green-700 text-xl">Loading your plants... 🌱</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">🌿 My Plants</h1>

      {plants.length === 0 ? (
        <p className="text-center text-green-600">No plants detected yet. Start by uploading one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-green-800 mb-2">🌱 {plant.name}</h2>
              <p className="text-red-600 font-medium mb-1">🦠 {plant.disease}</p>
              <p className="text-green-700 text-sm">{plant.cure}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plants;
