import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(name){
		return await Prisma.user.findUnique({
			where: {
				name
			},
			select: {
				id: true
			}
		});
	}
);
