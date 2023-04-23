import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, name, address, number, hourStart, hourEnd, note){
		return await Prisma.activity.update({
			where: {
				id,
			},
			data: {
				name,
				address: {
					update: address
				},
				number,
				hourStart,
				hourEnd,
				note
			},
			select: {
				id: true
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
