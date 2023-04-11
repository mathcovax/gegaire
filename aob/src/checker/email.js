import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({email: req.body?.email.trim() || ""})
	},
	function({email}){
		if(
			typeof email !== "string" || 
			!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email) || 
			!email.length.btw(10, 255)
		) this.sender("bad_request", "email");

		this.pass("email", email.toLocaleLowerCase());
	}
);
