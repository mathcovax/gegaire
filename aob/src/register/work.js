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

		reg({
			path: "/works",
			ignoreRegisterPrefix: true,
			method: "GET",
			access: "manager.accessToken",
			schema: {
				query: {
					date: "work::date",
					user_id: {
						schema: "user::id",
						key: "user_id",
						checkers: ["user.existById<pass"]
					}
				}
			},
		})
		(async function(){
			let fromDate = new Date(this.pass("date"));
			fromDate.setDate(fromDate.getDate() - 30);
			let toDate = new Date(this.pass("date"));
			toDate.setDate(toDate.getDate() + 30);

			let result = await Prisma.work.findMany({
				where: {
					date: {
						gte: fromDate,
						lte: toDate,
					}
				},
				select: {
					amActivityId: true,
					pmActivityId: true,
					date: true,
				}
			});

			this.sender("ok", "work.getMonths", result);
		});
	}
);
