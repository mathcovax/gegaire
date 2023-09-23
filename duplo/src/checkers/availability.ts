import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const availabilityExist =  duplo.createChecker(
	"availabilityExist",
	{
		async handler(input: number | {date: Date, userId: number}, output, {user, work, activity, group}){
			let where;
			if(typeof input === "number") where = {id: input};
			else where = {
				userId: input.userId,
				day: input.date.getDate(),
				month: input.date.getMonth() + 1,
				year: input.date.getFullYear()
			};

			const availability = await Prisma.availability.findFirst({
				where,
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
								id: true,
								amActivity: activity ?
									{
										select: {
											id: true,
											name: true
										}
									} :
									undefined,
								amActivityId: true,
								pmActivity: activity ?
									{
										select: {
											id: true,
											name: true
										}
									} :
									undefined,
								pmActivityId: true,

								amLeader: true,
								pmLeader: true,
							}
						} : 
						undefined,
					
					group: group,
					userId: true,
					groupId: true,
					am: true,
					pm: true,
					date: true,
					note: true,
				}
			});

			if(!availability) return output("availabilityNotExist", undefined);
			else return output("availabilityExist", availability);
		},
		outputInfo: ["availabilityNotExist", "availabilityExist"],
		options: {} as {
			user?: boolean,
			work?: boolean,
			activity?: boolean,
			group?: boolean,
		}
	}
);
