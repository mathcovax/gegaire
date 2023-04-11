import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({hourStart: req.body.hourStart, hourEnd: req.body.hourEnd})
	},
	function({hourStart, hourEnd}){
		if(!hourStart && !hourEnd) return;

		try {
			if(parseFloat(hourStart.replace(":", ".")) > parseFloat(hourEnd.replace(":", "."))) this.sender("bad_request", "activity.wrongHour");
		}
		catch {
			this.sender("bad_request", "activity.wrongHour");
		}
		

		this.pass("activity_hourStart", hourStart);
		this.pass("activity_hourEnd", hourEnd);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
