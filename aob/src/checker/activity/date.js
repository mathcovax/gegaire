import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({date: req.body.activity_date})
	},
	function({date}){
		date = new Date(date);

		if(date == "Invalid Date") this.sender("bad_request", "activity.date");
		
		this.pass("activity_date", date);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
