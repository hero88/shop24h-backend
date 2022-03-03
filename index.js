const express = require("express"); // Tương ứng với import express from 'express'
const mongoose = require("mongoose"); // Tương ứng với import mongoose from 'mongoose'

const app = express();
const cors = require('cors');

const productRouter = require("./src/routes/ProductRouter");
const customerRouter = require("./src/routes/CustomerRouter");
const orderRouter = require("./src/routes/OrderRouter");
const orderDetailRouter = require('./src/routes/OrderDetailRouter');

// khai báo CORS
app.use(cors());

// Khai báo body lấy tiếng Việt
app.use(express.urlencoded({
    extended: true
}))
//Khai báo body dạng JSON
app.use(express.json());

const port = 8000;

// Kết nối với MongoDB
async function connectMongoDB() {
    await mongoose.connect("mongodb://localhost:27017/shop24h");
}

//Thực thi kết nối
connectMongoDB()
    .then(() => console.log("Connect MongoDB Successfully"))
    .catch(err => console.log(err))

app.get("/", (request, response) => {
    response.json({
        message: "Shop24h API"
    })
})

app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use('/orderdetail', orderDetailRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})