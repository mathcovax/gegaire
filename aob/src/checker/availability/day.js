import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({day: req.query.day}),
		body: req => ({day: req.body.day})
	},
	function({day}){
		let result = parseInt(day);

		if(result === NaN){
			this.sender("bad_request", "availability.day");
		}

		this.pass("day", result);
	}
);
