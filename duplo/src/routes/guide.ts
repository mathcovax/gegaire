import {zod} from "@duplojs/duplojs";
import {mustBeConnected} from "../security/connected";
import {Prisma} from "../prisma/prisma";

//
//count user with criteria
//
mustBeConnected({options: {isManager: true}})
.declareRoute("GET", "/guides/count")
.extract({
	query: {
		searchName: zod.string().optional(),
	}
})
.handler(async({pickup}, request) => {
	const searchName = pickup("searchName");

	const count = await Prisma.user.count({
		where: {
			name: searchName ? {contains: searchName} : undefined
		}
	});
	
	request.code(200).info("guides.count").send(count.toString());
});
