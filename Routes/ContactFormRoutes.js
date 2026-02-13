import express from "express";
import  {registerContactForm, registerHost } from '../Controller/AuthController/ContactFormController.js'

const ContactFormRouter = express.Router();

 ContactFormRouter.route("/owner").post(registerContactForm);
 ContactFormRouter.route("/host").post(registerHost);

 export default ContactFormRouter;