import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, address){
		await Prisma.address.update({
			where: {
				id
			},
			data: address
		});
	}
);
