import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(availability_id, amActivity_id, amLeader, pmActivity_id, pmLeader){
		
		return await Prisma.work.update({
			where: {
				availabilityId: availability_id,
			},
			data: {
				amActivityId: amActivity_id,
				amLeader,
				pmActivityId: pmActivity_id,
				pmLeader
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
