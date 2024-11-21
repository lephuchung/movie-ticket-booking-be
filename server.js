const express = require('express');
const bodyParser = require('body-parser');
const showtimeRoutes = require('./routes/showtimes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/showtimes', showtimeRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
