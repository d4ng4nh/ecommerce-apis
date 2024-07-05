const Product = require('../models/product');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let products;

    if (req.query.q) {
      products = await Product.search(req.query.q);
    } else {
      products = await Product.findAll();
    }

    if (req.query.sortBy) {
      products = await Product.sort(req.query.sortBy, req.query.order);
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.delete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const query = req.query.q;
    console.log("Search query:", query);

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.search(query);
    console.log("Search results:", products);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found matching your search" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    next(error);
  }
};

exports.filterProducts = async (req, res, next) => {
  try {
    console.log('Received query parameters:', req.query);

    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      inStock: req.query.inStock !== undefined ? req.query.inStock === 'true' : undefined
    };

    console.log('Processed filters:', filters);

    const products = await Product.filter(filters);

    console.log('Filtered products:', JSON.stringify(products, null, 2));

    res.json(products);
  } catch (error) {
    console.error('Error in filterProducts:', error);
    next(error);
  }
};
