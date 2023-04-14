import {checker} from "anotherback/cli";

export default checker(
	{
		self: req => ({user_id: "self"}),
		params: req => ({user_id: parseInt(req.params.id)}),
		pass: req => ({user_id: "pass"})
	},
	async function({user_id}){
		"aob-pass:user_id";

		if(user_id === "self")user_id = this.pass("accessTokenValue").id;
		else if(user_id === "pass")user_id = this.pass("user_id");
		
		if(!await this.method("user.exitById", user_id)){
			this.sender("not_found", "user.notfound");
		}

		this.pass("user_id", user_id);
	}
);
