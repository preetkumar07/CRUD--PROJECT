// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const {
  signupValidation,
  loginValidation
} = require('../validators/authValidator');
const { verifyToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.get('/me', verifyToken, getMe);

module.exports = router;
