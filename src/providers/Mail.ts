import nodemailer from "nodemailer";

import { NodemailerConfig } from "../config";

console.log("Nodemailer Config ", NodemailerConfig);

export default nodemailer.createTransport(NodemailerConfig);
