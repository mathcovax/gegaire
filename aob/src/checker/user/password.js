import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({password: req.body?.password.trim() || ""})
	},
	function({password}){
		if(
			typeof password !== "string" ||
			!password.length.btw(8, 25)
		) this.sender("bad_request", "user.password");

		this.pass("user_password", password);
	}
);
