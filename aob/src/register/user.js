import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "user",
		access: "user.accessToken",
	}
);

export default register(
	function(reg, hook){
		reg({
			path: "/",
			method: "GET",
			checkers: ["user.existById<self"],
		})
		(async function(req, res){
			let result = await this.method("user.getById", this.pass("user_id"), false);

			this.sender("ok", "user.getSelf", result);
		});

		reg({
			path: "/:id",
			method: "GET",
			access: "admin.accessToken",
			ignoreRegisterAccess: true,
			checkers: ["user.existById<params"]
		})
		(async function(req, res){
			let result = await this.method("user.getById", this.pass("user_id"), true);

			this.sender("ok", "user.getById", result);
		});

		reg({
			path: "/users",
			ignoreRegisterPrefix: true,
			method: "GET",
			access: "adminOrManagerAccessToken",
			ignoreRegisterAccess: true,
			checkers: [
				"skip<query",
				"take<query",
				"user.searchName<query"
			]
		})
		(async function(){
			let result = await this.method(
				"user.get",
				this.pass("skip"),
				this.pass("take"),
				this.pass("search_name")
			);

			this.sender("ok", "user.get", result);
		});

		reg({
			path: "/",
			method: "POST",
			checkers: [
				"link.existById<body",
				"user.name<body",
				"user.alreadyUseName<pass",
				"user.tel<body",
				"user.alreadyUseTel<pass",
				"user.password<body",
				"address<body",
			],
			ignoreRegisterAccess: true
		})
		(async function(){
			let {email, groups} = await this.method(
				"link.getById",
				this.pass("link_id")
			);
			
			await this.method(
				"link.delete",
				this.pass("link_id")
			);

			await this.method(
				"user.create",
				email,
				this.pass("user_name"),
				this.pass("user_tel"),
				this.pass("user_password"),
				groups,
				this.pass("address"),
			);

			this.sender("no_content", "user.create");
		});

		reg({
			path: "/:id",
			method: "PUT",
			access: "admin.accessToken",
			ignoreRegisterAccess: true,
			checkers: [
				"user.existById<params",
				"email<body",
				"user.alreadyUseEmail<pass",
				"user.name<body",
				"user.alreadyUseName<pass",
				"user.tel<body",
				"user.alreadyUseTel<pass",
				"group.existById::multi<body",
				"user.isManager<body",
				"address<body",
				"proCard<body"
			]
		})
		(async function(){
			await this.method(
				"user.edit",
				this.pass("user_id"),
				this.pass("user_name"),
				this.pass("email"),
				this.pass("user_tel"),
				this.pass("user_isManager"),
				this.pass("groups_id"),
				this.pass("address"),
				this.pass("proCard")
			);

			this.sender("no_content", "user.put");
		});

		reg({
			path: "/:id",
			method: "DELETE",
			access: "admin.accessToken",
			ignoreRegisterAccess: true,
			checkers: [
				"user.existById<params",
				"user.isNotAdmin<pass",
			]
		})
		(async function(){
			await this.method("user.delete", this.pass("user_id"));

			this.sender("no_content", "user.delete");
		});

		reg({
			path: "/users/availability",
			ignoreRegisterPrefix: true,
			method: "GET",
			access: "manager.accessToken",
			ignoreRegisterAccess: true,
			schema: {
				query: {
					"user_id?": "user::id",
					"day?": "availability::day",
					"month?": "availability::month",
					"year?": "availability::year",
					"am?": "availability::am",
					"pm?": "availability::pm",
					"skip?": "type::number",
					"take?": "type::number",
					"searchName?": "type::string"
				}
			}
		})
		(async function(){
			let result = await this.method(
				"user.get::withAvailability",
				this.pass("user_id"),
				this.pass("day"),
				this.pass("month"),
				this.pass("year"),
				this.pass("am"),
				this.pass("pm"),
				this.pass("searchName"),
				this.pass("skip"),
				this.pass("take")
			);

			this.sender("ok", "availability.get", result);
		});
	}
);
