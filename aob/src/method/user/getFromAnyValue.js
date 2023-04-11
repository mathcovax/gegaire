import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(where, select){
		return await Prisma.user.findFirst({
			where,
			select,
		});
	}
);
