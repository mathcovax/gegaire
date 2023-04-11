import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "group",
		access: "",
	}
);

export default register(
	function(reg, hook){
		reg({
			path: "/",
			method: "GET",
			access: "user.accessToken",
			checkers: [
				"skip<query",
				"take<query",
			]
		})
		(async function(){
			let result = await this.method(
				"group.get",
				this.pass("skip"),
				this.pass("take")
			);

			this.sender("ok", "group.get", result);
		});

		reg({
			path: "/",
			method: "POST",
			access: "admin.accessToken",
			checkers: [
				"group.name<body",
				"group.nameNotUse<pass",
			]
		})
		(async function(){
			await this.method("group.create", this.pass("group_name"));

			this.sender("ok", "group.create");
		});

		reg({
			path: "/:groupId",
			method: "DELETE",
			access: "admin.accessToken",
			checkers: ["group.existById<params"]
		})
		(async function(){
			await this.method("group.delete", this.pass("group_id"));

			this.sender("ok", "group.delete");
		});

		reg({
			path: "/",
			method: "PATCH",
			access: "admin.accessToken",
			checkers: [
				"group.existById<body",
				"group.name<body",
				"group.nameNotUse<pass",
			]
		})
		(async function(){
			await this.method("group.edit", this.pass("group_id"), this.pass("group_name"));

			this.sender("ok", "group.edit");
		});
	}
);
