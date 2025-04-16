const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});

// Serve static files (e.g., invoices)
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// Health check routes
app.get('/hello', (req, res) => res.send("👋 Server is alive!"));
app.get('/debug', (req, res) => res.send("🧠 Server is definitely responding ✅"));

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is missing in .env');
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route Imports
const creatorRoutes = require('./routes/creatorRoutes');
const brandRoutes = require('./routes/brandRoutes');
const utilsRoutes = require('./routes/utilsRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const whisperRoutes = require('./routes/whisperRoutes');

console.log("✅ Routes loaded");

// Mount Routes
app.use('/api/creators', creatorRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/whisper', whisperRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CreatorTorch API live at http://localhost:${PORT}`);
});