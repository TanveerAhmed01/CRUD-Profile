const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Import the cors package

require('dotenv').config();

const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);

// Route handler for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the user profile app!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
