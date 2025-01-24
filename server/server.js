// #This is main entry point file, where Whole application runs here,  This is the center point of the application

//========================================================> IMPORTS 
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";


//=========================================================> dot env config 
dotenv.config();

//=========================================================> database connection call to execute
connectDB();

//=========================================================> cloudinary Config/setup
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create rest object because we can not use express directly, so we create copy of that , we use express in "app" named variable ,so all the express functionalities comes into app var, then now you can create routes with the help of app and we have lots of methods in express, most famous is get() method
//rest object
const app = express();


//======================================================> MiddleWares
//morgan middleware
app.use(morgan("dev"));

//Json middleware
app.use(express.json());

//cors middleware
app.use(cors());

//cookie parser middleware
app.use(cookieParser());


//===================================================================> Import All Routes  in main to call them and execute 

// Note:we must define .js with rotes because we are using import export , Esc


//1- import User Route file
//Note: here we define in the last, route file name instead of single route, in file all routes functions are there in single file
import userRoutes from './routes/auth/auth-routes.js';
app.use("/api/v1/user", userRoutes );

//2- import Product Route file
//Note: in second here we define new route file name because we created new route file in routes folder
import productRoutes from './routes/shop/productsRoutes.js';
app.use('/api/v1/product', productRoutes);

//3- import category Route file
import categoryRoutes from './routes/shop/categoryRoutes.js';
app.use("/api/v1/cat", categoryRoutes );
 
//4- import Route file


//0- dummy route, will be removed later on
app.get("/", (req, res) => {
    return res.status(200).send("<h1> Welcome to node server </h1>");
});

//=================================================================> Server/Express
//we need port for listen so we define here.
//Port
const PORT = process.env.PORT || 8080;

//we say that, if we run server  so we say called it listen
//here there is a callback function so we can send any reponse 
//Listen
//before deploy our application first remove the 0.0.0.0 other wise it could be acessalbe for all , here i bind the our application with our local ip address
app.listen( PORT , () => {
    console.log(`Server Running on Port ${process.env.PORT || 8080} on ${process.env.NODE_ENV} Mode`)
})

//now you can test the server after running in Terminal like npm run server or node server.js
//http://localhost:8080/


