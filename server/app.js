// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const { symbol, date } = req.query;

    if (!symbol || !date) {
        return res.status(400).json({ error: 'Missing parameters: symbol and date are required.' });
    }

    const base_url = 'https://api.polygon.io';
    const endpoint = `/v1/open-close/${symbol}/${date}`;
    const params = {
        apiKey: 'hLb04tS3G2929RgmCBzFMk4fVY4C6DYE'
    };

    try {
        const response = axios.get(`${base_url}${endpoint}`, { params });
        const stockData = response.data;
        return res.status(200).json(stockData);
    } catch (error) {
        return res.status(error.response?.status || 500).json({ error: 'Error fetching Stock Data.' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));