import {defineStore} from "pinia";
import {duplo, taob} from "../../../taob";
import {fixedStore} from "../../../stores/fixed";

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

			purgeActivityPlaceStore(){
				this.selectedGuide = false;
				this.activity = false;
				this.pmGuide = false;
				this.amGuide = false;
			},
			
			async selectGuide(userId){
				const user = await duplo.get(
					"/users",
					{
						query: {
							userId,
							skip: 0,
							take: 1,
							date: this.activity.date,
							stats: true,
							availability: true,
						},
						loader: true
					}
				).sd();
				
				this.selectedGuide = user[0];
			},

			unSelectGuide(){
				this.selectedGuide = false;
			},

			async setStatus(){
				if(this.activity.status === "waiting") var status = "validated";
				else if(this.activity.status === "validated") var status = "showning";
				else return;
				
				let {close} = fixedStore().requestLoader();
				await taob.patch(
					`/activity/${this.activity.id}/status`,
					{
						status
					}
				)
				.info(() => close())
				.sd();

				this.activity.status = status;
			},
			
			async placeGuide({activityId, userId, workAm, workPm, workLeader}){
				const result = await duplo.patch(
					"/activity/{activityId}/place",
					{
						userId,
						workAm,
						workPm,
						workLeader,
					},
					{
						params: {activityId},
						loader: true,
					}
				).sd();

				this.unSelectGuide();
			},

			findUser({page, searchName, date, am, pm}){
				return duplo.get(
					"/users",
					{
						query: {
							skip: page * 25,
							take: 25,
							searchName,
							date,
							am,
							pm,
							stats: true,
							availability: true,
						},
						loader: true
					}
				).sd();
			}
		},
	}
);
