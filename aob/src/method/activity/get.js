import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

// export default method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );

export const byId = method(
	async function(id, select){
		return await Prisma.activity.findUnique({
			where: {
				id
			},
			select
		});
	}
);

export const infoById = method(
	async function(id, all){
		return await Prisma.activity.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				number: true,
				date: true,
				hourStart: true,
				hourEnd: true,
				note: true,
				address: {
					select: {
						text: true,
						city: true,
						lat: true, 
						lng: true,
						postcode: true,
					}
				},
				group: true,
				amGuide: all,
				pmGuide: all,
			}
		});
	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
