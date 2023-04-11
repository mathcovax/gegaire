import {method} from "anotherback/cli";
import transporter from "../../import/mailer.js";
import {env} from "anotherback";

export default method(
	async function(email, id){
		transporter.sendMail({
			from: env.GMAIL_ADRESSE,
			to: email,
			subject: "Invitation",
			text: `${env.HOST}/invit/${id}`
		});
	}
);
