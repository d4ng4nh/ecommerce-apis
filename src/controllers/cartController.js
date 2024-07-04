const Cart = require('../models/cart');

exports.createCart = async (req, res, next) => {
    try {
        const cart = await Cart.create();
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.addItem = async (req, res, next) => {
    try {
        const cart = await Cart.addItem(req.params.cartId, req.body.productId, req.body.quantity);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.removeItem = async (req, res, next) => {
    try {
        const cart = await Cart.removeItem(req.params.cartId, req.params.productId);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        await Cart.delete(req.params.cartId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

exports.getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
};
