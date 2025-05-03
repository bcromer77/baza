const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE IMPORTS - match filenames exactly
const creatorRoutes = require('./routes/CreatorRoutes'); // Capital C!
const brandRoutes = require('./routes/brandRoutes');
const brainRoutes = require('./routes/brainRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const transcribeRoutes = require('./routes/transcribeRoutes');
const whisperRoutes = require('./routes/whisperRoutes');
const searchRoutes = require('./routes/search');
const utilsRoutes = require('./routes/utilsRoutes');

// Health check
app.get('/', (req, res) => {
  res.send('Audiantix backend listening!');
});

// Routes
app.use('/api/creators', creatorRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/brain', brainRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/transcribe', transcribeRoutes);
app.use('/api/whisper', whisperRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/utils', utilsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Audiantix backend listening on port ${PORT}`);
});

