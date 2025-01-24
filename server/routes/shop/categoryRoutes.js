import express  from "express";
import { isAuth } from "../../middleware/authMiddleware.js";
import { createCategory } from "../../controllers/shop/categoryController.js";
import { getallCatogoriesController } from "../../controllers/shop/categoryController.js";
import { deleteAllCategoriesController } from "../../controllers/shop/categoryController.js";

const router = express.Router();

// =========================> Category Routes  <=========================

// 1- Create Category
router.post("/create", isAuth, createCategory);


// 2- Get All Categories
router.get("/get-all", isAuth, getallCatogoriesController );


// 3- Delete Category
router.delete("/delete/:id", isAuth, deleteAllCategoriesController);


// 4- Update Category






export default router;