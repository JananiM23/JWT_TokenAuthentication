const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 3000; // Set PORT from .env or default to 3000
const userRoutes = require('./src/routes/userRoute');
const protectedRoute = require('./src/routes/protectedRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/jwtTokenGeneration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => console.log(err));

app.get('/welcome', (req, res) => {
    console.log('Welcome to my website');
    res.json("Welcome");
});

app.use('/api/users', userRoutes);
app.use('/auth', protectedRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
