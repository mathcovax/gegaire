import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(skip, take, name){
		let request = {
			skip,
			take,
		};

		if(name){
			request.where = {
				name: {
					contains: name
				}
			};
		}

		return await Prisma.user.findMany(request);
	}
);

export const withAvailability = method(
	async function(id, day, month, year, am, pm, searchName, skip, take){
		let result = await Prisma.user.findMany({
			where: {
				id,
				name: searchName ? {contains: searchName} : undefined,
				availability: (
					am !== undefined || pm !== undefined ?
						{
							some: {
								day,
								month,
								year,
								am,
								pm,
							}
						}
						:
						undefined
				)
			},
			select: {
				id: true,
				name: true,
				availability: {
					where: {
						day,
						month,
						year,
						am,
						pm,
					},
					select: {
						id: true,
						am: true,
						pm: true,
						note: true,
						work: {
							select: {
								amActivity: true,
								amLeader: true,
								pmActivity: true,
								pmLeader: true
							}
						},

					},
					take: 1
				}
			},
			skip,
			take,
		});

		let date = new Date(year + "-" + month + "-" + day);
		let fromDate = new Date(date);
		fromDate.setDate(fromDate.getDate() - 30);
		let toDate = new Date(date);
		toDate.setDate(toDate.getDate() + 30);

		let requests = [];

		for(const [key, user] of Object.entries(result)){
			requests.push((async() => {
				let works = await Prisma.work.findMany({
					where: {
						userId: user.id,
						date: {
							gte: fromDate,
							lte: toDate,
						}
					},
					select: {
						amActivityId: true,
						pmActivityId: true,
						date: true,
					}
				});

				result[key].countWork = works.reduce(
					(p, v) => {
						if(v.amActivityId !== null){
							if(v.date.getTime() > date.getTime())p.after += 0.5;
							else p.before += 0.5;
						}
						
						if(v.pmActivityId !== null){
							if(v.date.getTime() > date.getTime())p.after += 0.5;
							else p.before += 0.5;
						}
						
						return p;
					},
					{before: 0, after: 0}
				);
			})());
		}

		await Promise.all(requests);

		return result;
	}
);
