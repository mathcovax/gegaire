import {defineStore} from "pinia";
import {taob} from "../taob";

export const activitiesStore = defineStore(
	"activities",
	{
		state(){
			return {
				dateInStore: new Date(),
				work: {},
			};
		},
		getters: {
			
		},
		actions: {
			purgeActivitiesStore(){
				this.dateInStore = new Date();
				this.work = {};
			},

			async getMonth(date){
				let my = date.split("-").reverse().slice(1).join("-");
				
				if(this.work[my] !== undefined) return;
				this.work[my] = false;

				this.work[my] = await taob.get(`work?work_date=${date}`).sd();
			}
		}
	}
);
