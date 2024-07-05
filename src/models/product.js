const products = require('../config/seedData');

let nextId = products.length + 1;

const Product = {
  findAll: () => Promise.resolve(products),

  findById: (id) => Promise.resolve(products.find(p => p.id === Number(id))),

  create: (productData) => {
    const newProduct = {
      id: nextId++,
      ...productData,
      popularity: productData.popularity || 0 // Đặt giá trị mặc định nếu không được cung cấp
    };
    products.push(newProduct);
    return Promise.resolve(newProduct);
  },

  update: (id, productData) => {
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      return Promise.resolve(products[index]);
    }
    return Promise.resolve(null);
  },

  delete: (id) => {
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      return Promise.resolve(deletedProduct);
    }
    return Promise.resolve(null);
  },

  search: (query) => {
    console.log("Searching for:", query);
    const lowercaseQuery = query.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
    );
    console.log("Search results in model:", results);
    return Promise.resolve(results);
  },

  filter: (filters) => {
    console.log('Filtering with:', filters);
    return Promise.resolve(
      products.filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
        if (filters.inStock !== undefined && p.inStock !== filters.inStock) return false;
        return true;
      })
    );
  },

  sort: (sortBy, order = 'asc') => {
    console.log('Sorting by:', sortBy, 'Order:', order);
    return Promise.resolve(
      [...products].sort((a, b) => {
        if (sortBy === 'price') {
          return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'name') {
          return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'popularity') {
          return order === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity;
        }
        return 0;
      })
    );
  }
}

module.exports = Product;