import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(email){
		return await Prisma.user.findUnique({
			where: {
				email
			},
			select: {
				id: true
			}
		});
	}
);
