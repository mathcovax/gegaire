import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => undefined
	},
	async function(){
		let result = await this.method(
			"availability.get::byUserId",
			this.pass("user_id"),
			this.pass("day"),
			this.pass("month"),
			this.pass("year"),
		);

		if(result !== null && result.work !== null) this.sender("conflict", "availability.hasWork");
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
