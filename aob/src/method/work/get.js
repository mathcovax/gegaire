import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(where, select){
		return await Prisma.work.findFirst({where, select});
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
