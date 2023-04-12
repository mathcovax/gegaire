import {method} from "anotherback/cli";

// export default method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );

export const byId = method(
	async function(id){
		return await this.method("activity.get::byId", id, {id: true});
	}
);


// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
