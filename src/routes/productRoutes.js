const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/filter', productController.filterProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;