import express from 'express';
import handleSignup from '../api/auth/handleSignup.js'; // ✅ Make sure this path and extension are right

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', handleSignup);

export default router;

