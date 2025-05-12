const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mentionsIndexRoute = require("./routes/mentionsIndex");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

app.use("/api/suggested-event", require("./routes/suggestedEvent"));
app.use("/api", mentionsIndexRoute);
app.use("/api/image-card", require("./routes/imageCard"));


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/matches', require('./routes/match'));

// Test Route
app.get('/', (req, res) => {
  res.send('🎧 Audiantix backend is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

