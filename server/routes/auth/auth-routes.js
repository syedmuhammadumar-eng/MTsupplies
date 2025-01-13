//here we create user routes

import express from 'express';
import { getUserProfileController, loginController, registerControler } from '../../controllers/auth/auth-controller.js';
import { isAuth } from '../../middleware/authMiddleware.js';
import { logoutController ,updateProfileController} from '../../controllers/auth/auth-controller.js';
import {updatePasswordController} from '../../controllers/auth/auth-controller.js'
//router object
const router = express.Router();

//routes have two functions, 1- route and 2- controller Function
// routes
// 1- register
router.post('/register', registerControler );

// 2- Login
router.post('/login',loginController);

// 3- profile 
//here we use middleware: isAuth that we create in middleware folder
//flow: is route ==> isAuth ==> controller
router.get('/profile', isAuth, getUserProfileController);

// 4- logout , only autenticated user can be log out
router.get('/logout', isAuth, logoutController);

// 5- Update Profile
router.put('/profile-update', isAuth, updateProfileController )

// 6- Password change
router.put('/update-password', isAuth, updatePasswordController  )

//export
export default router;