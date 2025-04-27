import { useState } from 'react';
// import axios from 'axios'; // Uncomment when backend ready

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // const { data } = await axios.post('/api/detect', formData);

      // Dummy data for now
      const data = {
        plantName: 'Tomato',
        plantDisease: 'Blight',
        plantCure: 'Use fungicide, remove infected leaves.'
      };

      setResult(data);

      // await axios.post('/api/plants', data);

      console.log('Plant added to DB:', data);

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
          <p><span className="font-semibold text-green-800">Plant Name:</span> {result.plantName}</p>
          <p><span className="font-semibold text-green-800">Disease:</span> {result.plantDisease}</p>
          <p><span className="font-semibold text-green-800">Cure:</span> {result.plantCure}</p>
        </div>
      )}
    </div>
  );
};

export default Detect;
