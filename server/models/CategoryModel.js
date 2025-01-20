// /CategoryModel.js

import mongoose from "mongoose";
import productModel from "./ProductModel";

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: [true, "category is required"],
    }

}, {timestamps: true});

// export category 
export const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;