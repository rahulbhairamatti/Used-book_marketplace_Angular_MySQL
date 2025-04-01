// // backend/routes/auth.routes.js
// const express = require('express');
// const authController = require('../controllers/auth.controller');
// const router = express.Router();

// // POST /api/auth/login - User login
// router.post('/login', authController.login);

// module.exports = router;
// backend/routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// POST /api/auth/register - User registration (NEW ROUTE)
router.post('/register', authController.register);

// POST /api/auth/login - User login
router.post('/login', authController.login);

module.exports = router;