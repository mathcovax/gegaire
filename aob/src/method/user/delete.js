import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id){
		let result = await Prisma.user.findUnique({
			where: {
				id
			},
			select: {
				address: true,
				pro_card: true,
			}
		});

		if(result.address) await this.method("address.delete", result.address.id);
		if(result.pro_card) await this.method("proCard.delete", result.pro_card.id);

		await this.method("work.delete::fromUserId", id);
		await this.method("availability.deleteManyFromUserId", id);
		
		await Prisma.user.delete({
			where: {
				id
			}
		});
	}
);
