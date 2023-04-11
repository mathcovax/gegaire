import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({name: req.body?.name.trim() || ""})
	},
	function({name}){
		if(typeof name !== "string" || !name.length.btw(4, 30)) this.sender("bad_request", "activity.name");

		this.pass("activity_name", name);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
