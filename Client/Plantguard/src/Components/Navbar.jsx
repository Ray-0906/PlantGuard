import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/detect', name: 'Detect Disease', auth: true },
    { path: '/plants', name: 'My Plants', auth: true },
    { path: '/profile', name: 'Profile', auth: true },
    { path: '/login', name: 'Login', auth: false },
  ];

  const linkVariants = {
    hover: { scale: 1.05, originX: 0 },
    tap: { scale: 0.95 },
  };

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <NavLink 
            to="/" 
            className="text-2xl font-bold tracking-wide flex items-center gap-2"
          >
            🌱 <span className="text-green-300">Plant</span>Guard
          </NavLink>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if ((link.auth && !isLoggedIn) || (link.auth === false && isLoggedIn)) return null;
            return (
              <motion.div
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md transition-all flex items-center gap-2
                    ${isActive ? 'bg-green-700 text-green-50 font-semibold' : 
                    'hover:bg-green-700/50 text-green-100'}`
                  }
                >
                  {link.name}
                </NavLink>
              </motion.div>
            );
          })}
          {isLoggedIn && (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 px-4 py-2 rounded-md ml-4 hover:bg-green-500 transition-colors"
            >
              Logout
            </motion.button>
          )}
        </div>

        {/* Mobile menu button */}
        <motion.div
          className="md:hidden z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-green-100 hover:text-white transition-colors"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </motion.div>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-16 bg-green-800/95 backdrop-blur-sm z-10"
            >
              <div className="flex flex-col p-4 space-y-3">
                {navLinks.map((link) => {
                  if ((link.auth && !isLoggedIn) || (link.auth === false && isLoggedIn)) return null;
                  return (
                    <motion.div
                      key={link.path}
                      whileHover={{ x: 10 }}
                      className="border-b border-green-700/50 last:border-0"
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => 
                          `block px-4 py-3 rounded-lg text-lg
                          ${isActive ? 'bg-green-700 text-white' : 
                          'hover:bg-green-700/30 text-green-100'}`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  );
                })}
                {isLoggedIn && (
                  <motion.button
                    onClick={() => { handleLogout(); setOpen(false); }}
                    className="mt-4 bg-green-600 px-6 py-3 rounded-lg text-lg hover:bg-green-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;