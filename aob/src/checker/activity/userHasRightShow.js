import {checker} from "anotherback/cli";

export default checker(
	{
		pass: (req, pass) => ({activity: pass("activity"), user: pass("accessTokenValue")})
	},
	async function({activity, user}){
		if(user.isManager === true) return;

		if(activity.status !== "showning") this.sender("forbidden", "activity.hasNotRight");

		activity = await this.method("activity.get::byId", activity.id, {amGuide: true, pmGuide: true});

		if(
			activity.amGuide.find(v => v.userId === user.id) === undefined &&
			activity.pmGuide.find(v => v.userId === user.id) === undefined
		) this.sender("forbidden", "activity.hasNotRight");
	}
);

// export const other = checker(
// 	{
// 		default: (req, pass) => req
// 	},
// 	function(req){
		
// 	}
// );
