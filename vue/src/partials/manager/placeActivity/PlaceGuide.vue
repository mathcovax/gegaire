<template>
	<div
	@click="unSelectGuide(false)"
	class="absolute w-full h-full top-0 bg-[rgba(0,0,0,0.30)] flex justify-center items-center"
	>
		<Frame
		@click="$event.stopPropagation()"
		border="4px"
		class="w-[90%] lg:w-[400px] max-h-[80%]"
		classs="p-[10px]"
		>
			<div class="w-full h-full flex flex-col gap-[10px] items-center">
				<div class="flex justify-between w-full">
					<h3>{{ guide.name }}</h3>

					<div class="flex gap-[5px]">
						<div class="flex flex-col justify-between">
							<p v-if="availability.am === true">
								{{ work.amActivity === null? $tr("placeActivity.placeAvailable") : work.amActivity.name }}
							</p>

							<p v-else>
								{{ $tr("placeActivity.placeUnAvailable") }}
							</p>

							<p v-if="availability.pm === true">
								{{ work.pmActivity === null? $tr("placeActivity.placeAvailable") : work.pmActivity.name }}
							</p>

							<p v-else>
								{{ $tr("placeActivity.placeUnAvailable") }}
							</p>
						</div>

						<div>
							<div class="h-[40px] w-[20px] relative rounded-[4px] overflow-hidden p-[5px] ">
								<div
								:class="{
									'bg-[green]': availability.am === true,
									'bg-[red]': availability.am === false,
									'bg-[orange]': availability.am === null,
								}"
								class="absolute top-0 left-0 w-full h-[50%]"
								/>

								<div
								:class="{
									'bg-[green]': availability.pm === true,
									'bg-[red]': availability.pm === false,
									'bg-[orange]': availability.pm === null,
								}"
								class="absolute bottom-0 left-0 w-full h-[50%]"
								/>

								<div class="relative h-full w-full bg-[white] rounded-[4px] flex">
									<div
									v-if="work.amActivity !== null"
									:class="{
										'bg-[green]': work.amActivity?.id === activity.id,
										'bg-[red]': work.amActivity?.id !== activity.id,
									}"
									class="absolute top-0 left-0 w-full h-[50%]"
									/>

									<div
									v-if="work.pmActivity !== null"
									:class="{
										'bg-[green]': work.pmActivity?.id === activity.id,
										'bg-[red]': work.pmActivity?.id !== activity.id,
									}"
									class="absolute bottom-0 left-0 w-full h-[50%]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
				v-if="availability.note !== ''"
				class="flex w-full gap-[5px]"
				>
					<p class="whitespace-nowrap">
						{{ $tr("placeActivity.placeNote") }} :
					</p>

					<p class="grow overflow-y-auto max-h-[150px] whitespace-pre">
						{{ availability.note }}
					</p>
				</div>

				<div class="flex items-center w-full justify-between">
					<div
					class="flex gap-[5px]"
					:class="{'invisible': !showLeaderCheckbox}"
					>
						<p>Leader :</p>

						<input
						type="checkbox"
						v-model="leader"
						/>
					</div>
					
					<div class="flex gap-[10px] justify-center">
						<AvailableBtn
						class="h-[30px]"
						:class="{'invisible': !(showAMCheckbox && showPMCheckbox)}"
						@click="setAMPM(true, true)"
						:am="true"
						:pm="true"
						:check="am === true && pm === true"
						/>

						<AvailableBtn
						:class="{'invisible': !showAMCheckbox}"
						class="h-[30px]"
						@click="setAMPM(true, false)"
						:am="true"
						:pm="null"
						:check="am === true && pm === false"
						/>

						<AvailableBtn
						:class="{'invisible': !showPMCheckbox}"
						class="h-[30px]"
						@click="setAMPM(false, true)"
						:am="null"
						:pm="true"
						:check="am === false && pm === true"
						/>
					</div>
				</div>

				<p>{{ $tr("placeActivity.placeWorkedBefore") }} : {{ countWork?.before }}</p>

				<p>{{ $tr("placeActivity.placeWorkedAfter") }} : {{ countWork?.after }}</p>

				<Btn
				v-if="showLeaderCheckbox"
				@click="patch"
				:disabled="am === undefined || pm === undefined"
				>
					{{ $tr("btn.validate") }}
				</Btn>

				<Btn
				v-if="work.amActivity?.id === activity.id || work.pmActivity?.id === activity.id"
				theme="red"
				@click="remove"
				:popup="{
					title: $tr('placeActivity.popupTitleRemove'),
					subTitle: $tr('placeActivity.popupSubTitleRemove')
				}"
				>
					{{ $tr("btn.remove") }}
				</Btn>
			</div>
		</Frame>
	</div>
