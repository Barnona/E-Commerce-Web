const Product = require('../model/Product-model.js');
const filterConfig = require('../config/filterConfig.js')

const addProduct = async (request, response) => {
    try {
        const { 
            name, brand, description, category, subCategory, 
            price, stock, discount, taxClass,
            orders, 
            ...specs 
        } = request.body;

        let imageUrls = [];
        if (request.files && request.files.length > 0) {
            const serverUrl = (process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');
            imageUrls = request.files.map(file => `${serverUrl}/uploads/${file.filename}`);
        }

        let parsedOrders = [];
        if (orders) {
            try {
                parsedOrders = JSON.parse(orders);
            } catch (e) {
                parsedOrders = [];
            }
        }
        
        const validPrice = isNaN(Number(price)) ? 0 : Number(price);
        const validStock = isNaN(Number(stock)) ? 0 : Number(stock);
        const validDiscount = isNaN(Number(discount)) ? 0 : Number(discount);
        const validTaxClass = isNaN(Number(taxClass)) ? 0 : Number(taxClass);

        const newProduct = new Product({
            name, 
            brand, 
            description, 
            category, 
            subCategory,
            images: imageUrls,
            orders: parsedOrders,
            price: validPrice, 
            stock: validStock,
            discount: validDiscount,
            taxClass: validTaxClass,
            specs: specs 
        });

        await newProduct.save();
        response.status(201).json({ message: "Product Added Successfully", data: newProduct });
        
    } catch (error) {
        console.error("Error in addProduct:", error.message);
        response.status(500).json({ message: "Failed to add product" });
    }
}

const getProducts = async (req, response) => {
    try {
        const products = await Product.find({});
        const formattedProducts = products.map(product => {
            let status = 'In Stock';
            if (product.stock === 0) status = 'Out of Stock';
            else if (product.stock < 5) status = 'Low Stock';

            const price = product.price || 0;
            const discount = product.discount || 0;
            const taxClass = product.taxClass || 0;
            const salePrice = (price - discount) + (price - discount) * taxClass / 100;

            return {
                id: product._id,
                name: product.name,
                category: product.category,
                subCategory: product.subCategory,
                brand: product.brand,
                industryCode: 'N/A',
                specs: product.specs,
                basePrice: price,
                discount,
                taxClass,
                salePrice,
                stockLevel: product.stock,
                status,
                orders: product.orders || [],
                images: product.images
            };
        });

        response.status(200).json(formattedProducts);
    } catch (error) {
        response.status(500).json({ message: "Failed to fetch products" });
    }
}

const deleteProduct = async (request, response) => {
    try {
        const { id } = request.params;
        await Product.findByIdAndDelete(id);
        response.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        response.status(500).json({ message: "Failed to delete product" });
    }
}

const updateProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const updateData = request.body;
        const payload = {};
        if (updateData.name) payload.name = updateData.name;
        if (updateData.brand) payload.brand = updateData.brand;
        if (updateData.category) payload.category = updateData.category;
        if (updateData.subCategory) payload.subCategory = updateData.subCategory;
        if (updateData.price !== undefined) payload.price = Number(updateData.price);
        if (updateData.stock !== undefined) payload.stock = Number(updateData.stock);
        if (updateData.discount !== undefined) payload.discount = Number(updateData.discount);
        if (updateData.taxClass !== undefined) payload.taxClass = Number(updateData.taxClass);

        const updatedProduct = await Product.findByIdAndUpdate(id, payload, { new: true });
        response.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        response.status(500).json({ message: "Failed to update product" });
    }
}

const searchProducts = async (request, response) => {
    try {
        const key = request.params.key;
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const wordBoundaryRegex = new RegExp(`\\b${escapedKey}`, 'i');
        const products = await Product.find({
            $or: [
                { name: { $regex: wordBoundaryRegex } },
                { subCategory: { $regex: wordBoundaryRegex } },
                { brand: { $regex: wordBoundaryRegex } }
            ]
        });
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: "Product search failed" });
    }
}

const getProductsBySubCategory = async (request, response) => {
    try {
        const subCat = request.params.subname;
        const products = await Product.find({ subCategory: subCat });
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: "Failed to fetch category products" });
    }
}

const getProductFilters = async (req, res) => {
  try {
    const { subCategory } = req.query;
    if (!subCategory) return res.status(400).json({ message: "subCategory is required" });

    const config = filterConfig[subCategory];
    if (!config) return res.json({ brand: [] });

    const query = { subCategory };
    const filters = { brand: await Product.distinct("brand", query) };

    for (const spec of config.specs) {
      if (spec === 'capacityValue') {
        const mergedValues = await Product.aggregate([
          { $match: query },
          {
            $group: {
              _id: {
                $concat: [
                  { $trim: { input: { $ifNull: ["$specs.capacityValue", ""] } } },
                  { $trim: { input: { $ifNull: ["$specs.capacityUnit", ""] } } }
                ]
              }
            }
          },
          { $match: { _id: { $ne: "" } } }
        ]);
        filters[spec] = mergedValues.map(item => item._id);
      } else if (spec !== 'capacityUnit') {
        const values = await Product.distinct(`specs.${spec}`, query);
        if (values.length > 0) filters[spec] = values;
      }
    }

    res.json(filters);
  } catch (err) {
    console.error('Filter fetch failed:', err.message);
    res.status(500).json({ message: "Filter fetch failed" });
  }
}

const viewProductsData = async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product data" });
    }
}

module.exports = { addProduct, getProducts, deleteProduct, updateProduct, searchProducts, getProductsBySubCategory, getProductFilters, viewProductsData }