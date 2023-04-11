import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({number: req.body.number})
	},
	function({number}){
		if(typeof number !== "number") this.sender("bad_request", "activity.number");

		this.pass("activity_number", number);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
