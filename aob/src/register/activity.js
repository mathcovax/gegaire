import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "activity",
		access: "manager.accessToken",
	}
);

export default register(
	function(reg, hook){
		reg({
			path: "/",
			method: "POST",
			checkers: [
				"activity.name<body", 
				"address<mustBody",
				"activity.number<body",
				"activity.date<body",
				"activity.hour<body",
				"group.existById<body",
				"activity.note<body"
			]
		})
		(async function(){
			let result = await this.method(
				"activity.create",
				this.pass("activity_name"),
				this.pass("address"),
				this.pass("activity_number"),
				this.pass("activity_date"),
				this.pass("activity_hourStart"),
				this.pass("activity_hourEnd"),
				this.pass("group_id"),
				this.pass("activity_note"),
			);

			this.sender("ok", "activity.create", result);
		});
	}
);
