require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workerRoutes = require('./routes/workerRoutes');

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API Routes
app.use('/api/workers', workerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
