import express from "express";
import { getAllProductsController } from "../../controllers/shop/productsController.js";
import { getSingleProductsController } from "../../controllers/shop/productsController.js";
import { createProductController } from "../../controllers/shop/productsController.js";
import { isAuth } from "../../middleware/authMiddleware.js";
import { singleUpload } from "../../middleware/multer.js";
import { updateProductController } from "../../controllers/shop/productsController.js";
import { updateProductImageController } from "../../controllers/shop/productsController.js"

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
router.put('/:id', isAuth, updateProductController );


// 5- Update Product Image Api
router.put('/image/:id', isAuth, singleUpload, updateProductImageController);

//Note : we will create admin middleware in the end

export default router;