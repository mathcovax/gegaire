import {ReturnCheckerType, zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {activityExist} from "../checkers/activity";
import {compareDates} from "../checkers/date";
import {userExist} from "../checkers/user";
import {availabilityExist} from "../checkers/availability";
import {Prisma} from "../prisma/prisma";

//place user to activity
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
.check<{activity: ReturnCheckerType<typeof activityExist, undefined>}, typeof activityExist>(
	activityExist, 
	{
		input: (pickup) => pickup("activityId"),
		validate: (info) => info === "activity.exist",
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
		input: (pickup) => pickup("userId"),
		validate: (info) => info === "userExist",
		catch: (response, info) => response.code(404).info(info).send()
	}
)
.check<{availability: ReturnCheckerType<typeof availabilityExist, undefined>}, typeof availabilityExist>(
	availabilityExist,
	{
		input: (pickup) => ({
			date: pickup("activity").date,
			userId: pickup("userId")
		}),
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
