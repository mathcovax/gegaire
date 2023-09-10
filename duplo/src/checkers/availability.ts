import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const availabilityExist =  duplo.createChecker(
	"availabilityExist",
	{
		async handler(idOrDate: number | Date, output, {user, work, activity}){
			const availability = await Prisma.availability.findUnique({
				where: {
					id: typeof idOrDate === "number" ? idOrDate : undefined,
					date: idOrDate instanceof Date ? idOrDate : undefined,
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
		options: {
			user: false as boolean | undefined,
			work: false as boolean | undefined,
			activity: false as boolean | undefined,
		}
	}
);
