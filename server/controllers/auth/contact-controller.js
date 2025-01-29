import { ContactModel } from "../../models/ContactModel.js"

export const contactFormController = async (req, res) => {
    try {
        const { name, number, email, message  } = req.body;

        //validation
        if(!name || !number || !email){
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        }

        // create form
        await ContactModel.create({
            name,
            number,
            email,
            message
        });

        //if product created so return response
        res.status(200).send({
            success: true,
            message: "Form created succfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in contact form api",
            error
        })
        
    }
}