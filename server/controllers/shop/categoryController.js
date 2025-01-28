import categoryModel from "../../models/CategoryModel.js";
import productModel from "../../models/ProductModel.js";


//import cloudnary
import cloudinary from 'cloudinary';
//import datauri
import {getDataUri} from '../../utils/features.js';

// 1- create category
// api: http://localhost:8080/api/v1/categories/createCategory
export const createCategory = async (req, res) => {
    try{
        const {category} = req.body

        //validation of the category
        // if(!category){
        //     return res.status(404).send({
        //         success: false,
        //         message: 'Please provide category name'
        //     })
        // }



        //flow-2 if validation success then we work on save
        const file = getDataUri(req.file);
        
        //use  clouidinary images
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        };
                
        //flow-
        if(!req.file){
            return res.status(500).send({
                success: false,
                message: "please provide product images"
            })
        };
        

        // create category
        await categoryModel.create({
            category,
            images:[image]
        });

        res.status(200).send({
            success: true,
            message: `${category} category created successfully`
        });

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Create Cat API',
            error
        });
    }
    
};

// 2- get all categories
export const getallCatogoriesController = async ( req, res) => {
    try{
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Categories Fetch Successfully",
            totalCat: categories.length,
            categories
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Cat API",
        });
    }
};


// 2- Delete  categories
export const deleteAllCategoriesController = async (req, res) => {
    try{
        //find category by id, in category var, we only have id of the category
        const category = await categoryModel.findById(req.params.id)

        // validation
        if(!category){
            return res.status(404).send({
                success: false,
                message: "Category not found"
            })
        }

        //find product with this category id
        const products = await productModel.find({category:category._id})
        
        //update product category, if product category deleted so it will asssign undefine category to that value
        for(let i = 0; i < products.length; i++){
            const product = products[i]
            product.category = undefined
            //here we again save the product with undefined category
            await product.save()
        }

        //save the category
        await category.deleteOne()
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })



    } catch (error){
        console.log(error);
        //cast error
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid id"
            })
        }

        res.status(500).send({
            success: false,
            message: "Error In Get Cat API",
        });
    }
};
