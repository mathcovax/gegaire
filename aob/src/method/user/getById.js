import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, addressAndProCard){
		return await Prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				tel: true,
				isManager: true,
				isAdmin: true,
				groups: true,

				address: addressAndProCard,
				pro_card: addressAndProCard,
			}
		});
	}
);
