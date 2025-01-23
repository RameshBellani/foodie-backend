require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const { errorHandler } = require('./middlewares/errorMiddleware');

connectDB();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://foodie-nine-virid.vercel.app'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.use(errorHandler);

module.exports = app;
