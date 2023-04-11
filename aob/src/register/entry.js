import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "entry",
		access: "",
	}
);

export default register(
	function(reg, hook){
		reg({
			method: "GET",
			path: "/",
			access: "entry.login"
		})
		(function(req, res){
			this.sender("no_content");
		});

		reg({
			method: "GET",
			path: "/guide*",
			access: "entry.guide"
		})
		(function(req, res){
			this.sender("no_content");
		});

		reg({
			method: "GET",
			path: "/manager*",
			access: "entry.manager"
		})
		(function(req, res){
			this.sender("no_content");
		});

		reg({
			method: "GET",
			path: "/admin*",
			access: "entry.admin"
		})
		(function(req, res){
			this.sender("no_content");
		});

		reg({
			method: "GET",
			path: "/invit/:id",
			access: "entry.invit",
			checkers: ["link.existById<params"]
		})
		(function(req, res){
			this.sender("no_content");
		});
	}
);
