import express from "express";
import { contactFormController } from "../../controllers/auth/contact-controller.js";


const router = express.Router()


// contact form route
router.post('/contact-submit', contactFormController);

export default router; 