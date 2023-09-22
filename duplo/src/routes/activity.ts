import {zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {activityExist} from "../checkers/activity";
import {compareDates} from "../checkers/date";
import {userExist} from "../checkers/user";
import {availabilityExist} from "../checkers/availability";
import {Prisma} from "../prisma/prisma";
import {dateWithoutTime, stringBool} from "../utils/shortZod";
import {groupExist} from "../checkers/groups";
import {compareHour} from "../utils/activity";

// 
//create an activity
// 
mustBeConnected({options: {isManager: true}})
.declareRoute("POST", "/activity")
.extract({
	body: {
		name: zod.string().max(50),
		number: zod.number(),
		address: zod.string().max(500),
		date: dateWithoutTime,
		hourStart: zod.string().max(5).min(5).optional(),
		hourEnd: zod.string().max(5).min(5).optional(),
		note: zod.string().max(1500),
		groupId: zod.number(),
	}
})
.check(
	compareDates, 
	{
		input: pickup => ({date1: new Date(), date2: pickup("date")}),
		validate: info => info === "validCompare",
		catch: response => response.code(400).info("activity.isPast").send(),
	}
)
.check(
	groupExist,
	{
		input: pickup => pickup("groupId"),
		validate: info => info === "group.exist",
		catch: (response, info) => response.code(404).info(info).send(),
	}
)
.cut(({pickup}, response) => {
	if(compareHour(pickup("hourStart"), pickup("hourEnd")) === false){
		response.code(400).info("activity.wrongHour").send();
	}
})
.handler(async({pickup}, response) => {
	const activity = await Prisma.activity.create({
		data: {
			name: pickup("name"),
			number: pickup("number"),
			address: pickup("address"),
			date: pickup("date"),
			hourStart: pickup("hourStart"),
			hourEnd: pickup("hourEnd"),
			note: pickup("note"),
			groupId: pickup("groupId"),
		},
		select: {
			id: true,
		}
	});

	response.code(200).info("activity.create").send(activity);
});

//
//edit activity
//
mustBeConnected({options: {isManager: true}})
.declareRoute("PUT", "/activity/{activityId}")
.extract({
	params: {
		activityId: zod.coerce.number(),
	},
	body: {
		name: zod.string().max(50),
		number: zod.number(),
		address: zod.string().max(500),
		hourStart: zod.string().max(5).min(5).optional(),
		hourEnd: zod.string().max(5).min(5).optional(),
		note: zod.string().max(1500),
	}
})
.check(
	activityExist,
	{
		input: pickup => pickup("activityId"),
		validate: info => info === "activity.exist",
		catch: (response, info) => response.code(404).info(info).send(),
	}
)
.cut(({pickup}, response) => {
	if(compareHour(pickup("hourStart"), pickup("hourEnd")) === false){
		response.code(400).info("activity.wrongHour").send();
	}
})
.handler(async({pickup}, response) => {
	await Prisma.activity.update({
		where: {
			id: pickup("activityId"),
		},
		data: {
			name: pickup("name"),
			number: pickup("number"),
			address: pickup("address"),
			hourStart: pickup("hourStart"),
			hourEnd: pickup("hourEnd"),
			note: pickup("note"),
		}
	});

	response.code(200).info("activity.edit").send();
});

//
//get activity by id
//
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/activity/{activityId}")
.extract({
	params: {
		activityId: zod.coerce.number(),
	},
	query: {
		all: stringBool.optional(),
	},
})
.check<typeof activityExist, "activity", "activity.exist">(
	activityExist,
	{
		input: pickup => pickup("activityId"),
		validate: info => info === "activity.exist",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("activity", data),
		options: pickup => ({info: true, group: true, guide: !!pickup("all")}),
	}
)
.handler(async({pickup}, response) => response.code(200).info("activity.get").send(pickup("activity")));

// 
//place user to activity
// 
mustBeConnected({options: {isManager: true}})
.declareRoute("PATCH", "/activity/{activityId}/place")
.extract({
	params: {
		activityId: zod.coerce.number()
	},
	body: {
		userId: zod.number(),
		workAm: zod.boolean(),
		workPm: zod.boolean(),
		workLeader: zod.boolean(),
	}
})
.check<typeof activityExist, "activity", "activity.exist">(
	activityExist, 
	{
		input: (pickup) => pickup("activityId"),
		validate: (info) => info === "activity.exist",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("activity", data)
	}
)
.check(
	compareDates,
	{
		input: (pickup) => ({
			date1: new Date(),
			date2: pickup("activity").date,
		}),
		validate: (info) => info === "validCompare",
		catch: (response, info) => response.code(403).info(info).send()
	}
)
.check(
	userExist,
	{
		input: (pickup) => pickup("userId"),
		validate: (info) => info === "userExist",
		catch: (response, info) => response.code(404).info(info).send()
	}
)
.check<typeof availabilityExist, "availability", "availabilityExist">(
	availabilityExist,
	{
		input: (pickup) => ({
			date: pickup("activity").date,
			userId: pickup("userId")
		}),
		validate: (info) => info === "availabilityExist",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("availability", data),
		options: {
			work: true
		}
	}
)
.cut(({pickup}, response) => {
	const activity = pickup("activity");
	const availability = pickup("availability");

	if(activity.groupId !== availability.groupId) response.code(409).info("activity.wrong_group").send();

	else if(pickup("workAm") === true && availability.am !== true) response.code(409).info("user.notAvailable.am").send();

	else if(pickup("workPm") === true && availability.pm !== true) response.code(409).info("user.notAvailable.pm").send();
})
.handler(async({pickup}, response) => {
	const activity = pickup("activity");
	const availability = pickup("availability");
	let work = availability.work;

	if(work === null) await Prisma.work.create({
		data: {
			availabilityId: availability.id,
			userId: pickup("userId"),
			date: activity.date,

			amActivityId: pickup("workAm") ? activity.id : undefined,
			amLeader: pickup("workAm") ? pickup("workLeader") : undefined,
			pmActivityId: pickup("workPm") ? activity.id : undefined,
			pmLeader: pickup("workPm") ? pickup("workLeader") : undefined,
		}
	});

	else if(
		work.amActivityId === work.pmActivityId || 
		(pickup("workAm") === true && work.pmActivityId === activity.id) ||
		(pickup("workPm") === true && work.amActivityId === activity.id)
	) await Prisma.work.update({
		where: {
			id: work.id,
		},

		data: {
			amActivityId: pickup("workAm") ? activity.id : null,
			amLeader: pickup("workAm") ? pickup("workLeader") : null,
			pmActivityId: pickup("workPm") ? activity.id : null,
			pmLeader: pickup("workPm") ? pickup("workLeader") : null, 
		}
	});

	else await Prisma.work.update({
		where: {
			id: work.id,
		},

		data: {
			amActivityId: pickup("workAm") ? activity.id : undefined,
			amLeader: pickup("workAm") ? pickup("workLeader") : undefined,
			pmActivityId: pickup("workPm") ? activity.id : undefined,
			pmLeader: pickup("workPm") ? pickup("workLeader") : undefined, 
		}
	});

	response.code(202).info("activity.place").send();
});

// 
//get activities 
//
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/activities")
.extract({
	query: {
		date: dateWithoutTime,
	}
})
.handler(async({pickup}, response) => {
	const date = pickup("date");

	const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
	const toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	const activities = await Prisma.activity.findMany({
		where: {
			date: {
				gte: fromDate,
				lte: toDate,
			}
		},
		select: {
			name: true,
			date: true,
			number: true,
			note: true,
			hourStart: true,
			hourEnd: true,
			id: true,
			status: true,
			address: true,
			group: {
				select: {
					name: true,
					id: true
				}
			},
			amGuide: {
				select: {
					amActivityId: true,
					amLeader: true,
					pmActivityId: true,
					pmLeader: true,
					user: {
						select: {
							name: true,
							id: true,
						}
					},
					availability: {
						select: {
							note: true
						}
					}
				}
			},
			pmGuide: {
				select: {
					amActivityId: true,
					amLeader: true,
					pmActivityId: true,
					pmLeader: true,
					user: {
						select: {
							name: true,
							id: true,
						}
					},
					availability: {
						select: {
							note: true
						}
					}
				}
			}
		},
		orderBy: {
			date: "asc"
		}
	});

	response.code(200).info("activity.get").send(activities);
});
