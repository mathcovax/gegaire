import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(name, address, number, date, hourStart, hourEnd, group_id, note){
		return await Prisma.activity.create({
			data: {
				name,
				address: {
					create: address,
				},
				number,
				date,
				hourStart: hourStart || "",
				hourEnd,
				group: {
					connect: {
						id: group_id
					}
				},
				note,
			},
			
			select: {
				id: true
			}
		});
	}
);
