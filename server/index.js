require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');

const pricingRoutes = require('./routes/pricingRoutes');
const prismRoutes = require('./routes/prismRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const stripeRoutes = require('./routes/stripe');
const phylloRoutes = require('./routes/phyllo');

const app = express();
app.use(express.json());

// Basic route for Cloud Run health check
app.get('/', (req, res) => res.send('Audiantix backend is live 🚀'));

// Routes
app.use('/api/pricing', pricingRoutes);
app.use('/api/prism', prismRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/phyllo', phylloRoutes);

// ✅ Critical line to start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Audiantix backend running on port ${PORT}`);
});

