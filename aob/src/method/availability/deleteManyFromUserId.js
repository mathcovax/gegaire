import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(user_id){
		await Prisma.availability.deleteMany({
			where: {
				userId: user_id
			}
		});
	}
);
