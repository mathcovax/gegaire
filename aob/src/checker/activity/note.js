import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({note: req.body?.note.trim() || ""})
	},
	function({note}){
		this.pass("activity_note", note);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
