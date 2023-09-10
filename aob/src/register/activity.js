import {register, registerOptions} from "anotherback/cli";

export const options = registerOptions(
	{
		prefix: "activity",
		access: "manager.accessToken",
	}
);

export default register(
	function(reg, hook){

		// create activity
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
			let activity = await this.method(
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

			let users = await this.method(
				"user.getFromAnyValue::many", 
				{
					isManager: true
				},
				{
					id: true,
					name: true,
					email: true,
				}
			);

			let userCreate = users.find(u => u.id === this.pass("accessTokenValue").id);
			let emails = users.filter(u => u.id !== this.pass("accessTokenValue").id).map(u => u.email);
			
			if(emails.length !== 0) this.method(
				"sendEmail::createActivity",
				emails,
				activity.id,
				this.pass("activity_date").toISOString(),
				userCreate.name
			);

			this.sender("ok", "activity.create", activity);
		});

		reg({
			path: "/:id",
			method: "GET",
			ignoreRegisterAccess: true,
			access: "user.accessToken",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id",
						checkers: ["activity.existe<pass"]
					}
				},
				query: {
					"all?": "type::bool"
				}
			},
			checkers: ["activity.userHasRightShow<pass"],
		})
		(async function(){
			let result = await this.method(
				"activity.get::infoById",
				this.pass("activity_id"),
				this.pass("all") || false
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
				"activity.isPast::not<pass",
				"activity.hour<body",
			]
		})
		(async function(){
			let result = await this.method(
				"activity.edit",
				this.pass("activity_id"),
				this.pass("activity_name"),
				this.pass("address"),
				this.pass("activity_number"),
				this.pass("activity_hourStart"),
				this.pass("activity_hourEnd"),
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

		//(oldVersion) add user to activity
		reg({
			path: "/:id/place",
			method: "PATCH",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id"
					}
				},
				body: {
					user_id: "user::id",
					day: "availability::day",
					month: "availability::month",
					year: "availability::year",

					work_am: "work::am",
					work_pm: "work::pm",
					work_leader: "work::leader"
				}
			},
			checkers: [
				"activity.existe<pass",
				"activity.isPast::not<pass",
				"user.existById<pass",
				"user.isAvailable<pass",
			]
		})
		(async function(){
			await this.method(
				"activity.place",
				this.pass("activity_id"),
				this.pass("user_id"),
				this.pass("availability_id"),
				this.pass("work_am"),
				this.pass("work_pm"),
				this.pass("work_leader"),
			);
			
			this.sender("no_content", "activity.place");
		});

		// remove user from activity 
		reg({
			path: "/:id/place/:uid",
			method: "DELETE",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id"
					},
					user_id: {
						schema: "user::id",
						key: "uid"
					},
				},
			},
			checkers: [
				"activity.existe<pass",
				"user.existById<pass",
				"activity.hasUser<pass",
			]
		})
		(async function(){
			await this.method(
				"activity.place::remove",
				this.pass("activity_id"),
				this.pass("user_id")
			);

			this.sender("no_content", "activity.deletePlace");
		});

		reg({
			path: "activities",
			ignoreRegisterPrefix: true,
			method: "GET",
			schema: {
				query: {
					activity_date: "activity::date"
				}
			}
		})
		(async function(){
			let result = await this.method(
				"activity.get::month",
				this.pass("activity_date")
			);

			this.sender("ok", "activity.get", result);
		});

		// change activity status
		reg({
			path: "/:id/status",
			method: "PATCH",
			schema: {
				params: {
					activity_id: {
						schema: "activity::id",
						key: "id",
						checkers: ["activity.existe<pass"]
					}
				},
				body: {
					activity_status: {
						schema: "activity::status",
						key: "status",
						checkers: ["activity.status::order<pass"],
					}
				}
			}
		})
		(async function(){
			await this.method(
				"activity.edit::status",
				this.pass("activity_id"),
				this.pass("activity_status")
			);
			
			if(this.pass("activity_status") === "showning"){
				let {date, amGuide, pmGuide} = await this.method(
					"activity.get::byId",
					this.pass("activity_id"),
					{
						date: true,
						amGuide: {
							select: {
								user: {
									select: {
										email: true
									}
								}
							}
						},
						pmGuide: {
							select: {
								user: {
									select: {
										email: true
									}
								}
							}
						},
					}
				);
	
				let emails = amGuide.map(v => {
					if(pmGuide.find(vpm => vpm.user.email === v.user.email) !== undefined) pmGuide = pmGuide.filter(vpm => vpm.user.email !== v.user.email);
					return v.user.email;
				});
				
				await this.method(
					"sendEmail::showActivity",
					[...emails, ...pmGuide.map(v => v.user.email)],
					this.pass("activity_id"),
					date.toISOString()
				);
			}

			this.sender("no_content", "activity.status");
		});
	}
);
