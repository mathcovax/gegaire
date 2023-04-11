import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({user_isManager: req.body.isManager})
	},
	function({user_isManager}){
		this.pass("user_isManager", !!user_isManager);
	}
);
