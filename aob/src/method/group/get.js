import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(skip, take){
		return await Prisma.group.findMany({
			skip,
			take
		});
	}
);
