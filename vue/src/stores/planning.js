import {defineStore} from "pinia";
import {taob} from "../taob";

export const planningStore = defineStore(
	"planning",
	{
		state(){
			return {
				dateInStore: new Date(),
				activities: {},
			};
		},
		getters: {
			
		},
		actions: {
			purgeActivitiesStore(){
				this.dateInStore = new Date();
				this.activities = {};
			},

			async getMonth(date){
				let my = date.split("-").reverse().slice(1).join("-");
				
				if(this.activities[my] !== undefined) return;
				this.activities[my] = false;

				this.activities[my] = await taob.get(`activities?activity_date=${date}`).sd();
			}
		}
	}
);
