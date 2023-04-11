import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(group_id){
		await Prisma.availability.deleteMany({
			where: {
				groupId: group_id,
			}
		});

		await Prisma.group.delete({
			where: {
				id: group_id
			}
		});
	}
);
