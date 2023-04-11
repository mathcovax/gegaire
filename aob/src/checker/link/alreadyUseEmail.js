import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => ({email: "pass"})
	},
	async function({email}){
		if(email === "pass")email = this.pass("email");

		let result = await this.method("link.getByEmail", email);

		if(result !== null) this.sender("conflict", "link.emailAlreadyUse");
	}
);
