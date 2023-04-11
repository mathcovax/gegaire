import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({user_tel: req.body.tel})
	},
	function({user_tel}){
		if(!user_tel.length.btw(10, 12)) this.sender("bad_request", "user.tel");

		this.pass("user_tel", user_tel);
	}
);
