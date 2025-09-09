// const fs = require('fs');

// fs.writeFileSync("./test.txt", "Hello, World!");

// const result = fs.readFileSync('./contacts.txt', 'utf8');
// console.log("File contents:", result);

// fs.appendFile('test.txt', '\nsubham', (err) => {
//     if (err) {
//         console.error("Error appending to file:", err);
//         return;
//     }
//     console.log("Successfully appended to file");
//     });

// async function run() {

// await fs.unlink('contacts.txt', (err) => {
//     if (err) {
//         console.error("Error deleting file:", err);
//         return;
//     }
//     console.log("Successfully deleted file");
// });
// }
// run();

// -------------------------------------------- Building http server -----------------------------------------------------------------------------------------

// const http = require('http');
// const myServer = http.createServer((req, res) => {
//     console.log("Request received");
//     res.end("Hello from the server");
// });

// myServer.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });

// ------------------------------------------------ Handling URLs and query parameters -------------------------------------------------------------------------------------

// const http = require('http');
// const url = require('url');

// http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const query = parsedUrl.query;
//   console.log(query);
//   res.end("Check console");
// }).listen(3000);

// Express server example

// const express = require('express');
// const app = express();
 
// app.get('/', (req, res) =>{
//   return res.send(" Hello from Express server");
// });
// app.get('/about', (req, res)  =>{
//   return res.send("Hello from about page");
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// --------------------------------------------------- Middleware example ----------------------------------------------------------------------------------

// const express = require('express');
// const app = express();

// app.use(function(req, res, next) {
//   console.log("middleware called");      //before running the route handler the app.use fucntion is called and run the code
//   next();                                //next() is used to pass the control to the next middleware function in the stack or to the route handler
// });
// app.use(function(err, req,res,next) {f
//   console.error("Error occurred:", err.message);
//   res.status(500).send("Something went wrong!");
// });

// app.get('/', (req, res,next) => {
//   return res.send("Hello from Express server");
//   return next(new Error("something broke!")); 
// });
// app.listen(3000);

// ----------------------------------------------------Form Handling,  Cookies---------------------------------------------------------------------------------

// const express = require('express');
// const cookieParser = require('cookie-parser');   // npm install express cookie-parser


// const app = express();
// app.use(cookieParser());

// // Set cookie
// app.get('/set-cookie', (req, res) => {
//     res.cookie('username', 'John', { maxAge: 3600000, httpOnly: true });
//     res.send('Cookie set!');
// });

// // Read cookie
// app.get('/get-cookie', (req, res) => {
//     res.send(`Hello ${req.cookies.username || 'Guest'}`);
// });

// // Clear cookie
// app.get('/clear-cookie', (req, res) => {
//     res.clearCookie('username');
//     res.send('Cookie cleared!');
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// --------------------------------------------------- Session example ----------------------------------------------------------------------------------



// const express = require("express");
// const session = require("express-session");

// const app = express();
// const PORT = 3000;

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));

// // Session middleware
// app.use(
//   session({
//     secret: "mySecretKey", // should be in env variable in real apps
//     resave: false,         // don't save session if not modified
//     saveUninitialized: true, // save new sessions
//     cookie: {
//       maxAge: 1000 * 60 * 5, // cookie lasts 5 minutes
//     },
//   })
// );
// app.post("/login", (req, res) => {
//   const { username } = req.body;
//   req.session.username = username;
//   res.send(`Session started for ${username}`);
// });

// // Route to get session data
// app.get("/profile", (req, res) => {
//   if (req.session.username) {
//     res.send(`Welcome back, ${req.session.username}`);
//   } else {
//     res.send("No active session. Please log in first.");
//   }
// });

// // Route to destroy session
// app.get("/logout", (req, res) => {
//   req.session.destroy(err => {
//     if (err) return res.send("Error logging out");
//     res.clearCookie("connect.sid"); // delete cookie
//     res.send("Logged out successfully");
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// /* ---------------------- 1. Logging Middleware ---------------------- */
// // Create a simple logging middleware
// function requestLogger(req, res, next) {
//   const timestamp = new Date().toISOString();
//   console.log(`${timestamp} - ${req.method} ${req.url}`);
//   next(); // Don't forget to call next()
// }

// // Use the middleware
// app.use(requestLogger);

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/* ---------------------- 2. Authentication Middleware ---------------------- */
// function authenticate(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
  
//   if (token === "secret-token") {
//     req.user = { id: 1, username: "JohnDoe" }; // attach user info
//     next();
//   } else {
//     res.status(401).json({ error: "Unauthorized. Please provide a valid token." });
//   }
// }

// /* ---------------------- 3. Validation Middleware ---------------------- */
// function validateUser(req, res, next) {
//   const { username, email } = req.body;

//   if (!username || username.length < 3) {
//     return res.status(400).json({ error: "Username must be at least 3 characters long" });
//   }

//   if (!email || !email.includes("@")) {
//     return res.status(400).json({ error: "Invalid email format" });
//   }

//   next();
// }

// /* ---------------------- Routes ---------------------- */
// app.get("/", (req, res) => {
//   res.send("Welcome! Try POST /users or GET /secret");
// });

// // Public route with validation
// app.post("/users", validateUser, (req, res) => {
//   res.json({ message: "User created successfully", data: req.body });
// });

// // Protected route (requires token)
// app.get("/secret", authenticate, (req, res) => {
//   res.json({ message: `Hello ${req.user.username}, welcome to the secret area!` });
// });

// // Example route that throws an error
// app.get("/error", (req, res, next) => {
//   next(new Error("Something broke!"));
// });

// /* ---------------------- 4. Error Handling Middleware ---------------------- */
app.use((err, req, res, next) => {
  console.error("Error caught by middleware:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// /* ---------------------- Start Server ---------------------- */
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
