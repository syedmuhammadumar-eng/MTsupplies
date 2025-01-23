import express from "express";
import { getAllProductsController } from "../../controllers/shop/productsController.js";
import { getSingleProductsController } from "../../controllers/shop/productsController.js";
import { createProductController } from "../../controllers/shop/productsController.js";
import { isAuth } from "../../middleware/authMiddleware.js";
import { singleUpload } from "../../middleware/multer.js";
import { updateProductController } from "../../controllers/shop/productsController.js";
import { updateProductImageController } from "../../controllers/shop/productsController.js"
import { deleteProductImageController } from "../../controllers/shop/productsController.js"
//here we do dstructure, means we can only acess certain function inside the productscontroller file
import { deleteProductController } from "../../controllers/shop/productsController.js"
import { createProductCategoriesController } from "../../controllers/shop/productsController.js"
import { GetAllCategories } from "../../controllers/shop/productsController.js"

const router = express.Router()

// router
// 1- get all products
//second step to import this controller into server.js
router.get('/get-all', getAllProductsController);

// 2- get single product, or dynamic route
router.get('/:id', getSingleProductsController);

// 3- Create Product
//only admin can create product so we use isAuth middleware to validte admin only acess
// router.post('/create', isAuth, createProductController )
router.post('/create', isAuth, singleUpload, createProductController );

// 4- Update Product(exclude image) Api
//Note: here we update the product on the basis on product id
router.put('/:id', isAuth, updateProductController);

// 5- Update Product Image Api
// all images are stack each after another in the array and singleUpload is middleweare that i created,  
router.put('/image/:id', isAuth, singleUpload, updateProductImageController);

// 6- Delete product Image
router.delete('/delete-image/:id', isAuth, deleteProductImageController );

// 7 - Delete entire Product
router.delete('/delete-product/:id', isAuth, deleteProductController);

// 8- Craete Product Categories
//we use isauth middleware because of only authenticated person can create category
//this is private route 
router.post('/create-category', isAuth, createProductCategoriesController);

// 9- Get all categories
router.get('/getallCategories', GetAllCategories);

// 10- delete single category




//Note : we will create admin middleware in the end
export default router;