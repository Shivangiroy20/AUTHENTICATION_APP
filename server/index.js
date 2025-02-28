const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env
const authRouter = require('./routes/authRoute');

const app = express();

// 1) Middlewares
app.use(cors());
app.use(express.json());

// 2) Routes
app.use('/api/auth', authRouter);

// 3) MongoDB Connection
mongoose.set('strictQuery', true);
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('Error: MONGODB_URI environment variable not set.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// 4) Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// 5) Server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
