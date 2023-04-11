import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(group_id, group_name){
		await Prisma.group.update({
			where: {
				id: group_id
			},
			data: {
				name: group_name
			}
		});
	}
);
