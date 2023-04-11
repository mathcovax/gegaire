import {method, register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "availability",
		access: "user.accessToken",
	}
);

export default register(
	function(reg, hook){
		reg({
			path: "/",
			method: "GET",
			checkers: [
				"user.existById<self",
				"availability.month<query",
				"availability.year<query",
			]
		})
		(async function(){
			let result = await this.method(
				"availability.getFromMY", 
				this.pass("user_id"),
				this.pass("month"),
				this.pass("year"),
			);

			this.sender("ok", "availability.getFromMY", result);
		});

		reg({
			path: "/",
			method: "POST",
			checkers: [
				"user.existById<self",
				"availability.day<body",
				"availability.month<body",
				"availability.year<body",
				"availability.am<body",
				"availability.pm<body",
				"group.existById<body",
				"availability.note<body",
			]
		})
		(async function(){
			let result = await this.method(
				"availability.post", 
				this.pass("user_id"),
				this.pass("day"),
				this.pass("month"),
				this.pass("year"),
				this.pass("am"),
				this.pass("pm"),
				this.pass("group_id"),
				this.pass("note")
			);

			this.sender("ok", "availability.post", result);
		});
	}
);
