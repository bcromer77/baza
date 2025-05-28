const express = require("express");
const next = require("next");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(cors());
  server.use(express.json());

  // API routes (if any)
  server.use("/api", require("./app/api"));

  // Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

