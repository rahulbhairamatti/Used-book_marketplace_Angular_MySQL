// server.js (updated - import auth routes)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes'); // Import auth routes
const path = require('path');
dotenv.config();
const db = require('./config/db.config');
const async = require('async'); 
//const multer = require('multer');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cors( {
    origin: 'http://127.0.0.1:8082', // **Specific origin of your Angular frontend**
   // origin: true,
    credentials: true,             // **Enable sending cookies in CORS requests**
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    optionsSuccessStatus: 204,
}));


// Serve static files from the 'public' directory

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// **ADD THIS PROXY MIDDLEWARE:**
// app.use('/api', createProxyMiddleware({  // Proxy requests starting with /api
//     target: 'http://localhost:4000',   // Your backend server address (adjust port if needed)
//     changeOrigin: true,               // Important for some proxy setups
//     cookieDomainRewrite: 'localhost:8082', //  Rewrite cookie domain to frontend's domain
// }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'ad80367c8ca3901fb9c28190edb283f2a8c793d2dd26b0b6290c4188beb394b6',
    store : new FileStore(),
    resave: false,
    saveUninitialized: false,
   
    cookie: {
        
        secure: false, // MUST be false for localhost development
        sameSite: 'None' ,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        
         // <------------------ ADD this line: SameSite: 'None'
    }
}));
// Configure multer for file storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
//     },    const userId = req.session.userId;

    // if (!userId) {
    //     return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
    // }
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

//const upload = multer({ storage: storage });

app.use(express.static('public')); // Add this line to serve static files
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../client/dist/client')));  // IMPORTANT: Adjust path if needed
app.use('/api/auth', authRoutes); // Use auth routes under /api/auth
app.use('/api/products', productRoutes);
//backend/server.js (New /api/session-status endpoint for session check)
app.get('/api/session-status', (req, res) => {
    if (req.session.userId) { // Check if userId exists in session (session is valid)
        res.status(200).json({ loggedIn: true, username: req.session.username }); // User is logged in, send loggedIn: true and username
    } else {
        res.status(200).json({ loggedIn: false }); // User is not logged in, send loggedIn: false
    }
});

app.post('/api/checkout', (req, res) => { 
    console.log("--- CHECKOUT ENDPOINT TRIGGERED WITH UPDATED CODE (ATTEMPT 2) ---");
    const cartItems = req.body.cartItems;


    const shippingCity = req.body.shippingCity; // Get shippingCity from request body
    if (!shippingCity) { // Validate that shippingCity is provided
        return res.status(400).json({ message: "Shipping city is required." });
    }

    let paymentMethod = req.body.payment_method;
    if (!paymentMethod || paymentMethod.trim() === '') {
        paymentMethod = 'Cash on Delivery';
    }

    let orderTotal = 0;
    const productIds = [];
    const orderItemsData = [];

    const productValidationQueries = cartItems.map(item => {
        return new Promise((resolve, reject) => {
            db.query('SELECT product_id, price, quantity_in_stock FROM Products WHERE product_id = ?', [item.book.product_id], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (results.length === 0) {
                    reject({ message: `Product ID ${item.book.product_id} not found.` });
                    return;
                }
                const product = results[0];
                if (product.quantity_in_stock < item.quantity) {
                    reject({ message: `Insufficient stock for product ${item.book.product_id}. Available stock: ${product.quantity_in_stock}` });
                    return;
                }

                orderTotal += product.price * item.quantity;
                productIds.push(product.product_id);
                orderItemsData.push([item.quantity, product.price, product.product_id]);
                resolve(product);
            });
        });
    });

    Promise.all(productValidationQueries)
        .then(products => {
            db.getConnection((connErr, connection) => {
                if (connErr) {
                    console.error("DB Connection error:", connErr);
                    return res.status(500).json({ message: 'Could not establish database connection' });
                }
                connection.beginTransaction((beginErr) => {
                    if (beginErr) {
                        connection.release();
                        console.error("Transaction begin error:", beginErr);
                        return res.status(500).json({ message: 'Failed to start transaction' });
                    }

                    // connection.query('INSERT INTO Orders (user_id, total_amount, payment_method, order_status) VALUES (?, ?, ?, ?)',
                    connection.query('INSERT INTO Orders ( total_amount, payment_method, order_status, shipping_city) VALUES ( ?, ?, ?, ?)',
                        [orderTotal, paymentMethod, 'Completed', shippingCity],
                        // [userId, orderTotal, paymentMethod, 'Completed'],
                        (orderErr, orderResult) => {
                            if (orderErr) {
                                return connection.rollback(() => {
                                    connection.release();
                                    console.error("Order insert error:", orderErr);
                                    res.status(500).json({ message: 'Failed to place order', error: orderErr.message });
                                });
                            }
                            const orderId = orderResult.insertId;
                            const orderItemsInsertQuery = 'INSERT INTO OrderItems (quantity, price_at_purchase, product_id, order_id) VALUES ?';
                            const orderItemsValues = orderItemsData.map(item => [...item, orderId]);

                            connection.query(orderItemsInsertQuery, [orderItemsValues], (itemErr, itemResult) => {
                                if (itemErr) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        console.error("OrderItem insert error:", itemErr);
                                        res.status(500).json({ message: 'Failed to create order items', error: itemErr.message });
                                    });
                                }

                                const productUpdateQueries = productIds.map(productId => {
                                    return new Promise((resolve, reject) => {
                                        connection.query('UPDATE Products SET quantity_in_stock = quantity_in_stock - ? WHERE product_id = ?', [cartItems.find(item => item.book.product_id === productId).quantity, productId], (updateErr, updateResult) => {
                                            if (updateErr) {
                                                reject(updateErr);
                                            } else {
                                                resolve(updateResult);
                                            }
                                        });
                                    });
                                });

                                Promise.all(productUpdateQueries)
                                    .then(() => {
                                        connection.commit((commitErr) => {
                                            if (commitErr) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    console.error("Transaction commit error:", commitErr);
                                                    res.status(500).json({ message: 'Transaction commit failed', error: commitErr.message });
                                                });
                                            }
                                            connection.release();
                                            res.status(200).json({ message: 'Checkout successful', orderId: orderId });
                                        });
                                    })
                                    .catch(updateError => {
                                        return connection.rollback(() => {
                                            connection.release();
                                            console.error("Product quantity update error:", updateError);
                                            res.status(500).json({ message: 'Failed to update product quantity', error: updateError.message });
                                        });
                                    });
                            });
                        });
                });
            });
        })
        .catch(validationError => {
            res.status(409).json({ message: 'Checkout failed', error: validationError.message });
        });
});


// **CONFIGURE EXPRESS-SESSION MIDDLEWARE:**
// const sessionConfig = {
//     secret: process.env.SESSION_SECRET || 'ad80367c8ca3901fb9c28190edb283f2a8c793d2dd26b0b6290c4188beb394b6', // Use environment variable for secret
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false, // Set to true in production with HTTPS
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// };
// const sessionConfig = {
//     secret: process.env.SESSION_SECRET || 'ad80367c8ca3901fb9c28190edb283f2a8c793d2dd26b0b6290c4188beb394b6',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false, // MUST be false for localhost development
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         sameSite: 'None'  // <------------------ ADD this line: SameSite: 'None'
//     }
// };
// app.use(session(sessionConfig)); // **<--- IMPORTANT:  UNCOMMENT THIS LINE**


