// import {User} from '../../models/UserModel.js'
import userModel from '../../models/UserModel.js'

export const adminAcessController = async (req, res) => {
    try{
        // const orders     = await 
        res.status(200).send({
            success: true,
            message : "you are now Admin Login"
        })
    } catch(error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error in Admin Acess",
            error,
        })

    }
};