// Import thư viện Moogoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đối tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo OrderDetail Schema MongoDB
const orderdetailSchema = new Schema({
    _id: Schema.Types.ObjectId, // Trường _id có kiểu dữ liệu ObjectID
    
    // Trường order là một ObjectID, liên kết tới order có _id tương ứng
    order: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ,
    // Trường product là một ObjectID, liên kết tới product có _id tương ứng
    product: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ,
    quantity: Number,
    priceEach: Number
})

//Tạo OrderDetail Model
const OrderDetailModel = mongoose.model("OrderDetail", orderdetailSchema);

//Export OrderDetail Model
module.exports = { OrderDetailModel };
