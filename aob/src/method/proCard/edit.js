import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, proCard){
		return await Prisma.pro_Card.update({
			where: {
				id
			},
			data: proCard
		});
	}
);
