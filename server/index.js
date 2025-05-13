require('dotenv').config({ path: '.env.local' });
console.log("🚨 ROUTES BEING USED:");
console.log("🔍 auditRoutes path:", require.resolve('./routes/auditRoute.js'));

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// ✅ ROUTES
const auditRoutes = require(__dirname + '/routes/auditRoute.js'); // NEW ROUTE
const transcribeUrls = require('./routes/transcribeUrls');
const phylloRoutes = require('./routes/phyllo');
const auditFetchRoutes = require('./routes/auditFetch');

// ✅ MOUNT ROUTES
app.use('/api/audit', auditRoutes);
console.log("🧪 Route registered: /api/audit");

app.use('/api/transcribe-urls', transcribeUrls);
console.log("🧪 Route registered: /api/transcribe-urls");

app.use('/api/phyllo', phylloRoutes);
console.log("🧪 Route registered: /api/phyllo");

app.use('/api', auditFetchRoutes);
console.log("🧪 Route registered: /api/creator/:id/audits");

app.use((req, res) => {
  res.status(404).send(`❌ Path attempted: ${req.path}`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

