import mongoose from "mongoose";


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
    isSpecial :{
        type: Boolean,
    },
    bestseller: {
        type: Boolean,
    },
    specialoffer: {
        type: Number,
    },
    discountprice: {
        type: Number,
    },
    discountpercent: {
        type: Number,
    },
    stock:{
        type: Number,
        required:[true, 'product stock required']
    },
    categoryname:{
        type: String,
        required:[true, 'category name required']
    },
    // quantity:{
    //     type: Number,
    //     required:[true, 'product quantity required']
    // },
    // we built relashion ship here in category
    //during reference Category must be same with "Category" in export in categoryModel.js
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:[true, 'category Id required']
    },
    subCategory: {
        type: String,
    },
    //here we use cloudinary for images
    images:[
        {
            public_id:String,
            url:String
        }
    ],
    

}, {timestamps:true})


//export this model
export const productModel = mongoose.model("Products", productSchema);
export default productModel;