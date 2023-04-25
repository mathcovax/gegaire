import {register, registerOptions} from "anotherback/cli";
import bcrypt from "bcrypt";

export const options = registerOptions(
	{
		prefix: "token",
		access: "",
	}
);

export default register(
	function(reg, hook){

		reg({
			method: "POST",
			path: "/",
			checkers: [
				"email<body",
				"user.password<body"
			]
		})
		(async function(req, res){
			let result = await this.method(
				"user.getFromAnyValue", 
				{
					email: this.pass("email")
				},
				{
					id: true,
					isManager: true,
					isAdmin: true,
					password: true,
				}
			);

			if(result === null){
				this.sender("not_found", "user.notfound");
			}
			if(bcrypt.compareSync(this.pass("user_password"), result.password) === false){
				this.sender("bad_request", "user.wrongPassword");
			}

			delete result.password;

			this.token.generate("accessToken", result);
			this.token.generate("refresh_accessToken", result.id);

			this.sender("ok", "generateAccessToken");
		});
	}
);
