import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({am: req.body.am})
	},
	function({am}){
		if(am !== null && am !== true && am !== false){
			this.sender("bad_request", "availability.am");
		}

		this.pass("am", am);
	}
);
