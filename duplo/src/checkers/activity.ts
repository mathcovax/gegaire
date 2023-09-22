import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const activityExist = duplo.createChecker(
	"activityExist",
	{
		async handler(id: number, output, {info, group, guide}){
			const activity = await Prisma.activity.findUnique({
				where: {
					id
				}, 
				select: {
					id: true,
					date: true,
					groupId: true,

					name: info,
					number: info,
					hourStart: info,
					hourEnd: info,
					note: info,
					status: info,
					address: info,
					group: group,

					amGuide: guide ?
						{
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
						} : 
						undefined,
					pmGuide: guide ?
						{
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
						} : 
						undefined,
				}
			});

			if(!activity) return output("activity.notfound", undefined);
			else return output("activity.exist", activity);
		},
		outputInfo: ["activity.exist", "activity.notfound"], 
		options: {
			info: false, 
			group: false,
			guide: false,
		}
	}
);
