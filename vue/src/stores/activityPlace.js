import {defineStore} from "pinia";
import {taob} from "../taob";

export const activityPlaceStore = defineStore(
	"activityPlace",
	{
		state(){
			return {
				activity: false,

				selectedGuide: false,

				amGuide: false,
				pmGuide: false,
			};
		},
		getters: {
			
		},
		actions: {
			initActivityPlaceStore(activity){
				this.amGuide = activity.amGuide;
				delete activity.amGuide;
				this.pmGuide = activity.pmGuide;
				delete activity.pmGuide;

				this.activity = activity;
			},
			
			selectGuide(guide){
				this.selectedGuide = guide;
			},

			unSelectGuide(){
				this.selectedGuide = false;
			}
		}
	}
);
