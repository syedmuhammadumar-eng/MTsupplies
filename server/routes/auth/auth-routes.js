//here we create user routes

import express from 'express';
import { getUserProfileController, loginController, registerControler } from '../../controllers/auth/auth-controller.js';
import { isAuth } from '../../middleware/authMiddleware.js';
import { isAdmin } from '../../middleware/authMiddleware.js';
import { logoutController ,updateProfileController} from '../../controllers/auth/auth-controller.js';
import {updatePasswordController} from '../../controllers/auth/auth-controller.js'
import {adminAcessController} from '../../controllers/auth/admin_controller.js'
import { passwordResetController } from '../../controllers/auth/auth-controller.js'
//router object, use to create rotes with the help of express
const router = express.Router();

//routes have two functions, 1- route and 2- controller Function
// routes
// 1- register
router.post('/register', registerControler);

// 2- Login
router.post('/login',loginController);

// 3- profile 
//here we use middleware: isAuth that we create in middleware folder
//flow: is route ==> isAuth ==> controller
// her we use isAuth  middle weare which means only , already register user can acess profile page/end point
router.get('/profile', isAuth, getUserProfileController);

// 4- logout private route, only autenticated user can be log out
router.get('/logout', isAuth, logoutController);

// 5- Update private route, Profile
router.put('/profile-update', isAuth, updateProfileController )

// 6- Password change , private route,
// only login user can change and update the passwrd and its work through token and cookies 
router.put('/update-password', isAuth, updatePasswordController  )

// 7- Admin route
// here only admin can acess the admin routes
router.get('/admin', adminAcessController )


// 8- forget password,
router.post('/reset-password', passwordResetController)




//export
export default router;