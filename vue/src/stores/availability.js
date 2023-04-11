import {defineStore} from "pinia";
import {taob} from "../taob";
import {fixedStore} from "./fixed";

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
			async postDay(am, pm, group, note){
				let {close} = fixedStore().requestLoader();
				await taob.post(
					"/availability",
					{
						am,
						pm,
						group_id: group, 
						note,

						day: this.editDay.getDate(),
						month: this.editDay.getMonth() + 1,
						year: this.editDay.getFullYear(),
					}
				)
				.s(rep => {
					this.availability[this.editDay.getMonth() + 1 + "-" + this.editDay.getFullYear()][this.editDay.getDate()] = rep;
				})
				.result;
				close();
			}
		}
	}
);
