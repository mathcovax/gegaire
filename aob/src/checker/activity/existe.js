import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => undefined
	},
	async function(){
		let result = await this.method("activity.exist::byId", this.pass("activity_id"));

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
