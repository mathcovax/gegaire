import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(user_id, day, month, year, am, pm, group_id, note){
		let exist = await Prisma.availability.findFirst({
			where: {
				userId: user_id,
				day,
				month,
				year
			},
			select: {
				id: true
			}
		});

		if(exist === null){
			return await Prisma.availability.create({
				data: {
					userId: user_id,
					day,
					month,
					year,
					am,
					pm,
					groupId: group_id,
					note,
					date: new Date(`${year}-${month}-${day}`)
				},
				select: {
					day: true,
					am: true,
					pm: true,
					note: true,
					group: {
						select: {
							name: true,
							id: true
						}
					},
				}
			});
		}
		else {
			return await Prisma.availability.update({
				where: {
					id: exist.id
				},
				data: {
					day,
					month,
					year,
					am,
					pm,
					groupId: group_id,
					note
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
	}
);
