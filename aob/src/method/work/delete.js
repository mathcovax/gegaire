import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){
		await Prisma.work.delete({
			where: {
				id
			}
		});
	}
);

export const fromActivityId = method(
	async function(id){
		await Promise.all([
			Prisma.work.updateMany({
				where: {
					amActivityId: id,
					pmActivityId: {
						not: null
					}
				},
				data: {
					amActivityId: null,
					amLeader: null
				}
			}),

			Prisma.work.updateMany({
				where: {
					pmActivityId: id,
					amActivityId: {
						not: null
					}
				},
				data: {
					pmActivityId: null,
					pmLeader: null
				}
			}),
		]);

		await Prisma.work.deleteMany({
			where: {
				OR: [
					{
						amActivityId: id,
						pmActivityId: id
					},
					{
						amActivityId: id,
						pmActivityId: null,
					},
					{
						amActivityId: null,
						pmActivityId: id,
					}
				]
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
