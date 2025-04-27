const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./middlewares/auth');
 const plantRoutes = require('./routes/plant');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: '*', // React app URL
  credentials: true, // Allow credentials (cookies) to be sent
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors({
  origin: true,
  credentials: true
}));// Enable CORS with options
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/plants', isAuthenticated, plantRoutes);

app.get('/',isAuthenticated ,(req, res) => {
  res.send('Welcome to the Plant API!');
})
// Connect DB and start server
mongoose.connect('mongodb+srv://astra3716:eJytU76K5b1jdZLs@cluster0.qelj8gx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.error(err));
