const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const creatorRoutes = require('./routes/creatorRoutes');
const brandRoutes = require('./routes/brandRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/creators', creatorRoutes);
app.use('/api/brands', brandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));