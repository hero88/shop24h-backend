// Import thư viện Moogoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đối tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Customer Schema MongoDB
const customerSchema = new Schema({
    _id: Schema.Types.ObjectId, // Trường _id có kiểu dữ liệu ObjectID
    fullName: String,
    phoneNumber: String,
    email: String,
    address: String,
    city: String,
    country: String,
    timeCreated: {
        type: Date,
        default: Date.now
    },
    timeUpdated: {
        type: Date,
        default: Date.now
    }
})

//Tạo Customer Model
const CustomerModel = mongoose.model("Customer", customerSchema);

//Export Customer Model
module.exports = { CustomerModel };
