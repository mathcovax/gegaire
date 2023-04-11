import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({pm: req.body.pm})
	},
	function({pm}){
		if(pm !== null && pm !== true && pm !== false){
			this.sender("bad_request", "availability.pm");
		}

		this.pass("pm", pm);
	}
);
