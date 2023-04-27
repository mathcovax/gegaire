import {method} from "anotherback/cli";
import {sendEmails} from "../../import/mailer.js";
import {env} from "anotherback";

export default method(
	async function(email, id){
		return await sendEmails(
			[email],
			{
				subject: "Invitation",
				text: `Bonjour vous avez été invité à vous inscrire sur Gegaire, rendez-vous ici : ${env.HOST}/invit/${id}`
			}
		);
	}
);
