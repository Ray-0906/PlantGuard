
import './App.css'
import Navbar from './Components/Navbar'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Detect from './pages/Detect'
import Plants from './pages/Plants'
import User from './pages/User'
import Login from './Components/login';
import Signup from './Components/signUp';
import { AuthProvider } from './Components/Authchk';
import PrivateRoute from './Components/PrivateRoute';

function App() {

  return (
   <>
   <AuthProvider>
   <Navbar/>
   <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/detect" element={<PrivateRoute><Detect /></PrivateRoute>} />
          <Route path="/plants" element={<PrivateRoute><Plants /></PrivateRoute>} />
          <Route path="/profile" element={<User />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        </AuthProvider>
   </>
  )
}

export default App
