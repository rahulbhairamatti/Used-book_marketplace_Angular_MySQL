// backend/controllers/auth.controller.js
// const dbPool = require('../config/db.config');
// const bcrypt = require('bcryptjs'); // Import bcrypt
// WARNING: THIS CODE IS INSECURE! DO NOT USE IN PRODUCTION!
// FOR TESTING PURPOSES ONLY!

const dbPool = require('../config/db.config');
// const bcrypt = require('bcryptjs'); // REMOVE bcrypt import - NOT USED ANYMORE

exports.register = async (req, res) => { // Make register function async
    const { username, password, email } = req.body; // Extract email as well

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Check if username already exists (using database query)
        const [existingUsers] = await dbPool.promise().query('SELECT * FROM Users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Username already exists" }); // 409 Conflict status
        }

        // *** INSECURE: STORE PLAIN TEXT PASSWORD DIRECTLY! ***
        // const plainTextPassword = password; // Just use the password as is - INSECURE!

        // Insert user into database (including email if provided)
        const newUser = {
            username,
            password, // STORE PLAIN TEXT PASSWORD - INSECURE!
            email: email || null
        };
        await dbPool.promise().query('INSERT INTO Users SET ?', newUser);
        res.status(201).json({ message: "User registered successfully" }); // 201 Created status
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error registering user" }); // 500 Internal Server Error
    }
};
// WARNING: THIS CODE IS INSECURE! DO NOT USE IN PRODUCTION!    // console.log("Session userId set:", req.session.userId); // Log session userId after setting
        //     console.log("req.session.id in login:", req.session.id);
        //    console.log("req.session object in login:", req.session);
        //    console.log("Session saved. ID:", req.session.id);
// FOR TESTING PURPOSES ONLY!

// const dbPool = require('../config/db.config');
// const bcrypt = require('bcryptjs'); // REMOVE bcrypt import - NOT USED ANYMORE

exports.login = async (req, res) => { // Make login function async
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Query database to find user by username
        const [users] = await dbPool.promise().query('SELECT * FROM Users WHERE username = ?', [username]);
        const user = users[0]; // Take the first user if found

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" }); // Unauthorized - user not found
        }

        // *** INSECURE: COMPARE PLAIN TEXT PASSWORDS DIRECTLY! ***
        const passwordMatch = (password === user.password); // Direct plain text password comparison - INSECURE!

        if (passwordMatch) {
            // In a real app, you'd generate a JWT token or use sessions here
            console.log("Login successful for user:", user); // Log the entire user object
            console.log("user.user_id:", user.user_id);   // Log user_id specifically

            req.session.userId = user.user_id;  // <------------ **ADD THIS LINE!  Set userId in session**
            req.session.save((err) => { // Explicitly save the session
                if (err) {
                  console.error("Session save error:", err);
                  return res.status(500).json({ message: "Session error" });
                }
       
            res.json({ message: "Login successful", username: user.username });
       
            req.session.username = username;
         // Simple success response
        } );
    }else {
            res.status(401).json({ message: "Invalid credentials" }); // Unauthorized - password mismatch
        }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error logging in" }); // 500 Internal Server Error
    }
};
// exports.register = async (req, res) => { // Make register function async
//     const { username, password, email } = req.body; // Extract email as well


//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required" });
//     }
 
//     try {
//         // Check if username already exists (using database query)
//        // const [existingUsers] = await dbPool.query('SELECT * FROM Users WHERE username = ?', [username]); // Use parameterized query
//          const [existingUsers] = await dbPool.promise().query('SELECT * FROM Users WHERE username = ?', [username]); // ADD .promise() here
     
        
//         if (existingUsers.length > 0) {
//             return res.status(409).json({ message: "Username already exists" }); // 409 Conflict status
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

//         // Insert user into database (including email if provided)
//         const newUser = {
//             username,
//             password_hash: hashedPassword, // Store the hash, not the plain password
//             email: email || null // Store email or null if not provided
//         };
//         //await dbPool.query('INSERT INTO Users SET ?', newUser); // Use parameterized query
//        await dbPool.promise().query('INSERT INTO Users SET ?', newUser); // ADD .promise() here
//         res.status(201).json({ message: "User registered successfully" }); // 201 Created status
//     } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).json({ message: "Error registering user" }); // 500 Internal Server Error
//     }
// };


// exports.login = async (req, res) => { // Make login function async
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required" });
//     }

//     try {
//         // Query database to find user by username
//         // const [users] = await dbPool.query('SELECT * FROM Users WHERE username = ?', [username]); // Parameterized query
//         const [users] = await dbPool.promise().query('SELECT * FROM Users WHERE username = ?', [username]); // Parameterized query  <--- ADD .promise() HERE
//         const user = users[0]; // Take the first user if found

//         if (!user) {
//             return res.status(401).json({ message: "Invalid credentials" }); // Unauthorized - user not found
//         }

//         // Compare password using bcrypt
//         const passwordMatch = await bcrypt.compare(password, user.password_hash);

//         if (passwordMatch) {
//             // In a real app, you'd generate a JWT token or use sessions here
//             res.json({ message: "Login successful", username: user.username }); // Simple success response
//         } else {
//             res.status(401).json({ message: "Invalid credentials" }); // Unauthorized - password mismatch
//         }

//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Error logging in" }); // 500 Internal Server Error
//     }
// };
// // backend/controllers/auth.controller.js
// const dbPool = require('../config/db.config');
// // In a real app, you'd use bcrypt to hash passwords and proper user management

// // Sample user data (for simplicity - replace with database in real app)
// const users = [
//     { username: 'user1', password: 'password1' },
//     { username: 'user2', password: 'password2' }
// ];

// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required" });
//     }

//     // In a real app, you'd query the database to find the user by username
//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         // In a real app, you'd generate a JWT token or use sessions
//         res.json({ message: "Login successful", username: user.username }); // Simple success response
//     } else {
//         res.status(401).json({ message: "Invalid credentials" }); // Unauthorized
//     }
// };