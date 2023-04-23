<template>
	<Frame
	border="4px"
	row
	class="w-full"
	classs="p-[5px] flex gap-[5px] flex-col"
	>
		<div class="flex gap-[5px] items-center">
			<div class="grid grid-cols-12 gap-[5px] grow">
				<h3 class="col-span-12 lg:col-span-5 lg:overflow-hidden lg:text-ellipsis whitespace-nowrap self-center">
					{{ activity.name }}
				</h3>
		
				<h4 class="col-span-12 lg:col-span-3 self-center">
					{{ date }}
				</h4>
		
				<p class="col-span-6 lg:col-span-2 lg:text-center self-center">
					{{ $trr("pepol") }} : <b>{{ activity.number }}</b>
				</p>
		
				<p class="col-span-6 lg:col-span-2 lg:text-center self-center">
					{{ $trr("guides") }} : <b>{{ guideLength }}</b>
				</p>
			</div>
		
			<div class="flex items-start lg:items-center h-full">
				<Btn
				:icon="!isOpen? 'plus' : 'minus'"
				iconPadding="2px"
				iconSize="20px"
				@click="isOpen = !isOpen"
				/>
			</div>
		</div>
		
		<div
		v-if="isOpen"
		class="grid grid-cols-12 gap-[5px]"
		>
			<p class="col-span-12">
				{{ $trr("address") }} : <b>{{ activity.address.text }}</b>
			</p>

			<p class="col-span-12">
				{{ $trr("group") }} : <b>{{ activity.group.name }}</b>
			</p>

			<Frame
			v-if="selectedGuides.length > 0"
			border="4px"
			class="grow overflow-hidden col-start-2 col-end-12"
			classs="flex flex-col items-center gap-[5px] overflow-y-auto p-[5px] max-h-[150px]"
			>
				<div class="w-full grid grid-cols-12">
					<p class="col-span-3">
						{{ $tr("placeActivity.columnGuideSelectName") }}
					</p>
					
					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectLeader") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectNote") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectAM") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectPM") }}
					</p>
				</div>

				<div class="w-full bg-[var(--green1)] h-[2px] rounded-full"/>

				<div class="flex flex-col w-full grow overflow-y-auto">
					<SelectCard
					v-for="guide of selectedGuides"
					:guide="guide"
					/>
				</div>
			</Frame>

			<Btn
			small
			class="col-start-5 col-end-9"
			v-if="isNotPast"
			@click="$router.push('/manager/activities/' + this.activity.id + '/place')"
			>
				{{ $tr("btn.edit") }}
			</Btn>
		</div>
	</Frame>
</template>

<script>
import {defineComponent} from "vue";
import SelectCard from "../planning/SelectCard.vue";

export default defineComponent({
	components: {
		SelectCard
	},
	props: {
		activity: {}
	},
	data(){
		return {
			isOpen: false
		};
	},
	computed: {
		date(){
			let date = new Date(this.activity.date);
			let day = this.$tr("/guide/availability.day")[(date.getDay() - 1) === -1 ? 6 : (date.getDay() - 1)];
			let numDay = this.activity.date.split("T")[0].split("-").reverse()[0];
			return day + " " + numDay;
		},
		guideLength(){
			let guides = [];

			this.activity.amGuide.forEach(v => {
				if(guides.indexOf(v.user.id) === -1) guides.push(v.user.id);
			});
			this.activity.pmGuide.forEach(v => {
				if(guides.indexOf(v.user.id) === -1) guides.push(v.user.id);
			});
			return guides.length;
		},
		selectedGuides(){
			const guides = [];
			const pmGuide = [...(this.activity.pmGuide || [])];

			if(this.activity === false) return false;

			for(const work of (this.activity.amGuide || [])){
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
		},

		isNotPast(){
			if(new Date(this.activity.date).getTime() > Date.now()) return true;
			else return false;
		}
	},
	mounted(){

	}
});
</script>

<style scoped>
h3::first-letter{
	text-transform: uppercase;
}
</style>
