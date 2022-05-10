const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConnect');
const path = require("path");
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const stripeRoutes = require('./routes/stripe');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const multer = require('multer');
const app = express();

// DB CONNEXION
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cookieParser());

app.use((_, res, next) => {
    res.setHeader('Accept', 'application/json, multipart/form-data, text/html');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stripe', stripeRoutes);

app.use((err, _, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'La taille du fichier est trop grande: elle ne doit pas dépasser 10 Mo.'})
    } else if (err.code === 'MIMETYPE_FILE_ERROR') {
      return res.status(400).json({ message: "Ce fichier n'est pas accepté. Veuillez réessayer." })
    }
  }
  console.log(err);
})

app.all('*', (req, res) => {
  if (req.accepts('html')) {
    return res.status(404).json({ message: 'Erreur 404'});
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  };
  res.sendStatus(404);
});

module.exports = app;
