
// IMPORT
import orderModel from "../../models/OrderModel.js";
import  ProductModel  from "../../models/ProductModel.js";




//create order
export const createOrderController = async (req, res) => {
    try {

        // 1- dstructure the req body data
        const {shippingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmount, orderStatus} = req.body;

        // 2- validation
        if(!shippingInfo || !orderItems || !paymentMethod || !paymentInfo || !itemPrice || !tax || !shippingCharges || !totalAmount || !orderStatus  ){
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
            orderItems,
            paymentMethod,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,
            orderStatus
        });

        //update the stock, after order creation
        //first we get the stock 
        //then perform calculation on the stock

        for(i=0; i<orderItems.length; i++){
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