import {checker} from "anotherback/cli";

export default checker(
	{
		pass: (req, pass) => pass("activity_id")
	},
	async function(activity_id){
		let result = await this.method("activity.exist::byId", activity_id);

		if(result === null) this.sender("not_found", "activity.notfound");

		this.pass("activity", result);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
