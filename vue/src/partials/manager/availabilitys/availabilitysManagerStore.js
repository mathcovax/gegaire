import {defineStore} from "pinia";
import {duplo} from "../../../taob";

export const availabilitysManagerStore = defineStore(
	"availabilitysManagerStore",
	{
		state(){
			return {
				menuIsOpen: false,
				availability: undefined,
				editAvailabilityDay: undefined,
			};
		},
		getters: {
			
		},
		actions: {
			initAvailabilitysManagerStore(){
				this.menuIsOpen = false;
				this.availability = undefined;
			},

			async openMenu(id){
				if(!id) return;

				this.availability =  await duplo.get(
					"availability/{id}",
					{
						params: {id},
						query: {
							user: true,
							work: true,
							activity: true,
						},
						loader: true
					} 
				).sd();
				
				this.menuIsOpen = true;
			},

			closeMenu(){
				this.menuIsOpen = false;
				this.availability = undefined;
			},

			async openEditAvailabilityMenu(id){
				this.editAvailabilityDay = await duplo.get(
					"availability/{id}",
					{
						params: {id},
						query: {group: true, user: true},
						loader: true,
					}
				).sd();
			},

			async openEmptyEditAvailabilityMenu(user, date){
				if(date.getTime() < Date.now()) return;
				console.log({user, date});
				this.editAvailabilityDay = {user, date};
			},

			closeEditAvailabilityMenu(){
				this.editAvailabilityDay = undefined;
			},

			async postAvailability(am, pm, groupId, note, date, toDate){
				await duplo.post(
					"/user/{userId}/availability",
					{
						am,
						pm,
						groupId, 
						note,
						date,
					},
					{
						params: {userId: this.editAvailabilityDay.user.id},
						query: {toDate},
						loader: true,
					}
				)
				.sd();

				this.closeEditAvailabilityMenu();
			}
		}
	}
);
