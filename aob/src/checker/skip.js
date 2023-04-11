import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({skip: req.query.skip}),
	},
	function({skip}){
		let result = parseInt(skip);
		
		if(result === NaN){
			this.sender("bad_request", "skip");
		}

		this.pass("skip", result);
	}
);
