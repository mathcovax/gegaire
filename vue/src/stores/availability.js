import {defineStore} from "pinia";
import {duplo, taob} from "../taob";
import {fixedStore} from "./fixed";
import {userStore} from "./user";

export const availabilityStore = defineStore(
	"availability",
	{
		state(){
			return {
				date: new Date(),
				availability: {},
				editDay: false, 
			};
		},
		getters: {
			
		},
		actions: {
			purgeAvailabilityStore(){
				this.date = new Date();
				this.availability = {};
				this.editDay = false;
			},

			async getMonth(my){
				if(this.availability[my] !== undefined) return;
				this.availability[my] = false;
				
				let [month, year] = my.split("-"); 
				let result = await taob.get(`/availability?month=${month}&year=${year}`).sd();
				
				let availabilitys = {};
				for(const availability of result){
					availabilitys[availability.day] = availability;
				} 
				this.availability[my] = availabilitys;
			},

			startEditingDay(toDate){
				this.editDay = toDate;
			},
			stopEditingDay(){
				this.editDay = false;
			},
			async postDay(am, pm, groupId, note){
				const availability = await duplo.post(
					"/user/{userId}/availability",
					{
						am,
						pm,
						groupId, 
						note,
						date: `${this.editDay.getFullYear()}-${this.editDay.getMonth() + 1}-${this.editDay.getDate()}`,
					},
					{
						params: {
							userId: userStore().id
						},
						loader: true,
					}
				)
				.sd();

				this.availability[this.editDay.getMonth() + 1 + "-" + this.editDay.getFullYear()][this.editDay.getDate()] = availability;
			}
		}
	}
);
