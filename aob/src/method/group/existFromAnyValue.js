import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(where){
		return await Prisma.group.findFirst({
			where,
			select: {
				id: true
			}
		});
	}
);