// ... your API routes (like checkout route) ...
// app.use(session({
//     secret: '1c538aa4c403a09c166e9a741a0b60adc2e3cf86a1892c7236ec4f375ea057a0',  // Replace 'PASTE_THE_GENERATED_STRING_HERE' with the string you copied
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//         secure: false // Set to true in production for HTTPS
//     }
//     // store: ...
// }));



// backend/server.js (Corrected and Complete /api/checkout endpoint)
// app.post('/api/checkout', (req, res) => {
//     // ... (Database connection setup - ensure this is present in your server.js) ...

//     const cartItems = req.body.cartItems;
//     const userId = 1; // IMPORTANT: Replace with actual user ID from authentication
//     let paymentMethod = req.body.payment_method; // Get payment_method from request body

//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery'; // Default payment method
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     // 1. Validate product availability and prepare order items data
//     const productValidationQueries = cartItems.map(item => {
//         const productId = item.book.product_id; // Assuming product_id in book object
//         productIds.push(productId);
//         return new Promise((resolve, reject) => {
//             db.query('SELECT product_id, price, is_available FROM Products WHERE product_id = ?', [productId], (error, results) => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 if (results.length === 0) {
//                     return reject(new Error(`Product with ID ${productId} not found.`));
//                 }
//                 const product = results[0];
//                 if (!product.is_available) {
//                     return reject(new Error(`Product "${product.product_id}" is no longer available.`));
//                 }
//                 orderTotal += product.price * item.quantity; // Calculate total - quantity likely always 1 now
//                 orderItemsData.push({
//                     product_id: product.product_id,
//                     price_at_purchase: product.price,
//                     quantity: item.quantity // quantity likely always 1 now
//                 });
//                 resolve(product);
//             });
//         });
//     });

//     Promise.all(productValidationQueries)
//         .then(products => {
//             // 2. Start database transaction
//             db.beginTransaction(err => {
//                 if (err) {
//                     return db.rollback(() => res.status(500).json({ message: 'Transaction start error', error: err }));
//                 }

//                 // 3. Insert into Orders table - INCLUDE payment_method
//                 db.query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)',
//                     [userId, orderTotal, paymentMethod],
//                     (orderErr, orderResult) => {
//                         if (orderErr) {
//                             return db.rollback(() => res.status(500).json({ message: 'Order creation error', error: orderErr }));
//                         }
//                         const orderId = orderResult.insertId;

//                         // 4. Insert into OrderItems table for each item in cart
//                         const orderItemQueries = orderItemsData.map(orderItem => {
//                             return new Promise((resolve, reject) => {
//                                 db.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
//                                     [orderId, orderItem.product_id, orderItem.quantity, orderItem.price_at_purchase],
//                                     (itemErr, itemResult) => {
//                                         if (itemErr) {
//                                             return reject(itemErr);
//                                         }
//                                         resolve(itemResult);
//                                     }
//                                 );
//                             });
//                         });

//                         Promise.all(orderItemQueries)
//                             .then(() => {
//                                 // 5. Update Products table to set is_available = FALSE for purchased books
//                                 const updateProductQueries = productIds.map(productId => {
//                                     return new Promise((resolve, reject) => {
//                                         db.query('UPDATE Products SET is_available = FALSE WHERE product_id = ?', [productId], (updateErr, updateResult) => {
//                                             if (updateErr) {
//                                                 return reject(updateErr);
//                                             }
//                                             resolve(updateResult);
//                                         });
//                                     });
//                                 });

//                                 Promise.all(updateProductQueries)
//                                     .then(() => {
//                                         // 6. Commit transaction if all operations successful
//                                         db.commit(commitErr => {
//                                             if (commitErr) {
//                                                 return db.rollback(() => res.status(500).json({ message: 'Commit error', error: commitErr }));
//                                             }
//                                             res.status(201).json({ message: 'Order placed successfully', orderId: orderId });
//                                         });
//                                     })
//                                     .catch(updateProductError => {
//                                         return db.rollback(() => res.status(500).json({ message: 'Product update error', error: updateProductError }));
//                                     });

//                             })
//                             .catch(orderItemError => {
//                                 return db.rollback(() => res.status(500).json({ message: 'OrderItem creation error', error: orderItemError }));
//                             });
//                     });
//             });
//         })
//         .catch(validationError => {
//             res.status(409).json({ message: 'Checkout failed', error: validationError.message }); // 409 Conflict for inventory issues
//         });
// });
// app.post('/api/checkout', (req, res) => {
//     const cartItems = req.body.cartItems;
//     const userId = 1; // IMPORTANT: Replace with actual user ID from authentication
//     let paymentMethod = req.body.payment_method; // Get payment_method from request body

//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery'; // Default payment method
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     // 1. Validate product availability and prepare order items data
//     const productValidationQueries = cartItems.map(item => {
//         const productId = item.book.product_id; // Assuming product_id in book object
//         productIds.push(productId);
//         return new Promise((resolve, reject) => {
//             db.query('SELECT product_id, price, is_available FROM Products WHERE product_id = ?', [productId], (error, results) => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 if (results.length === 0) {
//                     return reject(new Error(`Product with ID ${productId} not found.`));
//                 }
//                 const product = results[0];
//                 if (!product.is_available) {
//                     return reject(new Error(`Product "${product.product_id}" is no longer available.`));
//                 }
//                 orderTotal += product.price * item.quantity; // Calculate total - quantity likely always 1 now
//                 orderItemsData.push({
//                     product_id: product.product_id,
//                     price_at_purchase: product.price,
//                     quantity: item.quantity // quantity likely always 1 now
//                 });
//                 resolve(product);
//             });
//         });
//     });

//     Promise.all(productValidationQueries)
//         .then(products => {
//             // 2. **GET A CONNECTION FROM THE POOL BEFORE STARTING TRANSACTION**
//             db.getConnection((connErr, connection) => { // Get a connection from the pool
//                 if (connErr) {
//                     console.error('Error getting database connection from pool:', connErr);
//                     return res.status(500).json({ message: 'Database connection error', error: connErr });
//                 }

//                 // **Use the `connection` object for transaction and queries**
//                 connection.beginTransaction(beginErr => { // Start transaction on the *connection*
//                     if (beginErr) {
//                         connection.release(); // **Release connection back to pool even on error**
//                         return connection.rollback(() => res.status(500).json({ message: 'Transaction start error', error: beginErr }));
//                     }

//                     // 3. Insert into Orders table - INCLUDE payment_method
//                     connection.query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)', // Use `connection.query`
//                         [userId, orderTotal, paymentMethod],
//                         (orderErr, orderResult) => {
//                             if (orderErr) {
//                                 connection.release(); // **Release connection back to pool even on error**
//                                 return connection.rollback(() => res.status(500).json({ message: 'Order creation error', error: orderErr }));
//                             }
//                             const orderId = orderResult.insertId;

