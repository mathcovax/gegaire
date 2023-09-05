import {defineStore} from "pinia";
import {duplo} from "../../../taob";

export const availabilitysManagerStore = defineStore(
	"availabilitysManagerStore",
	{
		state(){
			return {
				menuIsOpen: false,
				availability: undefined,
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
						},
						loader: true
					} 
				).sd();
				
				this.menuIsOpen = true;
			},

			closeMenu(){
				this.menuIsOpen = false;
				this.availability = undefined;
			}
		}
	}
);
