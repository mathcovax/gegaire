import {method} from "anotherback/cli";
import {sendEmails} from "../../import/mailer.js";
import {env} from "anotherback";

export default method(
	async function(emails, activityId, date){
		let result = await sendEmails(
			emails,
			{
				subject: "Info activité",
				text: `Les informations d'une activité se déroulant le ${date.split("T")[0].split("-").reverse().join("/")} à laquelle vous avez été sélectionné sont désormais disponibles, retrouvez tout juste ici : ${env.HOST}/activity/${activityId}`
			}
		);
		if(result !== undefined) console.log(result);
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
