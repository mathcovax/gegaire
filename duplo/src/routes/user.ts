import {zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {Prisma} from "../prisma/prisma";
import {dateWithoutTime, stringBoolOrNull} from "../utils/shortZod";

// get users
mustBeConnected({options: {isAdminOrManager: true}})
.declareRoute("GET", "/users")
.extract({
	query: {
		skip: zod.coerce.number().min(0),
		take: zod.coerce.number().max(30).min(1),
		searchName: zod.string().optional(),
		userId: zod.coerce.number().optional(),

		availability: zod.string().containBool.optional(),
		date: dateWithoutTime.optional(),
		am: stringBoolOrNull.optional(),
		pm: stringBoolOrNull.optional(),
		stats: zod.string().containBool.optional(),
	}
})
.handler(async({pickup}, response) => {
	const availability = pickup("availability");
	const date = pickup("date");
	const am = pickup("am") as boolean | null | undefined;
	const pm = pickup("pm") as boolean | null | undefined;
	const stats = pickup("stats");

	const users = await Prisma.user.findMany({
		where: {
			id: pickup("userId"),
			name: {
				contains: pickup("searchName"),
				mode: "insensitive",
			},
			availability: availability && am !== undefined && pm !== undefined && date !== undefined ?
				{
					some: {
						date: {
							equals: date
						},
						am: {
							equals: am
						},
						pm: {
							equals: pm
						},
					}
				} :
				undefined
		},

		select: {
			id: true,
			name: true,
			availability: availability && date ?
				{
					where: {
						date,
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
				} :
				undefined
		},

		skip: pickup("skip"),
		take: pickup("take"), 
	});

	if(availability && date && stats){
		var fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
		var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		const requests: Promise<any>[] = [];
		users.forEach((user) => {
			requests.push((async() => {
				const availabilitys = await Prisma.availability.findMany({
					where: {
						userId: user.id,
						date: {
							gte: fromDate,
							lte: toDate,
						}
					},
					select: {
						am: true,
						pm: true,

						work: {
							select: {
								amActivityId: true,
								pmActivityId: true,
							}
						}
					}
				});

				const countWork = availabilitys.reduce((p, v) => v.work?.amActivityId || v.work?.pmActivityId ? p += 1 : p, 0);

				type userWithStats = {
					stats: {
						countWork: number,
						ratio: number,
					}
				} & typeof user;

				(user as userWithStats).stats = {
					countWork: countWork,
					ratio: Math.round(countWork * 100 / availabilitys.length) || 0,
				};
			})());
		});

		await Promise.all(requests);
	}

	response.code(200).info("users.get").send(users);
});
