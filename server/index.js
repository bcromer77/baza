require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const creatorRoutes = require('./routes/creator');

const app = express(); // ✅ Initialize app BEFORE middleware

// ✅ Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// ✅ Load all routes
console.log("🚨 ROUTES BEING USED:");

const auditRoutes = require('./routes/auditRoute.js');
console.log("🔍 auditRoutes path:", require.resolve('./routes/auditRoute.js'));

const transcribeUrls = require('./routes/transcribeUrls');
const phylloRoutes = require('./routes/phyllo');
const auditFetchRoutes = require('./routes/auditFetch');
const authRoutes = require('./routes/auth'); // <-- include this

// ✅ MOUNT ROUTES
app.use('/api/audit', auditRoutes);
console.log("🧪 Route registered: /api/audit");

app.use('/api/transcribe-urls', transcribeUrls);
console.log("🧪 Route registered: /api/transcribe-urls");

app.use('/api/phyllo', phylloRoutes);
console.log("🧪 Route registered: /api/phyllo");

app.use('/api', creatorRoutes);
console.log("🧪 Route registered: /api/creators/:id");

app.use('/api', auditFetchRoutes);
console.log("🧪 Route registered: /api/creator/:id/audits");

app.use('/api/auth', authRoutes);
console.log("🧪 Route registered: /api/auth/signup");

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).send(`❌ Path attempted: ${req.path}`);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

