import mongoose from "mongoose";

const contact = new  mongoose.Schema({
    name : {
        type: String,
        required:[true, 'Contact Name  is required']
    },
    number: {
        type: Number,
        required:[true, 'Contact Number  is required']
    },
    email: {
        type: String,
        required:[true, 'Contact Email  is required']
    },
    message:{
        type: String
    }

});

//export this model
export const ContactModel = mongoose.model("contact", contact );
export default ContactModel;