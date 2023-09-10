import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => undefined
	},
	async function(){
		if(this.pass("work_am") === false && this.pass("work_pm") === false) this.sender("bad_request", "activity.wrong_work_ampm");

		const availability = await this.method(
			"availability.get::byUserId",
			this.pass("user_id"),
			this.pass("day"),
			this.pass("month"),
			this.pass("year")
		);
				
		if(availability === null) this.sender("not_found", "availability.notFound");

		if(this.pass("activity").groupId !== availability.groupId) this.sender("conflict", "activity.wrong_group");

		if(this.pass("work_am") === true){
			if(availability.am !== true) this.sender("conflict", "user.work_am");
			if(
				availability.work !== null && 
				availability.work.amActivityId !== null &&
				availability.work.amActivityId !== this.pass("activity_id")
			) this.sender("conflict", "user.work_am");
		}
		// else if(
		// 	this.pass("work_am") === false && 
		// 	availability.work !== null &&
		// 	availability.work.amActivity !== null &&
		// 	availability.work.amActivity.id !== this.pass("activity_id")
		// ) this.sender("bad_request", "availability.wrongWord_am");

		if(this.pass("work_pm") === true){
			if(availability.pm !== true) this.sender("conflict", "user.work_pm");
			if(
				availability.work !== null && 
				availability.work.pmActivityId !== null &&
				availability.work.pmActivityId !== this.pass("activity_id")
			) this.sender("conflict", "user.work_pm");
		}
		// else if(
		// 	this.pass("work_pm") === false && 
		// 	availability.work !== null &&
		// 	availability.work.pmActivity !== null &&
		// 	availability.work.pmActivity.id !== this.pass("activity_id")
		// ) this.sender("bad_request", "availability.wrongWord_pm");

		this.pass("availability_id", availability.id);
	}
);

// export const other = checker(
// 	{
// 		default: req => ({req})
// 	},
// 	function({req}){
		
// 	}
// );
