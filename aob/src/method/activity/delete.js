import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){
		let result = await Prisma.activity.findFirst({
			where: {
				id
			},
			select: {
				address: {
					select: {
						id: true
					}
				}
			}
		});

		await Promise.all([
			this.method("address.delete", result.address.id),
			this.method("work.delete::fromActivityId", id)
		]);

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
