const mongoose = require("mongoose");

const { ProductModel } = require("../models/ProductModel");

function createProduct (request, response) {
    const product = new ProductModel({
        _id: mongoose.Types.ObjectId(),
        type: request.body.type,
        name: request.body.name,
        imageUrl: request.body.imageUrl,
        buyPrice: request.body.buyPrice,
        promotionPrice: request.body.promotionPrice,
        description: request.body.description
    });

    product.save()
        .then((newProduct) => {
            return response.status(200).json({
                message: "Success",
                product: newProduct
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
}

function getAllProduct (request, response) {
    const limitChoice = parseInt(request.query.limit, 10) || 25;
    const page = parseInt(request.query.page, 10) || 1;
    const startIndex = (page - 1) * limitChoice;   
    const endIndex = page * limitChoice;
    const total = ProductModel.countDocuments();
    const pagination = {};
    
    let name = request.query.name;
    let minPrice = parseInt(request.query.minPrice);
    let maxPrice = parseInt(request.query.maxPrice);
    let type = request.query.type;

    let query = ProductModel.find();
    if (name) query = query.find({name: name});
    if (minPrice) query = query.find({buyPrice: {$gte: minPrice}});
    if (maxPrice) query = query.find({buyPrice: {$lte: maxPrice}});
    if (type) query = query.find({type: type});

    query.skip(startIndex)
        .limit(limitChoice)
        .select("_id name type imageUrl buyPrice promotionPrice description timeCreated timeUpdated")
        .then((productList) => {
            // If the endIndex is smaller than the total number of documents, we have a next page
            if (endIndex < total) {
                pagination.next = {
                  page: page + 1,
                  limitChoice
                };
            }
            // If the startIndex is greater than 0, we have a previous page
            if (startIndex > 0) {
                pagination.prev = {
                  page: page - 1,
                  limitChoice
                };
            }    

            const advancedResults = {
                success: true,
                count: productList.length,
                pagination,
                products: productList
            }
            return response.status(200).json(advancedResults);
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
}
function getProductDetail(request, response) {
    // Lấy productId từ params URL
    const productId = request.params.productId;

    // Kiểm tra xem productId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findById(productId)
            .then((data) => {
                if (data) {
                    return response.status(200).json({
                        message: "Success",
                        product: data
                    })
                } else {
                    return response.status(404).json({
                        message: "Fail",
                        error: "Not found"
                    })
                }
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "ProductID is not valid"
        })
    }
}

function updateProductByID(request, response) {
    // Lấy productId từ params URL
    const productId = request.params.productId;

    const updateObject = request.body;

    // Kiểm tra xem productId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findByIdAndUpdate(productId, updateObject)
            .then(() => {
                return response.status(200).json({
                    message: "Success",
                    updatedObject: updateObject
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "ProductID is not valid"
        })
    }
}

function deleteProduct(request, response) {
    // Lấy productId từ params URL
    const productId = request.params.productId;

    // Kiểm tra xem productId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findByIdAndDelete(productId)
            .then(() => {
                return response.status(200).json({
                    message: "Success"
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "ProductID is not valid"
        })
    }
}

module.exports = { createProduct, getAllProduct, getProductDetail, updateProductByID, deleteProduct }
