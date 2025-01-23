// import products model schema
import productModel from "../../models/ProductModel.js";

//import cloudnary
import cloudinary from 'cloudinary';

//import datauri
import {getDataUri} from '../../utils/features.js';

//import userModel schema
import userModel from "../../models/UserModel.js";

//import category model schema
import categoryModel from "../../models/CategoryModel.js";

// 1- Get all products
export const getAllProductsController = async (req, res) => {
    try{
        //get all products
        const products = await productModel.find({});
        res.status(200).send({
            success:true,
            message:'all products fetched successfully',
            products,
        });

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
        });

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

        });
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
            });
        }
          
        // 3- 
        if(!req.file){
            return res.status(404).send({
                success: false,
                message: "Product Image Not found"
            });
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
        });

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


// 6- delete product image
export const deleteProductImageController = async (req,res) => {
    try{
        //1- find product
        const product = await productModel.findById(req.params.id)

        //2- vaidation
        if(!product){
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }

        //3- find image id
        //use ? in url for query
        const id = req.query.id
        if(!id){
            return res.status(404).send({
                success: false,
                message: 'product image not found'
            });
        }

        //image ocject
        let isExist = -1;
        product.images.forEach((item, index) => {
            if(item._id.toString() === id.toString()) isExist = index 
        })

        if(isExist < 0){
            return res.status(404).send({
                success: false,
                message: "Image not found"
            });
        }

        //Delete product image
        await cloudinary.v2.uploader.destroy(product.images[isExist].public_id)
        product.images.splice(isExist, 1);
        await product.save()
        return res.status(200).send({
            success: true,
            message: "Product Image deleted successfully",
        });


    } catch (error){
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
            message: "Error in  Delete Product Image Api",
            error
        });
    };
};


// 7- delete product 
export const deleteProductController = async (req, res) => {
    try{

        //find product
        const product = await productModel.findById(req.params.id);

        //validation
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product Not Found",
                error
            });
        }

        //find and delete image cloudinary , bcz we also delete whole product with image too.
        for(let index = 0; index < product.images.length; index++){
            await cloudinary.v2.uploader.destroy(product.images[index].public_id);
        }

        //
        await product.deleteOne();
        res.status(200).send({
            success: true,
            message: 'Product Deleted Succfully',
        });
        
    } catch(error){
        console.log(error)
        //cast error handling
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(500).send({
            success: false,
            message: "Error in Delete whole Product"
        });
    }
}


// 8- Create Product Categories controller
export const createProductCategoriesController = async (req, res) =>{
    try{

        const { category } = req.body;

        //validation
        if(!category){
            return res.status(404).send({
                success: false,
                message: "Please provide Category Name"
            });
        }

        //this function is for try and test, and will be removed it later on, if not work properly by smu
        const categories = await categoryModel.find({});
        if(categories === category){
            return res.status(500).send({
                success: false,
                message: "this name is already exist, try with different name"
            });
        }

        //save this category name into category
        await categoryModel.create({
            category
        });

        res.status(200).send({
            success: true,
            message: ` ${category} Category Created successfully `,
            category    
        });


    } catch (error){
        console.log(error)
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid id"
            });
        }

        return res.status(500).send({
            success: false,
            message: "Error in Create Categories Api",
            error
        });
    }
}




//Note: we can run query in url through question mark? 