import nodemailer from "nodemailer";
import {env} from "anotherback";
import Queue from "./queue.js";

const transporter = nodemailer.createTransport(
	env.DEV ?
		{
			service: "gmail",
			auth: {
				user: env.GMAIL_ADRESSE,
				pass: env.GMAIL_PASSWORD
			}
		} :
		{
			host: env.MAIL_HOST,
			port: env.MAIL_PORT,
		}
);
export default transporter;

const transporterQueue = new Queue(100);

/**
 * 
 * @param {Array<String>} listEmails 
 * @param {import("nodemailer/lib/mailer").Options} obj 
 */
export async function sendEmails(listEmails, obj){
	obj.from = env.GMAIL_ADRESSE;
	let result = await transporterQueue.push(
		async() => await new Promise(
			resolve => transporter.sendMail({...obj, to: listEmails}, (err) => resolve(err || true))
		)
	);

	return result === true ? undefined : result;
}
