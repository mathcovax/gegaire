import nodemailer from "nodemailer";
import {env} from "anotherback";
import Queue from "./queue.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.GMAIL_ADRESSE,
		pass: env.GMAIL_PASSWORD
	}
});

export default transporter;

const transporterQueue = new Queue(100);

/**
 * 
 * @param {Array<String>} listEmails 
 * @param {import("nodemailer/lib/mailer").Options} obj 
 */
export async function sendEmails(listEmails, obj){
	obj.from = env.GMAIL_ADRESSE;
	let listSendedEmails = []; 
	for(const mail of listEmails){
		listSendedEmails.push(
			transporterQueue.push(
				async() => await new Promise(
					resolve => transporter.sendMail({...obj, to: mail}, (err) => resolve(err || true))
				)
			)
		);
	}

	let result = await Promise.all(listSendedEmails);
	let mailError = result.reduce(
		(p, v, i) => {
			if(v instanceof Error)p.push({[listEmails[i]]: v});
			return p;
		},
		[]
	);

	return mailError.length !== 0 ? mailError : undefined;
}
