import {checker} from "anotherback/cli";

// export default checker(
// 	{
// 		default: (req, pass) => req
// 	},
// 	function(req){
		
// 	}
// );

export const name = checker(
	{
		pass: (req, pass) => ({user_name: pass("user_name")})
	},
	async function({user_name}){
		"aob-pass:user_id";

		let result = await this.method("user.getByName", user_name);

		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.nameAlreadyUse");
	}
);

export const email = checker(
	{
		pass: (req, pass) => ({user_email: pass("user_email")})
	},
	async function({user_email}){
		"aob-pass:user_id";
		
		let result = await this.method("user.getByEmail", user_email);
		
		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.emailAlreadyUse");
	}
);

export const tel = checker(
	{
		pass: (req, pass) => ({user_tel: pass("user_tel")})
	},
	async function({user_tel}){
		"aob-pass:user_id";

		let result = await this.method("user.getFromAnyValue", {tel: user_tel}, undefined);

		if(result !== null && result.id !== this.pass("user_id")) this.sender("conflict", "user.telAlreadyUse");
	}
);

// export const other = checker(
// 	{
// 		default: (req, pass) => req
// 	},
// 	function(req){
		
// 	}
// );
