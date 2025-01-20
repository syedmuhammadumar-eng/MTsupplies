import express from "express";
import { getAllProductsController } from "../../controllers/shop/productsController.js";
import { getSingleProductsController } from "../../controllers/shop/productsController.js";
import { createProductController } from "../../controllers/shop/productsController.js"
import { isAuth } from "../../middleware/authMiddleware.js";

const router = express.Router()

// router
// 1- get all products
//second step to import this controller into server.js
router.get('/get-all', getAllProductsController);

// 2- get single product, or dynamic route
router.get('/:id', getSingleProductsController);

// 3- Create Product
//only admin can create product so we use isAuth middleware to validte admin only acess
router.post('/create', isAuth, createProductController )



export default router;