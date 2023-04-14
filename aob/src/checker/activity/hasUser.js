import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => undefined
	},
	async function(){
		let activity = await this.method("activity.get::byId", this.pass("activity_id"), {amGuide: true, pmGuide: true});

		if(
			activity.amGuide.find(v => v.userId === this.pass("user_id")) === undefined &&
			activity.pmGuide.find(v => v.userId === this.pass("user_id")) === undefined
		) this.sender("bad_request", "activity.hasNotUser");
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
