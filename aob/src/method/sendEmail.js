import {method} from "anotherback/cli";
import {sendEmails} from "../import/mailer.js";
import {env} from "anotherback";

// export default method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );

export const invitation = method(
	async function(email, id){
		return await sendEmails(
			email,
			{
				subject: "Invitation",
				text: `Bonjour vous avez été invité par Connexion Nature à vous inscrire sur Gegaire, rendez-vous ici : ${env.HOST}/invit/${id}`
			}
		);
	}
);

export const showActivity = method(
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

export const validatedActivity = method(
	async function(emails, activityId, date){
		let result = await sendEmails(
			emails,
			{
				subject: "Info activité",
				text: `Vous avez été sélectionné pour une activité avec Connexion Nature le ${date.split("T")[0].split("-").reverse().join("/")}`
			}
		);
		if(result !== undefined) console.log(result);
	}
);

export const createActivity = method(
	async function(emails, activityId, date, userName){
		return await sendEmails(
			emails,
			{
				subject: "Nouvelle activité",
				text: `Une nouvelle activité qui se déroule le ${date.split("T")[0].split("-").reverse().join("/")} vient d'être créée par ${userName}, retrouvez-la juste ici : ${env.HOST}/manager/activities/${activityId}/place`
			}
		);
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
