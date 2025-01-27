import { isAuth } from "../../middleware/authMiddleware.js";
import { createOrderController } from "../../controllers/shop/orderController.js";
import { getMyOrdersController } from "../../controllers/shop/orderController.js";
import { getSingleOrderController } from "../../controllers/shop/orderController.js";

import express from "express";


// ====================================== ORDERS ROUTES =================== >
const router = express.Router();


// 1- create order
router.post("/create", isAuth, createOrderController);


// 2- get user all orders
router.get("/my-orders", isAuth, getMyOrdersController);

// 3- get single order
router.get("/my-orders/:id", isAuth, getSingleOrderController )

export default router;
