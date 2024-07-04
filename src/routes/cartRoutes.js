const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
router.post('/:cartId/items', cartController.addItem);
router.delete('/:cartId/items/:productId', cartController.removeItem);
router.delete('/:cartId', cartController.deleteCart);
router.get('/', cartController.getAllCarts);

module.exports = router;
