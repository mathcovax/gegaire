import {register, registerOptions} from "anotherback/cli";

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
			schema: {
				query: {
					month: "availability::month",
					year: "availability::year",
				}
			},
			checkers: ["user.existById<self"]
		})
		(async function(){
			let result = await this.method(
				"availability.get", 
				this.pass("user_id"),
				undefined,
				this.pass("month"),
				this.pass("year"),
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);

			this.sender("ok", "availability.getFromMY", result);
		});

		reg({
			path: "/",
			method: "POST",
			schema: {
				body: {
					day: "availability::day",
					month: "availability::month",
					year: "availability::year",
					am: "availability::am",
					pm: "availability::pm",
					note: "availability::note",
				}
			},
			checkers: [
				"user.existById<self",
				"group.existById<body",
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
