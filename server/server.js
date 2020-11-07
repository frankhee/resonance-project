const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const users = require("./routes/api/users");
const cors = require("cors");
const app = express();
require('dotenv').config();

//Middleware
app.use(cors());

//Connect to Airtable
const Airtable = require('airtable');
const base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base(`${process.env.AIRTABLE_DB_ID}`);


// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


  const baseUrl = 'https://api.airtable.com/v0'
  const dbId = process.env.AIRTABLE_DB_ID
  const apikey = process.env.AIRTABLE_API_KEY
  const max = 100
  

axios.defaults.headers.common['Authorization'] = `Bearer ${apikey}`;

//Controller manages util and network calls
function handleGetProducts(req, res) {
  const offset = req.cookies.offset
  
  if (offset) {
    console.log("offset is string undefined in handleGetProduct", offset==="undefined")
    getNextProductPage(req, res, offset)
  } else {
    getFirstProductPage(req, res)
  }
}

async function fetchProductPage() {
  try {
    const response = await axios.get(`${baseUrl}/${dbId}/Furniture?maxRecords=${max}&pageSize=2&view=Main%20View`);

    const offset = response.data.offset
    // response.data.records.forEach(record => console.log(record))
    return [response.data.records, offset]
  } catch (error) {
    console.error(error);
  }
}
async function fetchOffsetProductPage(offset) {
  try {
    const response = await axios.get(`${baseUrl}/${dbId}/Furniture?maxRecords=${max}&pageSize=2&offset=${offset}&view=Main%20View`);
    const newOffset = response.data.offset

    return response.data
  } catch (error) {
    console.error(error);
  }
}

async function getFirstProductPage(req, res) {
  console.log("Inside getFirstProductPage")
  const [products, offset] = await fetchProductPage()
  res.cookie('offset', offset)

  res.json({products})
}

async function getNextProductPage(req, res, offset) {
  res.cookie('backOffset', offset)
  console.log("Inside getNextProductPage")
  const response = await fetchOffsetProductPage(offset)

  console.log("newOffset in getNextProductPage", response.offset)
  response.offset && res.cookie('offset', response.offset)
  res.json({records: response.records})
}

// app.get("/products", handleGetProducts)
app.use("/api/users", users);
// test();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));

function test() {
  let email = 'aryandev12@gmail.com', username = 'yryan0512'
  base('Users').select({
    filterByFormula: `OR(key = '${email}', username = '${username}')`,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    console.log("RECORDS: ", records)
    if(records.length) {
      isCreated = true;
    }
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  
  }, function done(err) {
    console.log("Search executed")
    if (err) { console.error(err); return; }
  });
}
