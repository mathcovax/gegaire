import {zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {Prisma} from "../prisma/prisma";

// get all availabilitys by user on one month
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availabilitys")
.extract({
	query: {
		date: zod.coerce.date(),
		page: zod.coerce.number().default(0),
		searchName: zod.string().optional(),
	}
})
.handler(async({pickup}, response) => {
	const date = pickup<Date>("date");
	const searchName = pickup<string>("searchName");
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const users = await Prisma.user.findMany({
		where: {
			name: searchName ? {contains: searchName, mode: "insensitive"} : undefined
		},
		
		select: {
			name: true,
			id: true,
			availability: {
				where: {
					month,
					year
				},

				select: {
					id: true,
					am: true, 
					pm: true,
					month: true,
					year: true,
					day: true,
					note: true,
					groupId: true,

					work: {
						select: {
							amActivityId: true,
							amLeader: true,
							pmActivityId: true,
							pmLeader: true,
						}
					}
				}
			}
		},
		
		skip: 20 * pickup("page"),
		take: 20,
		orderBy: {
			name: "asc",
		}
	});
	
	response.code(200).info("availabilitys.get").send(users);
});

// get one availability by id
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availability/{id}")
.extract({
	params: {
		id: zod.coerce.number(),
	},
	query: {
		user: zod.coerce.boolean().default(false),
		work: zod.coerce.boolean().default(false),
	}
})
.handler(async({pickup}, response) => {
	const id = pickup<number>("id");
	const user = pickup<boolean>("user");
	const work = pickup<boolean>("work");

	const availability = await Prisma.availability.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			user: user ? 
				{
					select: {
						name: true, 
						id: true
					}
				} : 
				undefined,
			work: work ?
				{
					select: {
						amActivity: {
							select: {
								id: true,
								name: true
							}
						},
						pmActivity: {
							select: {
								id: true,
								name: true
							}
						},
						amLeader: true,
						pmLeader: true,
					}
				} : 
				undefined,
			am: true,
			pm: true,
			date: true,
			note: true,
		}
	});

	response.code(200).info("availability.get").send(availability);
});
