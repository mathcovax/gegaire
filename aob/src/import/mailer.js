import nodemailer from "nodemailer";
import {env} from "anotherback";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.GMAIL_ADRESSE,
		pass: env.GMAIL_PASSWORD
	}
});

export default transporter;
