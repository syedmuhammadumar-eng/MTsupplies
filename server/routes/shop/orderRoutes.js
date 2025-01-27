import { isAuth } from "../../middleware/authMiddleware.js";
import { createOrderController } from "../../controllers/shop/orderController.js"

// ====================================== ORDERS ROUTES =================== >

// 1- create order
router.post("/create", isAuth, createOrderController);


// 2- 
