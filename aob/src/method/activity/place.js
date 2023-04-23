import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";

export default method(
	async function(activity_id, user_id, availability_id, work_am, work_pm, leader){
		const availability = await this.method("availability.get::byId", availability_id);
		
		if(availability.work === null) await this.method(
			"work.create",
			availability.id,
			availability.date,
			user_id,
			work_am ? activity_id : undefined,
			work_am ? leader : undefined,
			work_pm ? activity_id : undefined,
			work_pm ? leader : undefined,
		);
		
		else if(work_am === true && work_pm === true) await this.method(
			"work.edit",
			availability.id,
			activity_id,
			leader,
			activity_id,
			leader
		);

		else if(work_am === true && work_pm === false && availability.work.pmActivityId !== activity_id) await this.method(
			"work.edit",
			availability.id,
			activity_id,
			leader,
			undefined,
			undefined
		);

		else if(work_am === false && work_pm === true && availability.work.amActivityId !== activity_id) await this.method(
			"work.edit",
			availability.id,
			undefined,
			undefined,
			activity_id,
			leader
		);

		else if(work_am === true && work_pm === false && availability.work.pmActivityId === activity_id) await this.method(
			"work.edit",
			availability.id,
			activity_id,
			leader,
			null,
			null
		);
		

		else if(work_am === false && work_pm === true && availability.work.amActivityId === activity_id) await this.method(
			"work.edit",
			availability.id,
			null,
			null,
			activity_id,
			leader
		);
	}
);

export const remove = method(
	async function(activity_id, user_id){
		const work = await this.method(
			"work.get",
			{
				userId: user_id,
				OR: [
					{amActivityId: activity_id},
					{pmActivityId: activity_id}
				]
			},
			{
				id: true,
				amActivityId: true,
				pmActivityId: true,
				availabilityId: true
			}
		);

		if(
			(
				work.amActivityId === activity_id && 
				work.pmActivityId === activity_id
			) ||
			(
				work.amActivityId === activity_id &&
				work.pmActivityId === null
			) ||
			(
				work.amActivityId === null &&
				work.pmActivityId === activity_id
			)
		) await this.method("work.delete", work.id,);

		else if(work.amActivityId === activity_id) await this.method(
			"work.edit",
			work.availabilityId,
			null,
			null,
			undefined,
			undefined
		);

		else if(work.pmActivityId === activity_id) await this.method(
			"work.edit",
			work.availabilityId,
			undefined,
			undefined,
			null,
			null
		);

	}
);

// export const other = method(
// 	function(arg){
// 		console.log(arg);
// 		return false;
// 	}
// );
