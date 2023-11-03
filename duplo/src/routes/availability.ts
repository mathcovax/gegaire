import {zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {Prisma} from "../prisma/prisma";
import {availabilityExist} from "../checkers/availability";
import {compareDates} from "../checkers/date";
import {userExist} from "../checkers/user";
import {groupExist} from "../checkers/groups";
import {dateWithoutTime, stringBool} from "../utils/shortZod";

//
// get all availabilitys by users on one month
//
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availabilitys")
.extract({
	query: {
		date: dateWithoutTime,
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

//
// get one availability by id
//
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/availability/{id}")
.extract({
	params: {
		id: zod.coerce.number(),
	},
	query: {
		user: stringBool.optional(),
		work: stringBool.optional(),
		activity: stringBool.optional(),
		group: stringBool.optional(),
	}
})
.check(
	availabilityExist,
	{
		input: (pickup) => pickup("id"),
		result: "availabilityExist",
		catch: (response, info) => response.code(404).info(info).send(),
		indexing: "availability",
		options: (pickup) => ({
			activity: pickup("activity"),
			user: pickup("user"),
			work: pickup("work"),
			group: pickup("group"),
		})
	}
)
.handler(async({pickup}, response) => {
	const availability = pickup("availability");

	response.code(200).info("availability.get").send(availability);
});

//
// get states availability of date
//
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

//
// post availability
//
mustBeConnected({pickup: ["contentAccessToken"]})
.declareRoute("POST", "/user/{userId}/availability")
.extract({
	params: {
		userId: zod.coerce.number()
	},
	query: {
		toDate: dateWithoutTime.optional(),
	},
	body: {
		date: dateWithoutTime,
		am: zod.boolean().nullable(),
		pm: zod.boolean().nullable(),
		note: zod.string().max(1500),
		groupId: zod.number(),
	},
})
.cut(({pickup}, response) => {
	const contentAccessToken = pickup("contentAccessToken");
	if(!contentAccessToken.isManager && contentAccessToken.id !== pickup("userId")){
		response.code(403).info("errorAccessTokenManager").send();
	}
})
.check(
	userExist,
	{
		input: (pickup) => pickup("userId"),
		result: "userExist",
		catch: (response, info) => response.code(404).info(info).send()
	}
)
.check(
	groupExist,
	{
		input: pickup => pickup("groupId"),
		result: "group.exist",
		catch: (response, info) => response.code(404).info(info).send()
	}
)
.check(
	compareDates,
	{
		input: (pickup) => ({
			date1: new Date(),
			date2: pickup("date"),
		}),
		result: "validCompare",
		catch: (response) => response.code(400).info("availability.isPast").send(),
	}
)
.check(
	compareDates,
	{
		input: (pickup) => ({
			date1: pickup("date"),
			date2: pickup("toDate") as Date,
		}),
		result: "validCompare",
		catch: (response) => response.code(400).info("availability.invalidToDate").send(),
		skip: (pickup) => pickup("toDate") === undefined,
		options: {
			unit: "day",
			minBetween: 1,
			maxBetween: 22
		}
	}
)
.check(
	availabilityExist,
	{
		input: pickup => ({
			userId: pickup("userId"),
			date: pickup("date"),
		}),
		catch: () => {},
		indexing: "availability",
		options: {
			work: true
		}
	}
)
.cut(({pickup}, response) => {
	if(pickup("availability")?.work) response.code(409).info("availability.hasWork").send();
})
.handler(async({pickup}, response) => {
	const date = pickup("date");
	const toDate = pickup("toDate");
	const availability = pickup("availability");
	const userId = pickup("userId");
	const groupId = pickup("groupId");

	const am = pickup("am");
	const pm = pickup("pm");
	const note = pickup("note");

	if(availability) var newAvailability = await Prisma.availability.update({
		where: {id: availability.id},
		data: {am, pm, note},
		select: {
			am: true,
			pm: true,
			note: true,
			group: true,
			date: true
		}
	});
	else var newAvailability =  await Prisma.availability.create({
		data: { 
			userId,
			groupId,
			am, 
			pm, 
			note,
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			date: date
		},
		select: {
			am: true,
			pm: true,
			note: true,
			group: true,
			date: true
		}
	});

	if(toDate){
		// get all availabilitys with note or work from date to toDate
		const availabilitys = await Prisma.availability.findMany({
			where: {
				userId,
				date: {
					gt: date,
					lte: toDate,
				},
				OR: [
					{note: {not: ""}},
					{work: {isNot: null}},
				],
			},
			select: {
				id: true,
				date: true,
			},
			orderBy: {
				date: "asc"
			}
		});

		const incDate = new Date(date);
		const dayLoop = Math.ceil((toDate.getTime() - incDate.getTime()) / 86400000);
		const newAvailabilitys: (Exclude<Parameters<typeof Prisma["availability"]["createMany"]>[0], undefined>["data"]) = [];
		
		for(let inc = 0; inc < dayLoop; inc++){
			incDate.setDate(incDate.getDate() + 1);
			//i use the finding availabilitys to not redefine then
			if(availabilitys[0]?.date.getTime() === incDate.getTime()){
				availabilitys.splice(0, 1);
				continue;
			}
			
			newAvailabilitys.push({
				userId,
				groupId,
				am, 
				pm, 
				note: "",
				day: incDate.getDate(),
				month: incDate.getMonth() + 1,
				year: incDate.getFullYear(),
				date: incDate.toISOString(),
			});
		}
		// delete all availabilitys without note and work
		await Prisma.availability.deleteMany({
			where: {
				userId, 
				date: {
					gt: date,
					lte: toDate,
				},
				note: "",
				work: {is: null},
			}
		});
		await Prisma.availability.createMany({data: newAvailabilitys});
	}

	response.code(202).info("availability.post").send(newAvailability);
});
