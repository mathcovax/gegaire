import {defineStore} from "pinia";
import {duplo, taob} from "../taob";

export const planningStore = defineStore(
	"planning",
	{
		state(){
			return {
				dateInStore: false,
				activities: {},
			};
		},
		getters: {
			
		},
		actions: {
			initPlanningStore(){
				this.dateInStore = new Date();
				this.dateInStore.setDate(1);
			},
			purgePlanningStore(){
				this.dateInStore = false;
				this.activities = {};
			},

			async getMonth(date){
				let my = date.split("-").reverse().slice(1).join("-");
				
				if(this.activities[my] !== undefined) return;
				this.activities[my] = false;

				this.activities[my] = await duplo.get("activities", {query: {date}}).sd();
			}
		}
	}
);
