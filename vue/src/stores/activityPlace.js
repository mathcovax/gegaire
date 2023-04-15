import {defineStore} from "pinia";
import {taob} from "../taob";
import {fixedStore} from "./fixed";

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
			selectedGuides(){
				const guides = [];
				const pmGuide = [...(this.pmGuide || [])];

				if(this.activity === false) return false;

				for(const work of (this.amGuide || [])){
					let pmg = pmGuide.findIndex(v => v.user.id === work.user.id);
					if(pmg !== -1)pmGuide.splice(pmg, 1);

					guides.push({
						name: work.user.name,
						id: work.user.id,
						leader: (
							(
								work.amActivityId === this.activity.id && 
								work.amLeader === true
							) || 
							(
								work.pmActivityId === this.activity.id &&
								work.pmLeader === true
							)
						),
						note: work.availability.note ? true : false,
						am: true,
						pm: pmg !== -1
					});
				}

				for(const work of pmGuide){
					guides.push({
						name: work.user.name,
						id: work.user.id,
						leader: (
							(
								work.amActivityId === this.activity.id && 
								work.amLeader === true
							) || 
							(
								work.pmActivityId === this.activity.id &&
								work.pmLeader === true
							)
						),
						note: work.availability.note ? true : false,
						am: false,
						pm: true
					});
				}

				return guides;
			}
		},
		actions: {
			initActivityPlaceStore(activity){
				this.amGuide = activity.amGuide;
				delete activity.amGuide;
				this.pmGuide = activity.pmGuide;
				delete activity.pmGuide;

				this.activity = activity;
			},

			purgeStore(){
				this.activity = false;
				this.pmGuide = false;
				this.amGuide = false;
			},
			
			async selectGuide(guide){
				if(typeof guide === "number"){
					let {close} = fixedStore().requestLoader();

					let [
						year,
						month, 
						day
					] = this.activity.date.split("T")[0].split("-");

					await taob.get(
						"/users/availability?" +
						"&take=1" +
						`&user_id=${guide}` +
						`&day=${day}` +
						`&month=${month}` +
						`&year=${year}`
					)
					.s(data => guide = data[0])
					.info(() => close())
					.result;
				}

				this.selectedGuide = guide;
			},

			unSelectGuide(){
				this.selectedGuide = false;
			}
		}
	}
);
