import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSeedling, faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-green-50 font-poppins">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-green-700 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6 leading-tight"
            >
              Protect Your Plants.<br/>Detect Diseases Early.
            </motion.h1>
            <p className="text-xl mb-8">Upload a photo. Get instant diagnosis. Save your garden.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Detection
            </motion.button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/hero-image.png" 
              alt="Healthy plants" 
              className="w-96 h-96 object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: faSeedling, title: 'AI-powered Detection' },
            { icon: faUpload, title: 'Easy Photo Upload' },
            { icon: faBook, title: 'Plant Care Guides' },
            { icon: faUsers, title: 'Community Support' },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <FontAwesomeIcon 
                icon={feature.icon} 
                className="text-green-500 text-4xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-700">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {['Upload Image', 'Get Report', 'View Cures', 'Save to Library'].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">🌱</span>
              <span className="text-2xl font-bold">PlantGuard</span>
            </div>
            <p className="text-green-200">Grow Healthy. Stay Green.</p>
          </div>
          <div className="flex space-x-8 mb-8 md:mb-0">
            <a href="/" className="hover:text-green-300">Home</a>
            <a href="/detect" className="hover:text-green-300">Detect</a>
            <a href="/my-plants" className="hover:text-green-300">My Plants</a>
            <a href="/profile" className="hover:text-green-300">Profile</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
              {/* GitHub icon */}
            </a>
            <a href="#" className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-600">
              {/* LinkedIn icon */}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}