</template>

<script>

import {defineComponent} from "vue";
import AvailableBtn from "@/components/AvailableBtn.vue";
import {mapActions, mapState} from "pinia";
import {activityPlaceStore} from "../../../stores/activityPlace";
import {taob} from "../../../taob";
import {fixedStore} from "../../../stores/fixed";

export default defineComponent({
	components: {
		AvailableBtn
	},
	data(){
		return {
			guide: false,
			availability: false,
			work: false,
			
			am: undefined,
			pm: undefined,
			leader: false,

			workedDayBefore: false,
			workedDayAfter: false,
			
			isInActivity: false,
		};
	},
	computed: {
		...mapState(activityPlaceStore, [
			"activity", "selectedGuide", "amGuide", "pmGuide"
		]),

		showLeaderCheckbox(){
			if(this.availability.am !== true && this.availability.pm !== true) return false;
			else if(
				this.work.amActivity !== null && 
				this.work.amActivity.id !== this.activity.id &&
				this.work.pmActivity !== null && 
				this.work.pmActivity.id !== this.activity.id
			) return false;

			else return true;
		}, 

		showAMCheckbox(){
			if(this.availability.am !== true) return false;
			else if(
				this.work.amActivity !== null && 
				this.work.amActivity.id !== this.activity.id
			) return false;

			else return true;
		},

		showPMCheckbox(){
			if(this.availability.pm !== true) return false;
			else if(
				this.work.pmActivity !== null && 
				this.work.pmActivity.id !== this.activity.id
			) return false;

			else return true;
		},

		countWork(){
			let count = {...this.guide.countWork};
			if(this.amGuide.find(v => v.user.id === this.guide.id) !== undefined) count.before -= 0.5;
			if(this.pmGuide.find(v => v.user.id === this.guide.id) !== undefined) count.before -= 0.5;
			return count;
		},
	},
	methods: {
		...mapActions(activityPlaceStore, ["unSelectGuide", "purgeStore"]),

		setAMPM(am, pm){
			if(this.am === am && this.pm === pm){
				this.am = undefined;
				this.pm = undefined;
			}
			else {
				this.am = am;
				this.pm = pm;
			}
		},

		async patch(){
			let {close} = fixedStore().requestLoader();

			let [
				year,
				month, 
				day
			] = this.activity.date.split("T")[0].split("-").map(v => parseInt(v));

			await taob.patch(
				`/activity/${this.activity.id}/place`,
				{
					user_id: this.guide.id,
					day,
					month,
					year,

					work_am: this.am,
					work_pm: this.pm,
					work_leader: this.leader,
				}
			)
			.s(() => {
				this.purgeStore();
				this.$parent.init();
				this.unSelectGuide();
			})
			.result;

			close();
		},

		async remove(){
			let {close} = fixedStore().requestLoader();

			await taob.delete(`/activity/${this.activity.id}/place/${this.guide.id}`)
			.s(() => {
				this.$parent.init();
				this.unSelectGuide();
			})
			.result;

			close();
		},
	},
	mounted(){
		this.guide = this.selectedGuide;
		this.availability = this.selectedGuide.availability[0] || {note: "", work: {pmActivity: null, amActivity: null}};
		this.work = this.selectedGuide.availability?.[0]?.work || {amActivity: null, pmActivity: null};

		if(this.work.amActivity?.id === this.activity.id && this.work.pmActivity?.id === this.activity.id){
			this.am = true;
			this.pm = true;
		}
		else if(this.work.amActivity?.id === this.activity.id){
			this.am = true;
			this.pm = false;
		}
		else if(this.work.pmActivity?.id === this.activity.id){
			this.am = false;
			this.pm = true;
		}
		else {
			this.am = undefined;
			this.pm = undefined;
		}

		if(
			(
				this.work.amLeader === true && 
				this.work.amActivity?.id === this.activity.id
		 	) || 
			(
				this.work.pmLeader === true &&
				this.work.pmActivity?.id === this.activity.id
			)
		) this.leader = true;
		else this.leader = false;
	}
});
</script>


<style>

</style>
