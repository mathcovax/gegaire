import {checker} from "anotherback/cli";

export default checker(
	{
		pass: (req, pass) => ({user_name: pass("user_name")})
	},
	async function({user_name}){
		"aob-pass:user_id";

		let result = await this.method("user.getByName", user_name);

		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.nameAlreadyUse");
	}
);
