// import products model schema
import productModel from "../../models/ProductModel.js";

//import cloudnary
import cloudinary from 'cloudinary';

//import datauri
// import {getDataUri} from '../'


// 1- Get all products
export const getAllProductsController = async (req, res) => {
    try{
        //get all procuts
        const products = await productModel.find({});
        res.status(200).send({
            success:true,
            message:'all products fetched successfully',
            products,
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error In Get All Products APi',
            error,
        })
    }
};


// 2- Get getSingleProductsController
export const getSingleProductsController = async (req,res) => {
    try{
        //get product id
        const product = await productModel.findById(req.params.id)
        // validation for id
        if(!product){
            return res.status(404).send({
                success: false,
                message: 'product not found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Product Found'
        })
    } catch (error){
        console.log(error);
        //cast Error for Object Id
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid Id",
            })
        }
        res.status(500).send({
            success: false,
            message: "Error In Get single Products Api",
            error,
        });
    }
}


// 3- Create product
// every fnction that use req and res so it is callback function
export const createProductController = async (req, res) => {
    try{
        //get product info from the admin
        // flow-1, here we destructure the data 
        const {name, description, price, stock, category} = req.body;
        //validation for products//check all, products data are coming or not from the admin
        if(!name || !description || !price || !stock){
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }
        //flow-2 if validation success then we work on save
        const file = getDataUri(req.file)

        //use  clouidinary images
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        //create
        await productModel.create({
            name,description,price,category,stock,
        })

    }catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Product",
            error
        });
    }
};

