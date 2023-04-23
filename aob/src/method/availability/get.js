import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(userId, day, month, year, am, pm, searchName, skip, take){
		return await Prisma.availability.findMany({
			where: {
				userId,
				day,
				month,
				year,
				am,
				pm,
				user: (
					searchName ? 
						{
							name: {
								contains: searchName
							}
						} 
						: 
						undefined
				)
			},
			select: {
				id: true,
				day: true,
				month: true,
				year: true,
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
				user: (
					!userId ?
						{
							select: {
								name: true,
							}
						}
						:
						false
				)
			},
			skip,
			take
		});
	}
);

export const byUserId = method(
	async function(userId, day, month, year){
		return await Prisma.availability.findFirst({
			where: {
				userId,
				day,
				month,
				year,
			},
			select: {
				id: true,
				day: true,
				month: true,
				year: true,
				am: true,
				pm: true,
				note: true,
				work: {
					select: {
						amActivityId: true,
						amLeader: true,
						pmActivityId: true,
						pmLeader: true,
					}
				},
				groupId: true
			}
		});
	}
);

export const byId = method(
	async function(id){
		return await Prisma.availability.findFirst({
			where: {
				id
			},
			select: {
				id: true,
				am: true,
				pm: true,
				work: {
					select: {
						amActivityId: true,
						amLeader: true,
						pmActivityId: true,
						pmLeader: true,
					}
				},
				date: true
			}
		}); 
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
