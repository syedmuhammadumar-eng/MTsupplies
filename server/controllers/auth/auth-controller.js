//here we work on user controller

// import user model, here we only imort user function instead of whole file
// import {User} from '../../models/UserModel.js'
import userModel from '../../models/UserModel.js'


// user Register controller
export const registerControler = async (req,res) => {
    try{

        // get data from the user, all those data  that we define in models> user schema and names should be same like name: in schema so name: in also same in controller
        //destructue data from the req 
        // const {name,email,password,address,city,country,phone,profilepic} = req.body
        const {name,email,password} = req.body

        //1- validation to check all data is coming or not
        // if(!name | !email || !password || !city || !address || !country){
        // if(!name || !email || !password ){
        //     return res.status(500).send({
        //         success: false,
        //         message: "please provide All Fields"
        //     });
        // };

        if(!name){
            return res.status(500).send({
                success: false,
                message: "Name can not be empty"
            });
        };

        if(!email){
            return res.status(500).send({
                success: false,
                message: "Email can not be empty"
            });
        };

        if(!password){
            return res.status(500).send({
                success: false,
                message: "Password can not be empty"
            });
        };

        //2- Check the Existing user
        //here we use mongodb function: findOne and destructue the email 
        const existingUser = await userModel.findOne({email});

        // validate the user
        //it tells that user is already is in the database
        if(existingUser){
            return res.status(500).send({
                success:false,
                message: "email already taken",
            })
        };

        //3- check exising password
        const existingPassword = await userModel.findOne({password});

        //valieate the password
        if(existingPassword){
            return res.status(500).send({
                success: false,
                message: "password is already taken"
            })
        };



        //save the user
        const user = await userModel.create({
            name,
            email,
            password,
        });

        // const user = await userModel.create({
        //     name,
        //     email,
        //     password,
        //     city,
        //     address,
        //     country,
        //     profilepic,
        //     phone
        // });
   

        res.status(200).send({
            success: true,
            message: 'Registeration Success, please login',
            user,
        });
 
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error,
        });
    }
};

//login controller
export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'pleae add email or password'
            })
        }

        //check user
        const user = await userModel.findOne({email})

        //user validation
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'User not found'
            })
        }
        
        //decrpt the user password
        const isMatch = await user.comparePassword(password);

        //validaton PASSWORD
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid credentials'
            });
        }
        //token call 
        const token = user.generateToken();

        res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true: false,
            httpOnly: process.env.NODE_ENV === "development" ? true: false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        }).send({
            success:true,
            message:'login seuccessfully',
            token,
            user,
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            success: "false",
            message: "error in login api",
            error
        })
    }
};


//Get USER Profile controller
export const getUserProfileController =  async (req, res) => {
    try{

        //here we send res so, we get user info from the req and send in throgh user profile end point 
        const user = await userModel.findById(req.user._id);
        //here we hide password, because we dont need to show pass in profile
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'User Profile Fetched Successfully',
            //above fetched user, we send it thorugh here
            user,
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Profile Api'
        })
    }
};


//Get Logout controller
export const logoutController = async (req, res ) => {
    try{
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development" ? true: false,
            httpOnly: process.env.NODE_ENV === "development" ? true: false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
        }).send({
            success: true,
            message: "Logot Successfully",
        });
    }catch (error){
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in Logout Api",
            error,
        });
    }
}


//Put Update-Profile controller
export const updateProfileController = async (req,res) => {
    try{
        //find user on the basis of _id
        const user = await userModel.findById(req.user._id)
        //get data that user wanted to update
        //here we destructure name,email,address,city,country,phone
        // const {name,email,address,city,country,phone} = req.body;
        const {name,email,address} = req.body;

        // validation for update
        if(name) user.name = name
        if(email) user.email = email
        // if(address) user.address = address
        // if(city) user.city = city
        // if(country) user.country = country
        // if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message: "User Profile updated"
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,                                                          
            message: "Error in update Api",
            error,
        });
    
    }
};

//update password
export const updatePasswordController = async (req, res) => {

    try{
        const user = await userModel.findById(req.user._id)
        const {oldPassword, newPassword} = req.body
        
        // validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'Please provide old or new password'
            })
        }

        //Old pass check (Check new password is already in the database, or match with database or not)
        const isMatch = await user.comparePassword(oldPassword)

        // validation
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Error in update password Api",
                error,
            })
        }

        


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Password Api",
            error,
        });
    }
    
};