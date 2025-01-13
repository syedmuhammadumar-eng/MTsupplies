//we use and import jwt because, we need to dcrypt the token for validation
import JWT from "jsonwebtoken";

//import usermodel
import userModel from "../models/UserModel.js";

//this is private route middleware 
// we make this profile end point only accessable for those whose is register or login, thats why it is private 
export const isAuth = async (req,res,next) => {
    //get token from the cookie
    const {token} = req.cookies

    //with the help of stored token, we get the current user
    
    // validation
    if(!token){
       return res.status(401).send({
        success: false,
        message:'UnAuthorized User',
       });
    }

    //because token is encrupted so we first dcrypt it
    const decodeData = JWT.verify(token, process.env.JWT_SECRET)

    //here we get user object in req
    //why we use find by id? because in usermodel we stored the token in _id 
    req.user  = await userModel.findById(decodeData._id);
    //next means move on to next
    next();

};