import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(where, select){
		return await Prisma.work.findFirst({where, select});
	}
);

export const fromUserIdByMonth = method(
	async function(userId, workDate){
		workDate.setDate(1);
		let toDate = new Date(workDate.getTime());
		toDate.setMonth(workDate.getMonth() + 1);

		let result = await Prisma.work.findMany({
			where: {
				userId,
				date: {
					gte: workDate,
					lt: toDate
				}
			},

			select: {
				amActivity: {
					select: {
						id: true,
						name: true,
						status: true,
					}
				},
				amLeader: true,
				pmActivity: {
					select: {
						id: true,
						name: true,
						status: true,
					}
				},
				pmLeader: true,
				date: true
			},
			orderBy: {
				date: "asc"
			}
		});

		return result.map(v => {
			if(v.amActivity !== null && v.amActivity?.status !== "showning")v.amActivity = true;
			if(v.pmActivity !== null && v.pmActivity?.status !== "showning")v.pmActivity = true;
			return v;
		});
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
