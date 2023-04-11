import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(id, groups){
		let {groups: result_groups} = await Prisma.user.findUnique({
			where: {
				id
			},
			select: {
				groups: {
					select: {
						id: true
					}
				}
			}
		});

		let update_groups = [];

		for(const group of groups){
			let index = result_groups.findIndex(v => v.id === group.id);
			
			if(index === -1)update_groups.push(group);
			else result_groups = result_groups.filter((v, i) => i !== index);
		}

		await Prisma.user.update({
			where: {
				id
			},
			data: {
				groups: {
					disconnect: result_groups,
					connect: update_groups,
				}
			}
		});
	}
);
