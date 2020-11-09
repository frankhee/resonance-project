const axios = require("axios");
const e = require("express");
const jwt = require("jsonwebtoken");

const max = 100;
const pageSize = 15;

// axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

function handleGetProducts(req, res) {
  const auth = req.headers.authorization;
  if(auth) {
    if(!auth.startsWith("Bearer")) {
      return res.status(404).json({ token: "Invalid Bearer token!" });
    }
    const bearerToken = auth.substring(7, auth.length);
    jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        return res.status(404).json({ token: "Invalid JWT token!" });
      } else {
        const offset = req.cookies.offset;
        if (offset) {
          getNextProductPage(req, res, offset);
        } else {
          getFirstProductPage(req, res);
        } 
      }
    });
  } else {
    return res.status(404).json({ token: "No auth token provided!" });
  }
}

async function fetchProductPage() {
  try {
    const response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture?fields%5B%5D=Name&fields%5B%5D=Picture&fields%5B%5D=Vendor&fields%5B%5D=Unit+Cost&maxRecords=${max}&pageSize=${pageSize}&view=Main%20View`);
    const offset = response.data.offset;
    return [response.data.records, offset];
  } catch (error) {
    console.error(error);
  }
}

async function fetchOffsetProductPage(offset) {
  try {
    const response = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Furniture?fields%5B%5D=Name&fields%5B%5D=Picture&fields%5B%5D=Vendor&fields%5B%5D=Unit+Cost&maxRecords=${max}&pageSize=${pageSize}&offset=${offset}&view=Main%20View`);
    const newOffset = response.data.offset;

    return [response.data.records, newOffset];
  } catch (error) {
    console.error(error);
  }
}

async function getFirstProductPage(req, res) {
  let moreProducts = true;
  const [products, offset] = await fetchProductPage();
  for(let item of products) {
    const vendorID = item.fields.Vendor[0];
    const vendorInfo = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Vendors/${vendorID}`);
    const vendorName = vendorInfo.data.fields.Name;
    item.fields.Vendor = vendorName;
  }
  if(offset) {
    res.cookie('offset', offset);
  } else {
    moreProducts = false;
  }

  res.json({products, moreProducts});
}

async function getNextProductPage(req, res, offset) {
  let moreProducts = true;
  const [products, newOffset] = await fetchOffsetProductPage(offset);
  for(let item of products) {
    const vendorID = item.fields.Vendor[0];
    const vendorInfo = await axios.get(`${process.env.AIRTABLE_BASE_URL}/Vendors/${vendorID}`);
    const vendorName = vendorInfo.data.fields.Name;
    item.fields.Vendor = vendorName;
  }
  if(newOffset) {
    res.cookie('offset', newOffset);
  } else {
    res.clearCookie("offset");
    moreProducts = false;
  }
  res.json({products, moreProducts});
}

module.exports = {
  handleGetProducts
};