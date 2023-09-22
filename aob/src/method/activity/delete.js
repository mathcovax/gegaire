import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){

		await this.method("work.delete::fromActivityId", id);

		return await Prisma.activity.delete({
			where: {
				id
			}
		});
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
