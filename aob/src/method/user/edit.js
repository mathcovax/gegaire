import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, name, email, tel, isManager, groups, address, proCard){
		if(address !== false) await this.method("user.setAddress", id, address);
		if(proCard !== false) await this.method("user.setProCard", id, proCard);
		if(groups !== false) await this.method("user.setGroups", id, groups);
		
		await Prisma.user.update({
			where: {
				id
			},
			data: {
				name,
				email,
				tel,
				isManager
			}
		});
	}
);
