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
        const { name, email, password, role } = req.body;

        //1- validation to check all data is coming or not
        // if(!name | !email || !password || !city || !address || !country){
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "please Fill all Fields"
            });
        };

        //2- Check the Existing user
        //here we use mongodb function: findOne and destructue the email 
        const existingUser = await userModel.findOne({email});

        // validate the user
        //it tells that user is already is in the database
        if(existingUser){
            return res.json({
                success:false,
                message: "email already taken",
            })
        };

        if (password.length < 8) {
            return res.json({success: false, message: "password length should be greater than 6 character"});            
        }
        
        //3- check exising password
        // const existingPassword = await userModel.findOne({password});
        
        // //validate the password
        // if(existingPassword){
        //     return res.json({
        //         success: false,
        //         message: "password is already taken"
        //     })
        // };



        //save the user
        const user = await userModel.create({
            name,
            email,
            password,
            role,
        });

        res.json({
            success: true,
            message: 'Signed Up Successfully.',
            user,
        });
 
    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
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
                message:'please add email or password'
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
            message:'login successfully',
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

// export const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Validation
//         if (!email || !password) {
//             return res.status(500).send({
//                 success: false,
//                 message: 'Please add email or password'
//             });
//         }

//         let role = 'user'; // Default role

//         // Check for admin credentials
//         if (email === 'admin@mtsupplies' && password === 'admin') {
//             role = 'admin'; // Assign admin role
//         } else {
//             // Check user in database for other users
//             const user = await userModel.findOne({ email });

//             if (!user) {
//                 return res.status(404).send({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }

//             // Decrypt the user password
//             const isMatch = await user.comparePassword(password);

//             if (!isMatch) {
//                 return res.status(500).send({
//                     success: false,
//                     message: 'Invalid credentials'
//                 });
//             }
//         }

//         // Generate token
//         const token = user.generateToken();

//         // Send response
//         res.status(200).cookie('token', token, {
//             expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//             secure: process.env.NODE_ENV === 'production',
//             httpOnly: true,
//             sameSite: 'strict'
//         }).send({
//             success: true,
//             message: 'Login successfully',
//             token,
//             role,
//             user: role === 'admin' ? { email, role } : user
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in login API',
//             error
//         });
//     }
// };


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
            message: "Log out Successfully",
        });
    }catch (error){
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in Logout Api",
            error,
        });
    }
};


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