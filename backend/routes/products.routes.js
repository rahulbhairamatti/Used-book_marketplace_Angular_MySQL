// backend/routes/products.routes.js
const express = require('express');
const productsController = require('../controllers/products.controller');
const router = express.Router();

// GET all products
router.get('/', productsController.getAllProducts);

// GET product by ID
router.get('/:productId', productsController.getProductById);

// POST a new product (Sell Book)
router.post('/', productsController.createProduct);

module.exports = router;