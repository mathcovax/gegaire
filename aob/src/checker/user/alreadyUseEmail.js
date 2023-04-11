import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => ({email: "pass"})
	},
	async function({email}){
		"aob-pass:user_id";
		
		if(email === "pass")email = this.pass("email");
		
		let result = await this.method("user.getByEmail", email);
		
		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.emailAlreadyUse");
	}
);
