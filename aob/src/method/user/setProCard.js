import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, proCard){
		let result_proCard = await this.method("proCard.getByUserId", id);

		if(result_proCard === null && !!proCard === true){
			await Prisma.user.update({
				where: {
					id
				},
				data: {
					pro_card: {
						create: proCard
					}
				}
			});
		}
		else if(
			result_proCard !== null && 
			!!proCard === true && 
			(
				result_proCard.from.toISOString() !== proCard.from.toISOString() ||
				result_proCard.to.toISOString() !== proCard.to.toISOString()
			)
		){
			await this.method("proCard.edit", result_proCard.id, proCard);
		}
		else if(result_proCard !== null && !!proCard === false){
			await this.method("proCard.delete", result_proCard.id);
		}
	}
);
