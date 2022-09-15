import express from "express";
const router = express.Router();
import { signup, login } from '../controllers/authController.js'

// Create a user
router.post("/signup", signup)

// Log in user 
router.post("/login", login)

export default router;