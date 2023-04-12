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
			schema: {
				body: {
					activity_name: "activity::name",
					activity_number: "activity::number",
					"activity_note?": "activity::note",
					address: "address",
				}
			},
			checkers: [
				"activity.date<body",
				"activity.hour<body",
				"group.existById<body"
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

		reg({
			path: "/:id",
			method: "GET",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id"
					}
				}
			},
			checkers: ["activity.existe<pass"]
		})
		(async function(){
			let result = await this.method(
				"activity.get::infoById",
				this.pass("activity_id")
			);

			this.sender("ok", "activity.get", result);
		});

		reg({
			path: "/:id",
			method: "PUT",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id"
					}
				},
				body: {
					activity_name: "activity::name",
					activity_number: "activity::number",
					"activity_note?": "activity::note",
					address: "address",
				}
			},
			checkers: [
				"activity.existe<pass",
				"activity.date<body",
				"activity.hour<body",
				"group.existById<body"
			]
		})
		(async function(){
			let result = await this.method(
				"activity.edit",
				this.pass("activity_id"),
				this.pass("activity_name"),
				this.pass("address"),
				this.pass("activity_number"),
				this.pass("activity_date"),
				this.pass("activity_hourStart"),
				this.pass("activity_hourEnd"),
				this.pass("group_id"),
				this.pass("activity_note"),
			);

			this.sender("ok", "activity.edit", result);
		});

		reg({
			path: "/:id",
			method: "DELETE",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id"
					}
				},
			},
			checkers: ["activity.existe<pass"]
		})
		(async function(){
			await this.method(
				"activity.delete", 
				this.pass("activity_id")
			);

			this.sender("no_content", "activity.delete");
		});
	}
);
