const express = require('express');
const routerProduct = express.Router();
const Product = require('../model/Product-model');
const multer = require('multer');
const path = require('path');


const {viewProductsData, getProductFilters} = require('../controller/product-controller.js')

const { addProduct, getProducts, deleteProduct, updateProduct, searchProducts, getProductsBySubCategory } = require('../controller/product-controller.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

routerProduct.post('/products/add', upload.array('images', 10), addProduct);
routerProduct.get('/products', getProducts);
routerProduct.delete('/product/:id', deleteProduct);
routerProduct.put('/product/:id', updateProduct);

routerProduct.get('/products/search/:key', searchProducts);
routerProduct.get('/products/sub/:subname', getProductsBySubCategory)
routerProduct.get('/products/filters/', getProductFilters);

routerProduct.get('/products/all', viewProductsData);

module.exports = routerProduct;