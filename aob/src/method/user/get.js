import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(skip, take, name){
		let request = {
			skip,
			take,
		};

		if(name){
			request.where = {
				name: {
					contains: name
				}
			};
		}

		return await Prisma.user.findMany(request);
	}
);