//                             // 4. Insert into OrderItems table for each item in cart
//                             const orderItemQueries = orderItemsData.map(orderItem => {
//                                 return new Promise((resolve, reject) => {
//                                     connection.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)', // Use `connection.query`
//                                         [orderId, orderItem.product_id, orderItem.quantity, orderItem.price_at_purchase],
//                                         (itemErr, itemResult) => {
//                                             if (itemErr) {
//                                                 return reject(itemErr);
//                                             }
//                                             resolve(itemResult);
//                                         }
//                                     );
//                                 });
//                             });

//                             Promise.all(orderItemQueries)
//                                 .then(() => {
//                                     // 5. Update Products table to set is_available = FALSE for purchased books
//                                     const updateProductQueries = productIds.map(productId => {
//                                         return new Promise((resolve, reject) => {
//                                             connection.query('UPDATE Products SET is_available = FALSE WHERE product_id = ?', [productId], (updateErr, updateResult) => { // Use `connection.query`
//                                                 if (updateErr) {
//                                                     return reject(updateErr);
//                                                 }
//                                                 resolve(updateResult);
//                                             });
//                                         });
//                                     });

//                                     Promise.all(updateProductQueries)
//                                         .then(() => {
//                                             // 6. Commit transaction if all operations successful
//                                             connection.commit(commitErr => { // Commit on the *connection*
//                                                 if (commitErr) {
//                                                     return connection.rollback(() => res.status(500).json({ message: 'Commit error', error: commitErr }));
//                                                 }
//                                                 connection.release(); // **Release connection back to pool AFTER COMMIT**
//                                                 res.status(201).json({ message: 'Order placed successfully', orderId: orderId });
//                                             });
//                                         })
//                                         .catch(updateProductError => {
//                                             connection.release(); // **Release connection back to pool even on error**
//                                             return connection.rollback(() => res.status(500).json({ message: 'Product update error', error: updateProductError }));
//                                         });

//                                 })
//                                 .catch(orderItemError => {
//                                     connection.release(); // **Release connection back to pool even on error**
//                                     return connection.rollback(() => res.status(500).json({ message: 'OrderItem creation error', error: orderItemError }));
//                                 });

//                             })
//                             .catch(orderErr => {
//                                 connection.release(); // **Release connection back to pool even on error**
//                                 return connection.rollback(() => res.status(500).json({ message: 'Order creation error', error: orderErr }));
//                             });
//                     }); // end beginTransaction
//                 }); // end getConnection
//         })
//         .catch(validationError => {
//             res.status(409).json({ message: 'Checkout failed', error: validationError.message }); // 409 Conflict for inventory issues
//         });
// });
// app.post('/api/checkout', async (req, res) => { // Make the route handler async
//     const cartItems = req.body.cartItems;
//     const userId = 1; // IMPORTANT: Replace with actual user ID from authentication
//     let paymentMethod = req.body.payment_method;

