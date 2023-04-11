import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({take: req.query.take}),
	},
	function({take}){
		let result = parseInt(take);

		if(result === NaN){
			this.sender("bad_request", "take");
		}

		this.pass("take", result);
	}
);
