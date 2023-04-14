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
		return await Prisma.user.findMany({
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
	}
);
