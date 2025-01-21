// import products model schema
import productModel from "../../models/ProductModel.js";

//import cloudnary
import cloudinary from 'cloudinary';

//import datauri
import {getDataUri} from '../../utils/features.js';
import userModel from "../../models/UserModel.js";


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
            message: 'Error In Get All Products A Pi',
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
            message:'Product Found',
            product
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
        }

        //create
        await productModel.create({
            name,description,price,category,stock,images:[image]
        });

        res.status(201).send({
            success: true,
            message:'product Created Successfully'

        });

    }catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Product",
            error
        });
    }
};

// 4- Update specific product through id
export const updateProductController = async (req, res) => {
    try{

        // here we update the product
        // 1- first we find the product, then we update it
        const product = await productModel.findById(req.params.id);

        // validation 
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product not Found"
            })
        }
        //if we get the product
        // 2- then we get the fields, that user wanted to update
        //we will handle image separately
        const {name, description,price,stock,category} = req.body

        // 3- validate and then update
        if(name) { product.name = name };
        if(description) { product.description = description };
        if(price) { product.price = price };
        if(stock) { product.stock = stock };
        if(category) { product.category = category };

        // 4- save the updated product
        await product.save()
        res.status(200).send({
            success: true,
            message: 'product details updated',
            product
        })

    } catch (error){
        console.log(error);
        //cast error
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid id"
            });
        }
        res.status(500).send({
            success: false,
            message: "Error In Update Product Api",
            error,

        })
    }
};


// 5- Update Specific Product Image through Id
export const updateProductImageController = async (req, res) => {
    try {
        
        // 1- first we find the product, then we update it
        const product = await productModel.findById(req.params.id) 

        // 2- validation
        if(!product){
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }
          
        // 3- 
        if(!req.file){
            return res.status(404).send({
                success: false,
                message: "Product Image Not found"
            })
        }

        // 4- 
        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image ={
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        // 5- save the image
        product.images.push(image)
        await product.save()
        res.status(200).send({
            success: true,
            message: 'Product image updated',
        })

    }catch (error){
        console.log(error);
        //cast error
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }
        res.status(500).send({
            success: false,
            message: "Error in Get Update Product Image Api"
        });
    }
}