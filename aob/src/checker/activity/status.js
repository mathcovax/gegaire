import {checker} from "anotherback/cli";

// export default checker(
// 	{
// 		default: (req, pass) => req
// 	},
// 	function(req){
		
// 	}
// );

export const order = checker(
	{
		pass: (req, pass) => pass("activity_status"),
	},
	async function(status){
		if(status === "validated" && this.pass("activity").status !== "waiting") this.sender("conflict", "activity.badOrder");
		else if(status === "showning" && this.pass("activity").status !== "validated") this.sender("conflict", "activity.badOrder");
		else if(this.pass("activity").status === "showning") this.sender("conflict", "activity.badOrder");
	}
);

// export const other = checker(
// 	{
// 		default: (req, pass) => req
// 	},
// 	function(req){
		
// 	}
// );
