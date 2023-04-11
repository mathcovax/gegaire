import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(email, groups){
		return await Prisma.link.create({
			data: {
				email,
				groups: {
					connect: groups
				}
			},
			select: {
				id: true,
				email: true
			}
		});
	}
);
