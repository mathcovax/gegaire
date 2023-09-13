import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const groupExist = duplo.createChecker(
	"groupExist", 
	{
		async handler(id: number, output){
			const group = await Prisma.group.findUnique({
				where: {
					id
				},
				select: {
					id: true
				}
			});

			if(!group) return output("group.notfound", undefined);
			else return output("group.exist", group);
		},
		outputInfo: ["group.exist", "group.notfound"]
	}
); 
