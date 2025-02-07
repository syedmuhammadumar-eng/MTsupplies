
// IMPORT
import orderModel from "../../models/OrderModel.js";
import  ProductModel  from "../../models/ProductModel.js";
import { stripe } from "../../server.js";





//1- create order
export const createOrderController = async (req, res) => {
    try {

        // 1- dstructure the req body data
        const {shippingInfo, orderItems, paymentMethod, itemPrice, tax, shippingCharges, totalAmount, orderStatus, quantity, userName} = req.body;

        // 2- validation
        // if(!shippingInfo || !orderItems || !paymentMethod || !paymentInfo || !itemPrice || !tax || !shippingCharges || !totalAmount || !orderStatus  ){
        // if(!shippingInfo || !orderItems || !paymentMethod  || !itemPrice || !tax || !shippingCharges || !totalAmount || quantity ){
        if(!shippingInfo || !orderItems  || !itemPrice || !tax || !shippingCharges || !totalAmount ){
            return res.status(404).send({
                success: false,
                message: "Please provide all fields",
            })
        };

        // 3- Create Order
        //we use create function, and we create object
        await orderModel.create({
            user: req.user._id,
            shippingInfo,
            userName,
            orderItems,
            paymentMethod,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,
            orderStatus,
            quantity,
        });

        //update the stock, after order creation
        //first we get the stock 
        //then perform calculation on the stock

        for(let i=0; i< orderItems.length; i++){
            //find product
            const product = await ProductModel.findById(orderItems[i].product)
            product.stock -= orderItems[i].quantity
            await product.save()
        }

        //send resposve after ordfer save
        res.status(200).send({
            success: true,
            message: "Order placed Successfully"
        })



    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Create Order Api',
            error
        });
    }
};


//2- Get all user orders
export const getMyOrdersController = async (req, res) => {
    try{
         
        //find orders
        const orders = await orderModel.find({user: req.user._id})

        //validation
        if(!orders){
            return res.status(404).send({
               success: false,
               message: 'no norders found' 
            })
        }

        res.status(200).send({
            success:true,
            message:"your order data",
            totalOrder: orders.length,
            orders,
        });

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in My Ordfers Api"
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try{
         
        //find orders
        const orders = await orderModel.find({})

        //validation
        if(!orders){
            return res.status(404).send({
               success: false,
               message: 'no norders found' 
            })
        }

        res.status(200).send({
            success:true,
            message:"your order data",
            totalOrder: orders.length,
            orders,
        });

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in My Ordfers Api"
        })
    }
}


//3- Get single user orders
export const getSingleOrderController = async (req, res) => {
    try{
        //find order
        const order = await orderModel.findById(req.params.id)
        //validation
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'no order found'
            })
        }
        
        res.status(200).send({
            success: true,
            message: "your order fetched",
            order
        })

    } catch (error) {
        console.log(error)
        //cast error note: we use cast error because we are using objectid
        if(error.name === "CastError"){
            return res.status(500).send({
                success: false,
                message: "Invalid id",
            });
        }

        res.status(500).send({
            success: false,
            message: "Error In Get Single Order Details Api",
            error
        })
    }
}


// 4- Accept payemnts/ Stripe
export const paymentsController = async ( req, res) => {
    // try {
    //     // get amount
    //     const { totalAmount, token, name }  = req.body;
    //     // validation
    //     if(!totalAmount || !token || !name){
    //         return res.status(404).send({
    //             success: false,
    //             message:  "Total Amount is require",
    //         });
    //     }

    //     // const { client_secret } = await stripe.paymentIntents.create({
    //     //     amount: Number(totalAmount * 100),
    //     //     currency : 'GBP'
    //     // });

    //     const charge = await stripe.charges.create({
    //         amount: amount*100,
    //         currency: GBP,
    //         // source: token,
    //     })

    //     res.status(200).send({
    //         success: true,
    //         client_secret,
    //         charge
    //     });

    // } catch (error) {
    //     console.log(error);

    //     res.status(500).send({
    //         success: false,
    //         message: "Error in Accept payments",
    //         error,
    //     });
    // }
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100, // Amount in cents (e.g., $10.00 = 1000)
            currency: currency || 'usd',
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};