import {defineStore} from "pinia";
import {duplo, taob} from "../taob";

export const userStore = defineStore(
	"user",
	{
		state(){
			return {
				id: false,
				name: false,
				email: false,
				tel: false,
				address: false,

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
				this.address = user.address;
			},

			disconnect(){
				duplo.get("/user/disconnect", {loader: true}).s(() => location.reload());
			}
		}
	}
);

taob.addHookInfo("generateAccessToken", () => userStore().initUserStore());

taob.addHookInfo("user.edit", () => userStore().initUserStore());

userStore().initUserStore();
