import {CheckerExport, ReturnCheckerType, zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {Prisma} from "../prisma/prisma";
import {availabilityExist} from "../checkers/availability";

// get all availabilitys by user on one month
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availabilitys")
.extract({
	query: {
		date: zod.coerce.date(),
		page: zod.coerce.number(),
		searchName: zod.string().optional(),
	}
})
.handler(async({pickup}, response) => {
	const date = pickup("date");
	const searchName = pickup("searchName");
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
		user: zod.string().containBool.optional(),
		work: zod.string().containBool.optional(),
		activity: zod.string().containBool.optional(),
	}
})
.check<{availability: ReturnCheckerType<typeof availabilityExist, undefined>}, typeof availabilityExist>(
	availabilityExist,
	{
		input: (pickup) => pickup("id"),
		validate: (info) => info === "availabilityExist",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("availability", data as ReturnCheckerType<typeof availabilityExist, undefined>),
		options: (pickup) => ({
			activity: pickup("activity"),
			user: pickup("user"),
			work: pickup("work"),
		})
	}
)
.handler(async({pickup}, response) => {
	const availability = pickup("availability");

	response.code(200).info("availability.get").send(availability);
});

// get stast availability of date
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availability/stats/{date}")
.extract({
	params: {
		date: zod.coerce.date()
	}
})
.handler(async({pickup}, response) => {
	const availability = await Prisma.availability.findMany({
		where: {
			date: pickup("date"),
			OR: [
				{am: true},
				{pm: true},
				{am: null, pm: null}, 
			]
		},
		select: {
			am: true,
			pm: true,
			work: {
				select: {
					amActivity: true,
					pmActivity: true,
				}
			},
		}
	});

	const stats = availability.reduce(
		(p, c) => {
			if(c.am && c.pm){
				p.total++;
				if(c.work === null)p.totalFree++;
			}
			else if(c.am && !c.pm){
				p.totalAm++;
				if(c.work === null || c.work.amActivity === null)p.totalAmFree++;
			}
			else if(!c.am && c.pm){
				p.totalPm++;
				if(c.work === null || c.work.pmActivity === null)p.totalPmFree++;
			}
			else if(c.am === null && c.pm === null)p.totalMaybe++;

			return p;
		}, 
		{
			total: 0,
			totalAm: 0,
			totalPm: 0,
			totalMaybe: 0,
			totalFree: 0,
			totalAmFree: 0,
			totalPmFree: 0,
			date: pickup("date"),
		}
	);

	response.code(200).info("availability.stats").send(stats);
});
