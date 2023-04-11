import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({month: req.query.month}),
		body: req => ({month: req.body.month})
	},
	function({month}){
		let result = parseInt(month);

		if(result === NaN){
			this.sender("bad_request", "availability.month");
		}

		this.pass("month", result);
	}
);
