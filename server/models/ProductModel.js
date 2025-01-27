import mongoose from "mongoose";

// import categoryModel from "./CategoryModel.js";




// productSchema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'product name is required']
    },
    description:{
        type: String,
        required:[true, 'product description is required']
    },
    price: {
        type: Number,
        required:[true, 'product price is required']
    },
    stock:{
        type: Number,
        required:[true, 'product stock required']
    },
    // ProductQuantity:{
    //     type: Number,
    //     required:[true, 'product quantity required']
    // },
    // we built relashion ship here in category
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    //here we use cloudinary for images
    images:[
        {
            public_id:String,
            url:String
        }
    ]

}, {timestamps:true})


//export this model
export const productModel = mongoose.model("Products", productSchema);
export default productModel;