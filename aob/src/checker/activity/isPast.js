import {checker} from "anotherback/cli";

// export default checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );

export const not = checker(
	{
		pass: req => undefined
	},
	function(){
		if(new Date(this.pass("activity").date).getTime() < Date.now()) this.sender("forbidden", "activity.isPast");
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
