import { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
const Detect = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const generateCureSuggestion = (prediction) => {
    if (prediction.includes('Early_blight')) {
      return 'Use fungicide early, prune affected areas.';
    }
    if (prediction.includes('Late_blight')) {
      return 'Remove infected plants, apply copper fungicide.';
    }
    if (prediction.includes('healthy')) {
      return 'No action needed. Your plant is healthy! 🌱';
    }
    return 'Consult an expert for detailed advice.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file); // important: backend expects 'file'

      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Detection failed');
      }

      const data = await response.json();
      console.log('Prediction received:', data);

      setResult({
        name: data.prediction.split('___')[0], // eg. Potato
        disease: data.prediction.split('___')[1] || 'Healthy', // eg. Early_blight
        cure: generateCureSuggestion(data.prediction),
      });

   const saveplant= await  axios.post('http://localhost:5000/api/plants',result,{withCredentials: true});
 console.log('Plant saved:', saveplant.data);
      // You can also store it in your DB if needed later
      // await fetch('/api/plants', { method: 'POST', body: JSON.stringify(result), headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center space-y-6"
      >
        <h1 className="text-3xl font-bold text-green-700">🌿 Detect Plant Disease</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-green-300 rounded-xl px-4 py-2"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl border-2 border-green-300 mt-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl transition"
          disabled={loading}
        >
          {loading ? 'Detecting...' : 'Upload & Detect'}
        </button>
      </form>

      {result && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🪴 Detection Result</h2>
          <p><span className="font-semibold text-green-800">Plant Name:</span> {result.name}</p>
          <p><span className="font-semibold text-green-800">Disease:</span> {result.disease}</p>
          <p><span className="font-semibold text-green-800">Cure:</span> {result.cure}</p>
        </div>
      )}
    </div>
  );
};

export default Detect;
