const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const cors = require("cors");
const app = express();
require('dotenv').config();

//Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Connect to Airtable
const Airtable = require('airtable');
const base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base(`${process.env.AIRTABLE_DB_ID}`);


// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser()); 

//Attach Airtable API key to axios requests 
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

//API endpoints
app.use("/api/users", users);
app.use("/api/products", products);

//Listent to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
