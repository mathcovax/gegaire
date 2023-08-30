import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({user_name: req.query.name?.name.trim() || ""}),
		body: req => ({user_name: req.body?.name.trim() || ""})
	},
	function({user_name}){
		if(typeof user_name !== "string" || !user_name.length.btw(4, 50)){
			this.sender("bad_request", "user.name");
		}

		this.pass("user_name", user_name);
	}
);
