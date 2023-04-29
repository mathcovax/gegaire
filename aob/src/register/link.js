import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "",
		access: "",
	}
);

export default register(
	function(reg, hook){
		reg({
			path: "link",
			method: "POST",
			access: "admin.accessToken",
			checkers: [
				"email<body", 
				"link.alreadyUseEmail<pass",
				"user.alreadyUseEmail<pass",
				"group.existById::multi<body",
			]
		})
		(async function(){
			let result = await this.method(
				"link.create",
				this.pass("email"), 
				this.pass("groups_id")
			);


			let resultMail = await this.method(
				"sendEmail::invitation", 
				result.email,
				result.id
			);
			if(resultMail !== undefined){
				await this.method("link.delete", result.id);
				this.sender("failed_dep", "mailer.sendeError", resultMail);
			}

			this.sender("no_content", "link.create");
		});

		reg({
			path: "links",
			method: "GET",
			access: "admin.accessToken",
			checkers: [
				"skip<query",
				"take<query",
				"link.searchEmail<query",
			]
		})
		(async function(){
			let result = await this.method(
				"link.get", 
				this.pass("skip"),
				this.pass("take"),
				this.pass("search_email")
			);

			this.sender("ok", "link.get", result);
		});

		reg({
			path: "link/:id",
			method: "DELETE",
			access: "admin.accessToken",
			checkers: ["link.existById<params"]
		})
		(async function(){
			await this.method(
				"link.delete", 
				this.pass("link_id")
			);

			this.sender("no_content", "link.delete");
		});
	}
);
