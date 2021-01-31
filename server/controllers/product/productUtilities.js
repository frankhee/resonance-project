const axios = require("axios");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require('dotenv').config();

//Define the number of records returned each request and max records that can be returned each request
const max = 100;
const pageSize = 16;

//Initialize nodemailer transporter 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
  }
});

//Trigger Airtable query to load product catalog
function handleGetProducts(req, res) {
  const auth = req.headers.authorization;
  //Authenticate user
  if(auth) {
    if(!auth.startsWith("Bearer")) {
      return res.status(404).json({ token: "Invalid Bearer token!" });
    }
    //Check JWT token
    const bearerToken = auth.substring(7, auth.length);
    jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        return res.status(404).json({ token: "Invalid JWT token!" });
      } else {
        //Get product information
        const offset = req.cookies.offset;
        getProductPage(req, res, offset);
      }
    });
  } else {
    return res.status(404).json({ token: "No auth token provided!" });
  }
}

//Query Airtable database to retrieve product information
async function getProductPage(req, res, offset = null) {
  let moreProducts = true, products, newOffset;
  if(offset) {
    [products, newOffset] = await fetchProductPage(offset);
  }else {
    [products, newOffset] = await fetchProductPage();
  }
  //Add vendor information to payload
  for(let item of products) {
    const vendorID = item.fields.Vendor[0];
    const vendorInfo = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Vendors/${vendorID}`);
    const vendorName = vendorInfo.data.fields.Name;
    item.fields.Vendor = vendorName;
  }
  //Set offset value in cookie
  if(newOffset) {
    res.cookie('offset', newOffset);
  } else {
    res.clearCookie("offset");
    moreProducts = false;
  }
  res.json({products, moreProducts});
}

//Fetch product information based on offset
async function fetchProductPage(offset = null) {
  try {
    let response;
    if(offset) {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture?fields%5B%5D=Name&fields%5B%5D=Picture&fields%5B%5D=Vendor&fields%5B%5D=Unit+Cost&maxRecords=${max}&pageSize=${pageSize}&offset=${offset}&view=Main%20View`);
    } else {
      response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture?fields%5B%5D=Name&fields%5B%5D=Picture&fields%5B%5D=Vendor&fields%5B%5D=Unit+Cost&maxRecords=${max}&pageSize=${pageSize}&view=Main%20View`);
    }
    const newOffset = response.data.offset;
    return [response.data.records, newOffset];
  } catch (error) {
    console.error(error);
  }
}

//Retrieve information on a specific product based on product ID
async function getProductInfo(id) {
  try {
    const response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//Send additional product information to the user with nodemailer
async function sendProductInfo(req, res) {
  const auth = req.headers.authorization;
  //Authenticate user
  if(auth) {
    if(!auth.startsWith("Bearer")) {
      return res.status(404).json({ token: "Invalid Bearer token!" });
    }
    //Verify JWT token
    const bearerToken = auth.substring(7, auth.length);
    jwt.verify(bearerToken, process.env.JWT_SECRET, async function(err, decoded) {
      if(err) {
        return res.status(404).json({ token: "Invalid JWT token!" });
      } else {
        //Gather additional product info
        const productID = req.body.id;
        const response = await getProductInfo(productID);
        const productFields = response.data.fields;
        const mailOptions = {
          from: `${process.env.GMAIL_USERNAME}`,
          to: `${decoded.key}, techpirates@resonance.nyc`,
          subject: `More information on ${productFields.Name}`,
          html: `<h3>Below is the requested information of ${productFields.Name},</h3><p><b>Description:</b> ${productFields.Description}</p><p><b>Link to product:</b> ${productFields.Link}</p>`
        };
        //Send additional product info to user's email
        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            res.json({message: "Email could not be delivered :("})
          }
          res.json({message: "Email successfully sent :)"})
        });
      }
    });
  } else {
    return res.status(404).json({ token: "No auth token provided!" });
  }
}


module.exports = {
  handleGetProducts,
  sendProductInfo
};
