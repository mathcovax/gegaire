import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => ({user_tel: "pass"})
	},
	async function({user_tel}){
		"aob-pass:user_id";
		
		if(user_tel === "pass")user_tel = this.pass("user_tel");

		let result = await this.method("user.getFromAnyValue", {tel: user_tel}, undefined);

		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.telAlreadyUse");
	}
);
