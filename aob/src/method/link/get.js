import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(skip, take, email){
		let request = {
			skip,
			take,
		};

		if(email){
			request.where = {
				email: {
					contains: email
				}
			};
		}

		return await Prisma.link.findMany(request);
	}
);