//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery';
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     try {
//         // 1. Validate product availability and prepare order items data (using Promise.all)
//         const products = await Promise.all(cartItems.map(async item => { // Use async for map callback
//             const productId = item.book.product_id;
//             productIds.push(productId);
//             const [results] = await db.promise().query('SELECT product_id, price, is_available FROM Products WHERE product_id = ?', [productId]); // Use db.promise().query()
//             if (results.length === 0) {
//                 throw new Error(`Product with ID ${productId} not found.`);
//             }
//             const product = results[0];
//             if (!product.is_available) {
//                 throw new Error(`Product "${product.product_id}" is no longer available.`);
//             }
//             orderTotal += product.price * item.quantity;
//             orderItemsData.push({
//                 product_id: product.product_id,
//                 price_at_purchase: product.price,
//                 quantity: item.quantity
//             });
//             return product;
//         }));

//         // 2. Get a connection from the pool and start transaction (using async/await)
//         const connection = await db.promise().getConnection(); // Get promise-based connection
//         try {
//             await connection.beginTransaction(); // Start transaction

//             // 3. Insert into Orders table
//             const [orderResult] = await connection.promise().query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)', [userId, orderTotal, paymentMethod]); // Use connection.promise().query()
//             const orderId = orderResult.insertId;

//             // 4. Insert into OrderItems table (using Promise.all)
//             await Promise.all(orderItemsData.map(orderItem => {
//                 return connection.promise().query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)', [orderId, orderItem.product_id, orderItem.quantity, orderItem.price_at_purchase]); // Use connection.promise().query()
//             }));

//             // 5. Update Products table
//             await Promise.all(productIds.map(productId => {
//                 return connection.promise().query('UPDATE Products SET is_available = FALSE WHERE product_id = ?', [productId], [productId]); // Use connection.promise().query()
//             }));

//             // 6. Commit transaction
//             await connection.commit();
//             connection.release(); // Release connection back to pool
//             res.status(201).json({ message: 'Order placed successfully', orderId: orderId });

//         } catch (transactionError) {
//             await connection.rollback(); // Rollback on transaction error
//             connection.release(); // Release connection back to pool
//             console.error('Transaction error during checkout:', transactionError);
//             res.status(500).json({ message: 'Transaction error during checkout', error: transactionError });
//         }

//     } catch (validationError) {
//         res.status(409).json({ message: 'Checkout failed', error: validationError.message }); // 409 Conflict for inventory issues
//     }
// });
// app.post('/api/checkout', async (req, res) => { // Make the route handler async
//     const cartItems = req.body.cartItems;
//     const userId = 1; // IMPORTANT: Replace with actual user ID from authentication
//     let paymentMethod = req.body.payment_method;

//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery';
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     try {
//         // 1. Validate product availability and prepare order items data (using Promise.all)
//         const products = await Promise.all(cartItems.map(async item => { // Use async for map callback
//             const productId = item.book.product_id;
//             productIds.push(productId);
//             const [results] = await db.promise().query('SELECT product_id, price, is_available FROM Products WHERE product_id = ?', [productId]); // Use db.promise().query()
//             if (results.length === 0) {
//                 throw new Error(`Product with ID ${productId} not found.`);
//             }
//             const product = results[0];
//             if (!product.is_available) {
//                 throw new Error(`Product "${product.product_id}" is no longer available.`);
//             }
//             orderTotal += product.price * item.quantity;
//             orderItemsData.push({
//                 product_id: product.product_id,
//                 price_at_purchase: product.price,
//                 quantity: item.quantity
//             });
//             return product;
//         }));

//         // 2. Get a connection from the pool and start transaction (using async/await)
//         const connection = await db.promise().getConnection(); // Get promise-based connection
//         try {
//             await connection.beginTransaction(); // Start transaction

//             // 3. Insert into Orders table
//             const [orderResult] = await connection.promise().query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)', [userId, orderTotal, paymentMethod]); // Use connection.promise().query()
//             const orderId = orderResult.insertId;

//             // 4. Insert into OrderItems table (using Promise.all)
//             await Promise.all(orderItemsData.map(orderItem => {
//                 return connection.promise().query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)', [orderId, orderItem.product_id, orderItem.quantity, orderItem.price_at_purchase]); // Use connection.promise().query()
//             }));

//             // 5. Update Products table
//             await Promise.all(productIds.map(productId => {
//                 return connection.promise().query('UPDATE Products SET is_available = FALSE WHERE product_id = ?', [productId], [productId]); // Use connection.promise().query()
//             }));

//             // 6. Commit transaction
//             await connection.commit();
//             connection.release(); // Release connection back to pool
//             res.status(201).json({ message: 'Order placed successfully', orderId: orderId });

//         } catch (transactionError) {
//             await connection.rollback(); // Rollback on transaction error
//             connection.release(); // Release connection back to pool
//             console.error('Transaction error during checkout:', transactionError);
//             res.status(500).json({ message: 'Transaction error during checkout', error: transactionError });
//         }

//     } catch (validationError) {
//         res.status(409).json({ message: 'Checkout failed', error: validationError.message }); // 409 Conflict for inventory issues
//     }
// });
// For any route that doesn't match an API endpoint, serve the Angular app's index.html
// app.post('/api/checkout', (req, res) => { // Route handler is NOT async now - using callbacks
//     const cartItems = req.body.cartItems;
//     const userId = 1; // IMPORTANT: Replace with actual user ID from authentication
//     let paymentMethod = req.body.payment_method;

//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery';
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     // 1. Validate product availability and prepare order items data (using Promises for validation queries - these are not part of the transaction)
//     const productValidationQueries = cartItems.map(item => {
//         const productId = item.book.product_id;
//         productIds.push(productId);
//         return new Promise((resolve, reject) => {
//             db.query('SELECT product_id, price, is_available FROM Products WHERE product_id = ?', [productId], (error, results) => { // db.query is callback-based but wrapped in Promise for validation
//                 if (error) {
//                     return reject(error);
//                 }
//                 if (results.length === 0) {
//                     return reject(new Error(`Product with ID ${productId} not found.`));
//                 }
//                 const product = results[0];
//                 if (!product.is_available) {
//                     return reject(new Error(`Product "${product.product_id}" is no longer available.`));
//                 }
//                 orderTotal += product.price * item.quantity;
//                 orderItemsData.push({
//                     product_id: product.product_id,
//                     price_at_purchase: product.price,
//                     quantity: item.quantity
//                 });
//                 resolve(product);
//             });
//         });
//     });

//     Promise.all(productValidationQueries)
//         .then(products => {
//             // 2. Get a connection from the pool and start transaction (using CALLBACKS for transaction)
//             db.getConnection((connErr, connection) => { // Get connection from pool - callback-based
//                 if (connErr) {
//                     console.error('Error getting database connection from pool:', connErr);
//                     return res.status(500).json({ message: 'Database connection error', error: connErr });
//                 }

//                 connection.beginTransaction((beginErr) => { // Start transaction - callback-based
//                     if (beginErr) {
//                         connection.release(); // Release connection back to pool even on error
//                         return connection.rollback(() => res.status(500).json({ message: 'Transaction start error', error: beginErr }));
//                     }

//                     // 3. Insert into Orders table - INCLUDE payment_method
//                     connection.query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)', // connection.query is callback-based
//                         [userId, orderTotal, paymentMethod],
//                         (orderErr, orderResult) => {
//                             if (orderErr) {
//                                 connection.release(); // Release connection back to pool even on error
//                                 return connection.rollback(() => res.status(500).json({ message: 'Order creation error', error: orderErr }));
//                             }
//                             const orderId = orderResult.insertId;

//                             // 4. Insert into OrderItems table for each item in cart (using nested callbacks)
//                             const orderItemQueries = orderItemsData.map(orderItem => {
//                                 return (callback) => { // Modified to return a function for async.series
//                                     connection.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)', // connection.query is callback-based
//                                         [orderId, orderItem.product_id, orderItem.quantity, orderItem.price_at_purchase],
//                                         (itemErr, itemResult) => {
//                                             if (itemErr) {
//                                                 return callback(itemErr); // Pass error to callback
//                                             }
//                                             callback(null, itemResult); // Pass null for error, result for success
//                                         }
//                                     );
//                                 };
//                             });

//                             // Use async.series to execute orderItemQueries in series with callbacks
//                             async.series(orderItemQueries, (orderItemsError) => { // Use async.series and handle callback error
//                                 if (orderItemsError) {
//                                     connection.release(); // Release connection back to pool even on error
//                                     return connection.rollback(() => res.status(500).json({ message: 'OrderItem creation error', error: orderItemsError }));
//                                 }

//                                 // 5. Update Products table to set is_available = FALSE for purchased books (using nested callbacks)
//                                 const updateProductQueries = productIds.map(productId => {
//                                     return (callback) => { // Modified to return a function for async.series
//                                         connection.query('UPDATE Products SET is_available = FALSE WHERE product_id = ?', [productId], (updateErr, updateResult) => { // connection.query is callback-based
//                                             if (updateErr) {
//                                                 return callback(updateErr); // Pass error to callback
//                                             }
//                                             callback(null, updateResult); // Pass null for error, result for success
//                                         });
//                                     };
//                                 });

//                                 // Use async.series to execute updateProductQueries in series with callbacks
//                                 async.series(updateProductQueries, (updateProductsError) => { // Use async.series and handle callback error
//                                     if (updateProductsError) {
//                                         connection.release(); // Release connection back to pool even on error
//                                         return connection.rollback(() => res.status(500).json({ message: 'Product update error', error: updateProductsError }));
//                                     }

//                                     // 6. Commit transaction if all operations successful
//                                     connection.commit(commitErr => { // Commit transaction - callback-based
//                                         if (commitErr) {
//                                             return connection.rollback(() => res.status(500).json({ message: 'Commit error', error: commitErr }));
//                                         }
//                                         connection.release(); // Release connection back to pool AFTER COMMIT
//                                         res.status(201).json({ message: 'Order placed successfully', orderId: orderId });
//                                     });
//                                 });
//                             });
//                         });
//                 }); // end beginTransaction
//             }); // end getConnection
//         })
//         .catch(validationError => {
//             res.status(409).json({ message: 'Checkout failed', error: validationError.message }); // 409 Conflict for inventory issues
//         });
// });
// Checkout Endpoint (Session-Based Authentication)
// app.post('/api/checkout', (req, res) => {
//     const cartItems = req.body.cartItems;
//     const userId = 1;

//     // if (!userId) {
//     //     return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
//     // }
//     const shippingCity = req.body.shippingCity; // Get shippingCity from request body
// if (!shippingCity) { // Validate that shippingCity is provided
//     return res.status(400).json({ message: "Shipping city is required." });
// }

//     let paymentMethod = req.body.payment_method;
//     if (!paymentMethod || paymentMethod.trim() === '') {
//         paymentMethod = 'Cash on Delivery';
//     }

//     let orderTotal = 0;
//     const productIds = [];
//     const orderItemsData = [];

//     const productValidationQueries = cartItems.map(item => {
//         return new Promise((resolve, reject) => {
//             db.query('SELECT product_id, price, quantity_in_stock FROM Products WHERE product_id = ?', [item.book.product_id], (err, results) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 if (results.length === 0) {
//                     reject({ message: `Product ID ${item.book.product_id} not found.` });
//                     return;
//                 }
//                 const product = results[0];
//                 if (product.quantity_in_stock < item.quantity) {
//                     reject({ message: `Insufficient stock for product ${item.book.product_id}. Available stock: ${product.quantity_in_stock}` });
//                     return;
//                 }

//                 orderTotal += product.price * item.quantity;
//                 productIds.push(product.product_id);
//                 orderItemsData.push([item.quantity, product.price, product.product_id, 1]);
//                 resolve(product);
//             });
//         });
//     });

//     Promise.all(productValidationQueries)
//         .then(products => {
//             db.getConnection((connErr, connection) => {
//                 if (connErr) {
//                     console.error("DB Connection error:", connErr);
//                     return res.status(500).json({ message: 'Could not establish database connection' });
//                 }
//                 connection.beginTransaction((beginErr) => {
//                     if (beginErr) {
//                         connection.release();
//                         console.error("Transaction begin error:", beginErr);
//                         return res.status(500).json({ message: 'Failed to start transaction' });
//                     }

//                     // connection.query('INSERT INTO Orders (user_id, total_amount, payment_method, order_status) VALUES (?, ?, ?, ?)',
//                     connection.query('INSERT INTO Orders (user_id, total_amount, payment_method, order_status, shipping_city) VALUES (?, ?, ?, ?, ?)',
//                         [userId, orderTotal, paymentMethod, 'Completed', shippingCity],
//                         // [userId, orderTotal, paymentMethod, 'Completed'],
//                         (orderErr, orderResult) => {
//                             if (orderErr) {
//                                 return connection.rollback(() => {
//                                     connection.release();
//                                     console.error("Order insert error:", orderErr);
//                                     res.status(500).json({ message: 'Failed to place order', error: orderErr.message });
//                                 });
//                             }
//                             const orderId = orderResult.insertId;
//                             const orderItemsInsertQuery = 'INSERT INTO OrderItems (quantity, price_at_purchase, product_id, seller_id, order_id) VALUES ?';
//                             const orderItemsValues = orderItemsData.map(item => [...item, orderId]);

//                             connection.query(orderItemsInsertQuery, [orderItemsValues], (itemErr, itemResult) => {
//                                 if (itemErr) {
//                                     return connection.rollback(() => {
//                                         connection.release();
//                                         console.error("OrderItem insert error:", itemErr);
//                                         res.status(500).json({ message: 'Failed to create order items', error: itemErr.message });
//                                     });
//                                 }

//                                 const productUpdateQueries = productIds.map(productId => {
//                                     return new Promise((resolve, reject) => {
//                                         connection.query('UPDATE Products SET quantity_in_stock = quantity_in_stock - ? WHERE product_id = ?', [cartItems.find(item => item.book.product_id === productId).quantity, productId], (updateErr, updateResult) => {
//                                             if (updateErr) {
//                                                 reject(updateErr);
//                                             } else {
//                                                 resolve(updateResult);
//                                             }
//                                         });
//                                     });
//                                 });

//                                 Promise.all(productUpdateQueries)
//                                     .then(() => {
//                                         connection.commit((commitErr) => {
//                                             if (commitErr) {
//                                                 return connection.rollback(() => {
//                                                     connection.release();
//                                                     console.error("Transaction commit error:", commitErr);
//                                                     res.status(500).json({ message: 'Transaction commit failed', error: commitErr.message });
//                                                 });
//                                             }
//                                             connection.release();
//                                             res.status(200).json({ message: 'Checkout successful', orderId: orderId });
//                                         });
//                                     })
//                                     .catch(updateError => {
//                                         return connection.rollback(() => {
//                                             connection.release();
//                                             console.error("Product quantity update error:", updateError);
//                                             res.status(500).json({ message: 'Failed to update product quantity', error: updateError.message });
//                                         });
//                                     });
//                             });
//                         });
//                     });
//                 });
//             })
//         .catch(validationError => {
//             res.status(409).json({ message: 'Checkout failed', error: validationError.message });
//         });
// });

// // Order History Endpoint (Session-Based Authentication)
// app.get('/api/orders/history', (req, res) => {
//     const userId = req.session.userId; // Get userId from session

//     if (!userId) {
//         return res.status(401).json({ message: 'Unauthorized: User not logged in for order history.' });
//     }

//     const boughtOrdersQuery = `
//         SELECT
//             Orders.order_id, Orders.order_date, Orders.total_amount, Orders.payment_method, Orders.order_status,
//             OrderItems.order_item_id, OrderItems.quantity, OrderItems.price_at_purchase, OrderItems.seller_id,
//             Products.product_id, Products.title, Products.author, Products.price AS product_price
//         FROM Orders
//         JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//         JOIN Products ON OrderItems.product_id = Products.product_id
//         WHERE Orders.user_id = ?
//         ORDER BY Orders.order_date DESC;
//     `;

//     const soldOrdersQuery = `
//         SELECT
//             Orders.order_id, Orders.user_id AS buyer_id, Orders.order_date, Orders.total_amount, Orders.payment_method, Orders.order_status,
//             OrderItems.order_item_id, OrderItems.quantity, OrderItems.price_at_purchase, OrderItems.seller_id,
//             Products.product_id, Products.title, Products.author, Products.price AS product_price
//         FROM OrderItems
//         JOIN Orders ON OrderItems.order_id = Orders.order_id
//         JOIN Products ON OrderItems.product_id = Products.product_id
//         WHERE OrderItems.seller_id = ?
//         ORDER BY Orders.order_date DESC;
//     `;

//     async.parallel({
//         boughtOrders: (callback) => {
//             db.query(boughtOrdersQuery, [userId], callback);
//         },
//         soldOrders: (callback) => {
//             db.query(soldOrdersQuery, [userId], callback);
//         }
//     }, (err, results) => {
//         if (err) {
//             console.error("Order history query error:", err);
//             return res.status(500).json({ message: 'Failed to fetch order history', error: err.message });
//         }

//         res.status(200).json({
//             boughtOrders: results.boughtOrders,
//             soldOrders: results.soldOrders
//         });
//     });
// });
// Order History Endpoint (Session-Based Authentication)
// app.get('/orders/history', (req, res) => {
//     const userId = req.session.userId; // Get userId from session

//     if (!userId) {
//         return res.status(401).json({ message: 'Unauthorized: User not logged in for order history.' });
//     }

//     const boughtOrdersQuery = `
//         SELECT
//             Orders.order_id, Orders.order_date, Orders.total_amount, Orders.payment_method, Orders.order_status,
//             Orders.shipping_city, /* ADDED: Select shipping_city for bought orders */
//             OrderItems.order_item_id, OrderItems.quantity, OrderItems.price_at_purchase, OrderItems.seller_id,
//             Products.product_id, Products.title, Products.author, Products.price AS product_price
//         FROM Orders
//         JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//         JOIN Products ON OrderItems.product_id = Products.product_id
//         WHERE Orders.user_id = ?
//         ORDER BY Orders.order_date DESC;
//     `;

//     const soldOrdersQuery = `
//         SELECT
//             Orders.order_id, Orders.user_id AS buyer_id, Orders.order_date, Orders.total_amount, Orders.payment_method, Orders.order_status,
//             Orders.shipping_city, /* ADDED: Select shipping_city for sold orders */
//             OrderItems.order_item_id, OrderItems.quantity, OrderItems.price_at_purchase, OrderItems.seller_id,
//             Products.product_id, Products.title, Products.author, Products.price AS product_price
//         FROM OrderItems
//         JOIN Orders ON OrderItems.order_id = Orders.order_id
//         JOIN Products ON OrderItems.product_id = Products.product_id
//         WHERE OrderItems.seller_id = ?
//         ORDER BY Orders.order_date DESC;
//     `;

//     async.parallel({
//         boughtOrders: (callback) => {
//             db.query(boughtOrdersQuery, [userId], callback);
//         },
//         soldOrders: (callback) => {
//             db.query(soldOrdersQuery, [userId], callback);
//         }
//     }, (err, results) => {
//         if (err) {
//             console.error("Order history query error:", err);
//             return res.status(500).json({ message: 'Failed to fetch order history', error: err.message });
//         }

//         // Process boughtOrders to include shipping_city
//         const processedBoughtOrders = results.boughtOrders.map(order => ({
//             ...order,
//             shipping_city: order.shipping_city // Already included in the query, just passing it along
//         }));

//         // Process soldOrders to include shipping_city
//         const processedSoldOrders = results.soldOrders.map(order => ({
//             ...order,
//             shipping_city: order.shipping_city // Already included in query, passing it along
//         }));


//         res.status(200).json({
//             boughtOrders: processedBoughtOrders,
//             soldOrders: processedSoldOrders
//         });
//     });
// });
// Checkout Endpoint (Session-Based Authentication)
// app.post('/api/checkout', (req, res) => {
//         const cartItems = req.body.cartItems;
//         const userId = 1;
    
//         // if (!userId) {
//         //     return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
//         // }
//         const shippingCity = req.body.shippingCity; // Get shippingCity from request body
//     if (!shippingCity) { // Validate that shippingCity is provided
//         return res.status(400).json({ message: "Shipping city is required." });
//     }
    
//         let paymentMethod = req.body.payment_method;
//         if (!paymentMethod || paymentMethod.trim() === '') {
//             paymentMethod = 'Cash on Delivery';
//         }
    
//         let orderTotal = 0;
//         const productIds = [];
//         const orderItemsData = [];
    
//         const productValidationQueries = cartItems.map(item => {
//             return new Promise((resolve, reject) => {
//                 db.query('SELECT product_id, price, quantity_in_stock FROM Products WHERE product_id = ?', [item.book.product_id], (err, results) => {
//                     if (err) {
//                         reject(err);
//                         return;
//                     }
//                     if (results.length === 0) {
//                         reject({ message: `Product ID ${item.book.product_id} not found.` });
//                         return;
//                     }
//                     const product = results[0];
//                     if (product.quantity_in_stock < item.quantity) {
//                         reject({ message: `Insufficient stock for product ${item.book.product_id}. Available stock: ${product.quantity_in_stock}` });
//                         return;
//                     }
    
//                     orderTotal += product.price * item.quantity;
//                     productIds.push(product.product_id);
//                     // Modified line: Removed seller_id value (1) from orderItemsData.push
//                     orderItemsData.push([item.quantity, product.price, product.product_id]);
//                     resolve(product);
//                 });
//             });
//         });
    
//         Promise.all(productValidationQueries)
//             .then(products => {
//                 db.getConnection((connErr, connection) => {
//                     if (connErr) {
//                         console.error("DB Connection error:", connErr);
//                         return res.status(500).json({ message: 'Could not establish database connection' });
//                     }
//                     connection.beginTransaction((beginErr) => {
//                         if (beginErr) {
//                             connection.release();
//                             console.error("Transaction begin error:", beginErr);
//                             return res.status(500).json({ message: 'Failed to start transaction' });
//                         }
    
//                         // connection.query('INSERT INTO Orders (user_id, total_amount, payment_method, order_status) VALUES (?, ?, ?, ?)',
//                         connection.query('INSERT INTO Orders (user_id, total_amount, payment_method, order_status, shipping_city) VALUES (?, ?, ?, ?, ?)',
//                             [userId, orderTotal, paymentMethod, 'Completed', shippingCity],
//                             // [userId, orderTotal, paymentMethod, 'Completed'],
//                             (orderErr, orderResult) => {
//                                 if (orderErr) {
//                                     return connection.rollback(() => {
//                                         connection.release();
//                                         console.error("Order insert error:", orderErr);
//                                         res.status(500).json({ message: 'Failed to place order', error: orderErr.message });
//                                     });
//                                 }
//                                 const orderId = orderResult.insertId;
//                                 // Modified line: Removed seller_id from column list in INSERT query
//                                 const orderItemsInsertQuery = 'INSERT INTO OrderItems (quantity, price_at_purchase, product_id, order_id) VALUES ?';
//                                 const orderItemsValues = orderItemsData.map(item => [...item, orderId]);
    
//                                 connection.query(orderItemsInsertQuery, [orderItemsValues], (itemErr, itemResult) => {
//                                     if (itemErr) {
//                                         return connection.rollback(() => {
//                                             connection.release();
//                                             console.error("OrderItem insert error:", itemErr);
//                                             res.status(500).json({ message: 'Failed to create order items', error: itemErr.message });
//                                         });
//                                     }
    
//                                     const productUpdateQueries = productIds.map(productId => {
//                                         return new Promise((resolve, reject) => {
//                                             connection.query('UPDATE Products SET quantity_in_stock = quantity_in_stock - ? WHERE product_id = ?', [cartItems.find(item => item.book.product_id === productId).quantity, productId], (updateErr, updateResult) => {
//                                                 if (updateErr) {
//                                                     reject(updateErr);
//                                                 } else {
//                                                     resolve(updateResult);
//                                                 }
//                                             });
//                                         });
//                                     });
    
//                                     Promise.all(productUpdateQueries)
//                                         .then(() => {
//                                             connection.commit((commitErr) => {
//                                                 if (commitErr) {
//                                                     return connection.rollback(() => {
//                                                         connection.release();
//                                                         console.error("Transaction commit error:", commitErr);
//                                                         res.status(500).json({ message: 'Transaction commit failed', error: commitErr.message });
//                                                     });
//                                                 }
//                                                 connection.release();
//                                                 res.status(200).json({ message: 'Checkout successful', orderId: orderId });
//                                             });
//                                         })
//                                         .catch(updateError => {
//                                             return connection.rollback(() => {
//                                                 connection.release();
//                                                 console.error("Product quantity update error:", updateError);
//                                                 res.status(500).json({ message: 'Failed to update product quantity', error: updateError.message });
//                                             });
//                                         });
//                                 });
//                             });
//                         });
//                 })
//             .catch(validationError => {
//                 res.status(409).json({ message: 'Checkout failed', error: validationError.message });
//             });
//     });
    

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Used Book Marketplace backend!" });
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/client/index.html')); // IMPORTANT: Adjust path if needed
});
//backend/server.js (New /api/session-status endpoint for session check)
app.get('/api/session-status', (req, res) => {
    if (req.session.userId) { // Check if userId exists in session (session is valid)
        res.status(200).json({ loggedIn: true, username: req.session.username }); // User is logged in, send loggedIn: true and username
    } else {
        res.status(200).json({ loggedIn: false }); // User is not logged in, send loggedIn: false
    }
});

