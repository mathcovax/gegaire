import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(availability_id, user_id, amActivity_id, amLeader, pmActivity_id, pmLeader){
		return await Prisma.work.create({
			data: {
				availabilityId: availability_id,
				userId: user_id,
				
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
