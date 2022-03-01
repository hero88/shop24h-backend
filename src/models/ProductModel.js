// Import thư viện Moogoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đối tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Product Schema MongoDB
const productSchema = new Schema({
    _id: Schema.Types.ObjectId, // Trường _id có kiểu dữ liệu ObjectID
    name: String,
    type: {
        type: String,
        required: true
    },
    imageUrl: String,
    buyPrice: Number,
    promotionPrice: Number,
    description: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    timeUpdated: {
        type: Date,
        default: Date.now
    }
})

//Tạo Product Model
const ProductModel = mongoose.model("Product", productSchema);

//Export Product Model
module.exports = { ProductModel };
