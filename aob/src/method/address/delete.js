import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){
		await Prisma.address.delete({
			where: {
				id
			}
		});
	}
);
