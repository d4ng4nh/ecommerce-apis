const products = require('../config/seedData');

let carts = [];
let nextCartId = 1;
let deletedIds = [];

const Cart = {
    findAll: () => Promise.resolve(carts),

    findById: (id) => Promise.resolve(carts.find(cart => cart.id === id)),

    create: (cartData) => {
        let newCartId;
        if (deletedIds.length > 0) {
            newCartId = deletedIds.shift(); // Sử dụng lại ID đã xóa
        } else {
            newCartId = nextCartId++;
        }
        const newCart = { id: newCartId, products: [], ...cartData };
        carts.push(newCart);
        return Promise.resolve(newCart);
    },

    addItem: (cartId, productId, quantity) => {
        const cart = carts.find(cart => cart.id === Number(cartId));
  const product = products.find(product => product.id === Number(productId));
        if (cart && product) {
            const item = cart.products.find(item => item.product.id === productId);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.products.push({ product, quantity });
            }
            return Promise.resolve(cart);
        }
        return Promise.reject(new Error('Cart or product not found'));
    },

    removeItem: (cartId, productId) => {
        const cart = carts.find(cart => cart.id === Number(cartId));
        if (cart) {
          cart.products = cart.products.filter(item => item.product.id !== Number(productId));
          return Promise.resolve(cart);
        }
        return Promise.reject(new Error('Cart not found'));
      },

      delete: (id) => {
        const index = carts.findIndex(cart => cart.id === Number(id));
        if (index !== -1) {
            const deletedCart = carts.splice(index, 1)[0];
            deletedIds.push(deletedCart.id); // Thêm ID đã xóa vào danh sách tái sử dụng
            return Promise.resolve(deletedCart);
        }
        return Promise.resolve(null);
    }
};

module.exports = Cart;
