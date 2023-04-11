import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => undefined
	},
	async function(){
		let result = await this.method("user.getById", this.pass("user_id"), false);
		
		if(result.isAdmin === true) this.sender("forbidden", "user.forbiddenDelete");
	}
);