//app.use(bodyParser.json()); // For parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// app.use(session({
//     secret: 'YOUR_SESSION_SECRET_KEY', // **REPLACE WITH A STRONG, RANDOM SECRET KEY!**
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         // secure: true, // Uncomment in production if using HTTPS
//         maxAge: 3600000 // Session duration (e.g., 1 hour)
//     }
// }));

// --- CORS Middleware Setup ---
// app.use(cors({
//     origin: 'http://localhost:8082', // **ADJUST TO YOUR FRONTEND URL!**
//     credentials: true // Allow cookies in CORS requests
// }));\

// app.use(cors({
//     origin: 'http://127.0.0.1:8082', // **Use 'http://127.0.0.1:8082' to match the error - or use 'http://localhost:8082' if that's your intended frontend URL**
//     credentials: true
//   }));
// backend/server.js (New /api/orders/history endpoint)
// app.get('/api/order-history', (req, res) => {
//     // Authentication Check: Ensure user is logged in
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in to view order history.' });
//     }

//     const userId = req.session.userId;

//     // Database Query to fetch order history for the user
//     const query = `
//         SELECT
//             Orders.order_id,
//             Orders.order_date,
//             Orders.total_amount,
//             Orders.payment_method,
//             OrderItems.quantity,
//             OrderItems.price_at_purchase,
//             Products.title AS product_title,
//             Products.author AS product_author
//         FROM Orders
//         JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//         JOIN Products ON OrderItems.product_id = Products.product_id
//         WHERE Orders.user_id = ?
//         ORDER BY Orders.order_date DESC; -- Order by date, newest first
//     `;

