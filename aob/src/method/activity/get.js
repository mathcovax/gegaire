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
				isShow: true,
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
				amGuide: (
					all ?
						{
							select: {
								amActivityId: true,
								amLeader: true,
								pmActivityId: true,
								pmLeader: true,
								user: {
									select: {
										name: true,
										id: true,
									}
								},
								availability: {
									select: {
										note: true
									}
								}
								
							}
						}
						:
						undefined
				),
				pmGuide: (
					all ?
						{
							select: {
								amActivityId: true,
								amLeader: true,
								pmActivityId: true,
								pmLeader: true,
								user: {
									select: {
										name: true,
										id: true,
									}
								},
								availability: {
									select: {
										note: true
									}
								}
							}
						}
						:
						undefined
				),
			}
		});
	}
);

export const month = method(
	async function(date){
		date.setDate(1);
		let toDate = new Date(date.getTime());
		toDate.setMonth(toDate.getMonth() + 1);

		return await Prisma.activity.findMany({
			where: {
				date: {
					gte: date,
					lt: toDate
				}
			},
			select: {
				name: true,
				date: true,
				number: true,
				note: true,
				hourStart: true,
				hourEnd: true,
				id: true,
				isShow: true,
				address: {
					select: {
						text: true,
					}
				},
				group: {
					select: {
						name: true,
						id: true
					}
				},
				amGuide: {
					select: {
						amActivityId: true,
						amLeader: true,
						pmActivityId: true,
						pmLeader: true,
						user: {
							select: {
								name: true,
								id: true,
							}
						},
						availability: {
							select: {
								note: true
							}
						}
					}
				},
				pmGuide: {
					select: {
						amActivityId: true,
						amLeader: true,
						pmActivityId: true,
						pmLeader: true,
						user: {
							select: {
								name: true,
								id: true,
							}
						},
						availability: {
							select: {
								note: true
							}
						}
					}
				},
			},
			orderBy: {
				date: "asc"
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
