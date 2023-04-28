import {register, registerOptions} from "anotherback/cli";
import {Prisma} from "../import/prisma.js";

export const options = registerOptions(
	{
		prefix: "work",
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
					work_date: "work::date"
				}
			},
			checkers: ["user.existById<self"]
		})
		(async function(){
			let result = await this.method(
				"work.get::fromUserIdByMonth",
				this.pass("user_id"),
				this.pass("work_date"),
			);

			this.sender("ok", "work.getMonth", result);
		});
	}
);
