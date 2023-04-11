import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(user_id, month, year){
		return await Prisma.availability.findMany({
			where: {
				month,
				year,
				userId: user_id
			},
			select: {
				day: true,
				am: true,
				pm: true,
				note: true,
				work: {
					select: {
						amActivity: true,
						amLeader: true,
						pmActivity: true,
						pmLeader: true,
					}
				},
				group: {
					select: {
						name: true,
						id: true
					}
				},
			}
		});
	}
);
