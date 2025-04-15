const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Init Express
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files (e.g., invoices)
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// ✅ Health check routes
app.get('/hello', (req, res) => {
  res.send("👋 Server is alive!");
});
app.get('/debug', (req, res) => {
  res.send("🧠 Server is definitely responding ✅");
});

// ✅ MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Route imports
const creatorRoutes = require('./routes/creatorRoutes');
const brandRoutes = require('./routes/brandRoutes');
const utilsRoutes = require('./routes/utilsRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

// ✅ Debug logging before mounting
console.log("✅ creatorRoutes.js loaded");
console.log("✅ utilsRoutes.js loaded");

// ✅ Mount routes
app.use('/api/creators', creatorRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/invoice', invoiceRoutes);

// ✅ Start server — always last
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CreatorTorch API live at http://localhost:${PORT}`);
});
