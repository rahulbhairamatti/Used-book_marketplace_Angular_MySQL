// const dbPool = require('../config/db.config');

// // Get all products (Modified to include seller username)
// exports.getAllProducts = (req, res) => {
//     const query = `
//         SELECT
//             Products.*,
//             Users.username AS seller_username
//         FROM Products
//         JOIN Users ON Products.user_id = Users.user_id
//     `;

//     dbPool.query(query, (error, results) => {
//         if (error) {
//             console.error("Error fetching products:", error);
//             return res.status(500).json({ message: "Error fetching products" });
//         }
//         console.log("Database query results:", results);
//         const productsWithSellerInfo = results.map(product => ({
//             ...product,
//             sellerUsername: product.seller_username
//         }));
//         res.json(productsWithSellerInfo);
//     });
// };

// // Get product by ID (Modified to include seller username)
// exports.getProductById = (req, res) => {
//     const productId = req.params.productId;
//     const query = `
//         SELECT
//             Products.*,
//             Users.username AS seller_username
//         FROM Products
//         JOIN Users ON Products.user_id = Users.user_id
//         WHERE Products.product_id = ?
//     `;

//     dbPool.query(query, [productId], (error, results) => {
//         if (error) {
//             console.error("Error fetching product:", error);
//             return res.status(500).json({ message: "Error fetching product" });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.json(results[0]);
//     });
// };

// // Create a new product (for selling books)
// exports.createProduct = (req, res) => {
//     console.log("--- createProduct function called ---"); // This will still log!
//     console.log("req.session.userId at start of createProduct:", req.session.userId);
 
//     console.log("req.session.id in createProduct:", req.session.id); // This will still log!
//     console.log("req.session object in createProduct:", req.session); // This will still log!
//     // **ADD THIS LINE - Log userId IMMEDIATELY**
//     const { title, author, genre, condition, price, description, image_url, quantity } = req.body;
//     const userId = req.session.userId; // Get user_id from session for seller identification

//     // if (!userId) { // Check if userId exists in session (user is logged in)
//     //     return res.status(401).json({ message: "Unauthorized: Seller not logged in." }); // Return 401 Unauthorized if not logged in
//     // }

//     if (!title || !author || !genre || !condition || !price || quantity === undefined) {
//         return res.status(400).json({ message: "Required fields are missing (title, author, genre, condition, price, quantity)" });
//     }

//     // Basic quantity validation
//     if (typeof quantity !== 'number' || quantity < 0) {
//         return res.status(400).json({ message: "Quantity must be a non-negative number" });
//     }

//     const newProduct = {
//         title,
//         author,
//         genre,
//         book_condition: condition,
//         price,
//         description,
//         image_url,
//         quantity_in_stock: quantity,
//         user_id: userId // Include user_id (seller ID) in the newProduct object
//     };

//     dbPool.query("INSERT INTO Products SET ?", newProduct, (error, results) => {
//         if (error) {
//             console.error("Error creating product:", error);
//             return res.status(500).json({ message: "Error creating product" });
//         }
//         res.status(201).json({ message: "Product created successfully", productId: results.insertId });
//     });
// };


// // backend/controllers/products.controller.js
const dbPool = require('../config/db.config');

// Get all products
exports.getAllProducts = (req, res) => {
    dbPool.query("SELECT * FROM Products", (error, results) => {
        if (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ message: "Error fetching products" });
        }
        console.log("Database query results:", results);
        res.json(results);
    });
};

// Get product by ID
exports.getProductById = (req, res) => {
    const productId = req.params.productId;
    dbPool.query("SELECT * FROM Products WHERE product_id = ?", [productId], (error, results) => {
        if (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({ message: "Error fetching product" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(results[0]);
    });
};

// Create a new product (for selling books)
// exports.createProduct = (req, res) => {
//     const { title, author, genre, condition, price, description, image_url } = req.body; // 'condition' is still used from request body

//     if (!title || !author || !genre || !condition || !price) {
//         return res.status(400).json({ message: "Required fields are missing" });
//     }

//     const newProduct = {
//         title,
//         author,
//         genre,
//         book_condition: condition, // Map 'condition' from request to 'book_condition' for database
//         price,
//         description,
//         image_url
//     };

//     dbPool.query("INSERT INTO Products SET ?", newProduct, (error, results) => {
//         if (error) {
//             console.error("Error creating product:", error);
//             return res.status(500).json({ message: "Error creating product" });
//         }
//         res.status(201).json({ message: "Product created successfully", productId: results.insertId });
//     });
// };

// Create a new product (for selling books)
exports.createProduct = (req, res) => {
    const { title, author, genre, condition, price, description, image_url, quantity, seller_name } = req.body; // **ADD 'quantity' to destructured request body**

    if (!title || !author || !genre || !condition || !price || !seller_name || quantity === undefined) { // **ADD 'quantity' to required fields check. Use `=== undefined` to explicitly check for absence.**
        return res.status(400).json({ message: "Required fields are missing (title, author, genre, condition, price, seller_name, quantity)" }); // **Update error message to include quantity**
    }

    // **Basic quantity validation - ensure it's a number and not negative (you can enhance this further)**
    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Quantity must be a non-negative number" }); // **Add validation for quantity data type**
    }

    const newProduct = {
        title,
        author,
        genre,
        book_condition: condition, // Map 'condition' from request to 'book_condition' for database
        price,
        description,
        image_url,
        
        quantity_in_stock: quantity,
        seller_name: seller_name// **ADD 'quantity' to newProduct object**
    };

    dbPool.query("INSERT INTO Products SET ?", newProduct, (error, results) => {
        if (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ message: "Error creating product" });
        }
        res.status(201).json({ message: "Product created successfully", productId: results.insertId });
    });
};

// // backend/controllers/products.controller.js
// const dbPool = require('../config/db.config');

// // Get all products
// exports.getAllProducts = (req, res) => {
//     dbPool.query("SELECT * FROM Products", (error, results) => {
//         if (error) {
//             console.error("Error fetching products:", error);
//             return res.status(500).json({ message: "Error fetching products" });
//         }
//         res.json(results);
//     });
// };

// // Get product by ID
// exports.getProductById = (req, res) => {
//     const productId = req.params.productId;
//     dbPool.query("SELECT * FROM Products WHERE product_id = ?", [productId], (error, results) => {
//         if (error) {
//             console.error("Error fetching product:", error);
//             return res.status(500).json({ message: "Error fetching product" });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.json(results[0]); // Send back the first (and only) product
//     });
// };

// // Create a new product (for selling books)
// exports.createProduct = (req, res) => {
//     const { title, author, genre, condition, price, description, image_url } = req.body;

//     if (!title || !author || !genre || !condition || !price) {
//         return res.status(400).json({ message: "Required fields are missing" });
//     }

//     const newProduct = { title, author, genre, condition, price, description, image_url };

//     dbPool.query("INSERT INTO Products SET ?", newProduct, (error, results) => {
//         if (error) {
//             console.error("Error creating product:", error);
//             return res.status(500).json({ message: "Error creating product" });
//         }
//         res.status(201).json({ message: "Product created successfully", productId: results.insertId });
//     });
// };