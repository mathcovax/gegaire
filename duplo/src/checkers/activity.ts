import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const activityExist = duplo.createChecker(
	"activityExist",
	{
		async handler(id: number, output){
			const activity = await Prisma.activity.findUnique({
				where: {
					id
				}, 
				select: {
					id: true,
					date: true,
					groupId: true,
				}
			});

			if(!activity) return output("activity.notfound", undefined);
			else return output("activity.exist", activity);
		},
		outputInfo: ["activity.exist", "activity.notfound"]
	}
);
