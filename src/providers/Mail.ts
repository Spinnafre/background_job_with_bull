import nodemailer from "nodemailer";

import { NodemailerConfig } from "../config";

export default nodemailer.createTransport(NodemailerConfig);
