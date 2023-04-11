import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){
		return await Prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true
			}
		});
	}
);
