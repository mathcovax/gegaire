import {ReturnCheckerType, zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {activityExist} from "../checkers/activity";
import {compareDates} from "../checkers/date";
import {userExist} from "../checkers/user";
import {availabilityExist} from "../checkers/availability";
import {Prisma} from "../prisma/prisma";

//place user to activity
mustBeConnected({options: {isManager: true}})
.declareRoute("PATCH", "/activity/{activity_id}/place")
.extract({
	params: {
		activity_id: zod.coerce.number()
	},
	body: {
		user_id: zod.number(),
		work_am: zod.boolean(),
		work_pm: zod.boolean(),
		work_leader: zod.boolean(),
	}
})
.check<{activity: ReturnCheckerType<typeof activityExist, undefined>}, typeof activityExist>(
	activityExist, 
	{
		input: (pickup) => pickup("activity_id"),
		validate: (info) => info === "activityExit",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("activity", data as Exclude<typeof data, undefined>)
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
		input: (pickup) => pickup("user_id"),
		validate: (info) => info === "userExist",
		catch: (response, info) => response.code(404).info(info).send()
	}
)
.check<{availability: ReturnCheckerType<typeof availabilityExist, undefined>}, typeof availabilityExist>(
	availabilityExist,
	{
		input: (pickup) => pickup("activity").date,
		validate: (info) => info === "availabilityExist",
		catch: (response, info) => response.code(404).info(info).send(),
		output: (drop, info, data) => drop("availability", data as Exclude<typeof data, undefined>),
		options: {
			work: true
		}
	}
)
.cut(({pickup}, response) => {
	const activity = pickup("activity");
	const availability = pickup("availability");

	if(activity.groupId !== availability.groupId) response.code(409).info("activity.wrong_group").send();

	if(pickup("work_am") === true && availability.am !== true) response.code(409).info("user.notAvailable.am").send();

	if(pickup("work_pm") === true && availability.pm !== true) response.code(409).info("user.notAvailable.pm").send();
})
.handler(async({pickup}, response) => {
	const activity = pickup("activity");
	const availability = pickup("availability");
	let work = availability.work;

	if(work === null) await Prisma.work.create({
		data: {
			availabilityId: availability.id,
			userId: pickup("user_id"),
			date: activity.date,

			amActivityId: pickup("work_am") ? activity.id : undefined,
			amLeader: pickup("work_am") ? pickup("work_leader") : undefined,
			pmActivityId: pickup("work_pm") ? activity.id : undefined,
			pmLeader: pickup("work_pm") ? pickup("work_leader") : undefined,
		}
	});

	else if(work.amActivityId === work.pmActivityId) await Prisma.work.update({
		where: {
			id: work.id,
		},

		data: {
			amActivityId: pickup("work_am") ? activity.id : null,
			amLeader: pickup("work_am") ? pickup("work_leader") : null,
			pmActivityId: pickup("work_pm") ? activity.id : null,
			pmLeader: pickup("work_pm") ? pickup("work_leader") : null, 
		}
	});

	else await Prisma.work.update({
		where: {
			id: work.id,
		},

		data: {
			amActivityId: pickup("work_am") ? activity.id : undefined,
			amLeader: pickup("work_am") ? pickup("work_leader") : undefined,
			pmActivityId: pickup("work_pm") ? activity.id : undefined,
			pmLeader: pickup("work_pm") ? pickup("work_leader") : undefined, 
		}
	});

	response.code(202).info("activity.place");
});