//     db.query(query, [userId], (error, results) => {
//         if (error) {
//             console.error('Error fetching order history:', error);
//             return res.status(500).json({ message: 'Failed to fetch order history', error: error });
//         }

//         // Structure the results (optional, but makes frontend easier to handle)
//         const orderHistory = [];
//         const ordersMap = new Map(); // Use a Map to group order items by order_id

//         results.forEach(row => {
//             if (!ordersMap.has(row.order_id)) {
//                 ordersMap.set(row.order_id, {
//                     order_id: row.order_id,
//                     order_date: row.order_date,
//                     total_amount: row.total_amount,
//                     payment_method: row.payment_method,
//                     items: [] // Array to hold order items for this order
//                 });
//             }
//             const order = ordersMap.get(row.order_id);
//             order.items.push({
//                 product_title: row.product_title,
//                 product_author: row.product_author,
//                 quantity: row.quantity,
//                 price_at_purchase: row.price_at_purchase
//             });
//         });

//         // Convert Map values to an array for the final response
//         orderHistory.push(...ordersMap.values());

//         res.status(200).json({ orderHistory: orderHistory });
//     });
// });
// app.get('/api/order-history', async (req, res) => {
//     try {
//         // Authentication Check: Ensure user is logged in
//         if (!req.session.userId) {
//             return res.status(401).json({ message: 'Unauthorized. Please log in to view order history.' });
//         }

