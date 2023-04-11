import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({year: req.query.year}),
		body: req => ({year: req.body.year})
	},
	function({year}){
		let result = parseInt(year);

		if(result === NaN){
			this.sender("bad_request", "availability.year");
		}

		this.pass("year", result);
	}
);
