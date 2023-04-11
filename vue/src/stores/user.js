import {defineStore} from "pinia";
import {taob} from "../taob";

export const userStore = defineStore(
	"user",
	{
		state(){
			return {
				id: false,
				name: false,
				email: false,
				tel: false,

				groups: false,
				isManager: false,
				isAdmin: false,
			};
		},
		getters: {
			
		},
		actions: {
			async initUserStore(){
				let user = await taob.get("/user").sd();

				if(user === undefined) return;

				this.id = user.id;
				this.name = user.name;
				this.email = user.email;
				this.tel = user.tel;
				this.groups = user.groups;
				this.isManager = user.isManager;
				this.isAdmin = user.isAdmin;
			}
		}
	}
);

taob.setHookInfo("generateAccessToken", () => userStore().initUserStore());

userStore().initUserStore();