//         const userId = req.session.userId;

//         // Database Query using Promises
//         const query = `
//             SELECT
//                 Orders.order_id,
//                 Orders.order_date,
//                 Orders.total_amount,
//                 Orders.payment_method,
//                 OrderItems.quantity,
//                 OrderItems.price_at_purchase,
//                 Products.title AS product_title,
//                 Products.author AS product_author
//             FROM Orders
//             JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//             JOIN Products ON OrderItems.product_id = Products.product_id
//             WHERE Orders.user_id = ?
//             ORDER BY Orders.order_date DESC;
//         `;

//         const results = await new Promise((resolve, reject) => {
//             db.query(query, [userId], (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         // Structure the results
//         const orderHistory = [];
//         const ordersMap = new Map();

//         results.forEach((row) => {
//             if (!ordersMap.has(row.order_id)) {
//                 ordersMap.set(row.order_id, {
//                     order_id: row.order_id,
//                     order_date: row.order_date,
//                     total_amount: row.total_amount,
//                     payment_method: row.payment_method,
//                     items: []
//                 });
//             }
//             const order = ordersMap.get(row.order_id);
//             order.items.push({
//                 product_title: row.product_title,
//                 product_author: row.product_author,
//                 quantity: row.quantity,
//                 price_at_purchase: row.price_at_purchase
//             });
//         });

//         // Convert Map values to an array for the final response
//         orderHistory.push(...ordersMap.values());

//         res.status(200).json({ orderHistory });

//     } catch (error) {
//         console.error('Error fetching order history:', error);
//         res.status(500).json({ message: 'Failed to fetch order history', error });
//     }
// });
// app.post('/api/order-complete', async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in to place order.' });
//     }

//     const userId = req.session.userId;
//     const { cartItems, payment_method } = req.body; // Assuming you send cartItems and payment_method

//     if (!cartItems || cartItems.length === 0 || !payment_method) {
//         return res.status(400).json({ message: 'Invalid order data.' });
//     }

//     let total_amount = 0;
//     for (const item of cartItems) {
//         total_amount += item.price_at_purchase * item.quantity; // Calculate total from cart items
//     }

//     try {
//         // Start database transaction (for atomicity - optional for simplicity in this example)
//         await new Promise((resolve, reject) => { // Simple transaction start - adjust for your DB library
//             db.beginTransaction((err) => {
//                 if (err) reject(err);
//                 else resolve();
//             });
//         });

//         // 1. Insert into Orders table
//         const orderResult = await new Promise((resolve, reject) => {
//             db.query('INSERT INTO Orders (user_id, total_amount, payment_method) VALUES (?, ?, ?)',
//                 [userId, total_amount, payment_method], (error, results) => {
//                     if (error) reject(error);
//                     else resolve(results);
//                 });
//         });

//         const order_id = orderResult.insertId; // Get the newly inserted order ID

//         // 2. Insert into OrderItems table for each item in cartItems
//         for (const item of cartItems) {
//             await new Promise((resolve, reject) => {
//                 db.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
//                     [order_id, item.product_id, item.quantity, item.price_at_purchase], (error, results) => {
//                         if (error) reject(error);
//                         else resolve(results);
//                     });
//             });
//         }

//         // Commit transaction (if you started one)
//         await new Promise((resolve, reject) => { // Simple transaction commit - adjust for your DB library
//             db.commit((err) => {
//                 if (err) reject(err);
//                 else resolve();
//             });
//         });


//         res.status(201).json({ message: 'Order placed successfully!', orderId: order_id }); // Return success and order ID

//     } catch (error) {
//         // Rollback transaction on error (if you started one)
//         await new Promise((resolve, reject) => { // Simple transaction rollback - adjust for your DB library
//             db.rollback(() => resolve()); // Ignore rollback error for this example
//         });

//         console.error('Error completing order:', error);
//         res.status(500).json({ message: 'Failed to complete order.', error: error });
//     }
// });
// server.js (Add this route handler)

// app.get('/api/seller/sales-history', async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in to view sales history.' });
//     }
//     const sellerUserId = req.session.userId;

//     try {
//         const salesHistory = await new Promise((resolve, reject) => {
//             db.query(`
//                 SELECT
//                     p.product_id,
//                     p.title,
//                     p.author,
//                     p.price,
//                     p.image_url,
//                     p.is_available
//                 FROM Products p
//                 WHERE p.seller_id = ?
//                 ORDER BY p.product_id DESC
//             `, [sellerUserId], (error, results) => {
//                 if (error) reject(error);
//                 else resolve(results);
//             });
//         });

