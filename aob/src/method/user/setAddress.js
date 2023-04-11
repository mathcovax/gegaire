import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, address){
		let result_address = await this.method("address.getFromAnyValue", {userId: id}, {text: true, id: true});

		if(result_address === null && !!address === true){
			await Prisma.user.update({
				where: {
					id
				},
				data: {
					address: {
						create: address
					}
				}
			});
		}
		else if(result_address !== null && !!address === true && result_address.text !== address.text){
			await this.method("address.edit", result_address.id, address);
		}
		else if(result_address !== null && !!address === false){
			await this.method("address.delete", result_address.id);
		}
	}
);
