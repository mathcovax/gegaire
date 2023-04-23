import {checker} from "anotherback/cli";

export default checker(
	{
		self: (req, pass) => ({user_id: pass("accessTokenValue").id}),
		params: req => ({user_id: parseInt(req.params.id)}),
		pass: (req, pass) => ({user_id: pass("user_id")})
	},
	async function({user_id}){
		if(!await this.method("user.exitById", user_id)){
			this.sender("not_found", "user.notfound");
		}

		this.pass("user_id", user_id);
	}
);