//         res.status(200).json({ salesHistory: salesHistory });

//     } catch (error) {
//         console.error('Error fetching seller sales history:', error);
//         res.status(500).json({ message: 'Failed to fetch sales history.', error: error });
//     }
// });
// API endpoint to get order details by order ID
// app.get('/api/order-details/:orderId', async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in to view order details.' });
//     }
//     const orderId = req.params.orderId;
//     const userId = req.session.userId;

//     try {
//         const query = `
//             SELECT
//                 Orders.*,
//                 OrderItems.*,
//                 Products.title AS product_title,
//                 Products.author AS product_author
//             FROM Orders
//             JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//             JOIN Products ON OrderItems.product_id = Products.product_id
//             WHERE Orders.order_id = ? AND Orders.user_id = ?
//         `;
//         const results = await new Promise((resolve, reject) => {
//             db.query(query, [orderId, userId], (error, results) => {
//                 if (error) reject(error);
//                 else resolve(results);
//             });
//         });

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Order not found or unauthorized.' });
//         }

//         const orderDetails = {
//             order_id: results[0].order_id,
//             order_date: results[0].order_date,
//             total_amount: results[0].total_amount,
//             payment_method: results[0].payment_method,
//             shipping_address: results[0].shipping_address,
//             order_status: results[0].order_status,
//             items: results.map((row) => ({
//                 product_title: row.product_title,
//                 product_author: row.product_author,
//                 quantity: row.quantity,
//                 price_at_purchase: row.price_at_purchase
//             }))
//         };

//         res.status(200).json({ orderDetails: orderDetails });

//     } catch (error) {
//         console.error('Error fetching order details:', error);
//         res.status(500).json({ message: 'Failed to fetch order details.', error: error });
//     }
// });


// app.get('/api/order-history', async (req, res) => { // Make the route handler async
//     try {
//         // Authentication Check: Ensure user is logged in
//         if (!req.session.userId) {
//             return res.status(401).json({ message: 'Unauthorized. Please log in to view order history.' });
//         }

//         const userId = req.session.userId;

//         // Database Query using Promises (assuming your 'db.query' supports promises, or you can promisify it)
//         const query = `
//             SELECT
//                 Orders.order_id,
//                 Orders.order_date,
//                 Orders.total_amount,
//                 Orders.payment_method,
//                 OrderItems.quantity,
//                 OrderItems.price_at_purchase,
//                 Products.title AS product_title,
//                 Products.author AS product_author
//             FROM Orders
//             JOIN OrderItems ON Orders.order_id = OrderItems.order_id
//             JOIN Products ON OrderItems.product_id = Products.product_id
//             WHERE Orders.user_id = ?
//             ORDER BY Orders.order_date DESC; -- Order by date, newest first
//         `;

//         const results = await new Promise((resolve, reject) => { // Promisify db.query
//             db.query(query, [userId], (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         // Structure the results (optional, but makes frontend easier to handle)
//         const orderHistory = [];
//         const ordersMap = new Map(); // Use a Map to group order items by order_id

// results.forEach((row) => { // Correct JavaScript - remove the type annotation { //  <--  The ": any" is the problem! => { // Add type annotation for 'row'
//             if (!ordersMap.has(row.order_id)) {
//                 ordersMap.set(row.order_id, {
//                     order_id: row.order_id,
//                     order_date: row.order_date,
//                     total_amount: row.total_amount,
//                     payment_method: row.payment_method,
//                     items: [] // Array to hold order items for this order
//                 });
//             }
//             const order = ordersMap.get(row.order_id);
//             order.items.push({ // Use non-null assertion here as 'order' will always be found in the map
//                 product_title: row.product_title,
//                 product_author: row.product_author,
//                 quantity: row.quantity,
//                 price_at_purchase: row.price_at_purchase
//             });
//         });

//         // Convert Map values to an array for the final response
//         orderHistory.push(...ordersMap.values());

//         res.status(200).json({ orderHistory: orderHistory });

//     } catch (error) {
//         console.error('Error fetching order history:', error);
//         res.status(500).json({ message: 'Failed to fetch order history', error: error });
//     }
// });
// app.post('/api/auth/logout', (req, res) => { // Or app.get('/api/auth/logout', ... if you prefer GET for logout)
//     // Destroy the session
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error destroying session:', err);
//         return res.status(500).json({ message: 'Logout failed' }); // Or more generic error
//       }
  
//       // Optional: Clear the session cookie in the browser (though session destruction often handles this)
//       // res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name for express-session
  
//       res.status(200).json({ message: 'Logout successful' }); // Send success response
//     });
//   });
// server.js (Add this route handler after /api/order-details/:orderId)

// app.put('/api/orders/:orderId/status', async (req, res) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in to update order status.' }); // Or maybe require admin role later
//     }

//     const orderId = req.params.orderId;
//     const newStatus = 'Completed'; // For now, we are just setting it to "Completed"

//     if (!orderId || isNaN(orderId)) {
//         return res.status(400).json({ message: 'Invalid order ID.' });
//     }

//     try {
//         const updateResult = await new Promise((resolve, reject) => {
//             db.query('UPDATE Orders SET order_status = ? WHERE order_id = ?',
//                 [newStatus, orderId], (error, results) => {
//                     if (error) reject(error);
//                     else resolve(results);
//                 });
//         });

//         if (updateResult.affectedRows === 0) {
//             return res.status(404).json({ message: 'Order not found or status not updated.' }); // Order ID might not exist
//         }

//         res.status(200).json({ message: 'Order status updated to Completed successfully!', orderId: orderId, newStatus: newStatus });

//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ message: 'Failed to update order status.', error: error });
//     }
// });
app.post('/api/auth/logout', (req, res) => {
    console.log('Backend /api/auth/logout route called'); // Logging when logout route is hit
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session during logout:', err);
            return res.status(500).json({ message: 'Logout failed due to server error' });
        }
        console.log('Session destroyed successfully'); // Logging successful session destroy
        res.status(200).json({ message: 'Logout successful' }); // Send success response
    });
});
console.log('Checking if db object is defined:', !!db); // Add this line to check if 'db' is defined
    if (db) {
        console.log('Checking if db.promise is defined:', !!db.promise); // Check if 'db.promise' is defined
    } else {
        console.error('❌ db object is NOT defined after require(\'./config/db.config\')!'); // Error if 'db' is not defined
    }
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🟢 Server running on port ${PORT}`);
});



// // server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const productRoutes = require('./routes/products.routes'); // Import product routes
// const authRoutes = require('./routes/auth.routes');
// dotenv.config(); // Load environment variables from .env file

// const app = express();

// // Middleware
// app.use(cors()); // Enable CORS for cross-origin requests (Angular frontend)
// app.use(express.json()); // Parse JSON request bodies

// // Routes
// app.use('/api/products', productRoutes); // Use product routes under /api/products

// // Simple route to check if server is running
// app.get('/', (req, res) => {
//     res.json({ message: "Welcome to the Used Book Marketplace backend!" });
// });

// const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// app.listen(PORT, () => {
//     console.log(`🟢 Server running on port ${PORT}`);
// });