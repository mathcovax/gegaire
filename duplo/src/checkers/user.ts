import {duplo} from "../../main";
import {Prisma} from "../prisma/prisma";

export const userExist = duplo.createChecker(
	"userExist", 
	{
		async handler(id: number, output){
			const user = await Prisma.user.findUnique({
				where: {
					id
				},
				select: {
					id: true
				}
			});

			if(!user) return output("userNotExit", undefined);
			else return output("userExist", user);
		},
		outputInfo: ["userExist", "userNotExit"]
	}
); 
