import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({note: req.body.note})
	},
	function({note}){
		if(typeof note !== "string" || !note.length.btw(0, 1500)){
			this.sender("bad_request", "availability.note");
		}

		this.pass("note", note);
	}
);
