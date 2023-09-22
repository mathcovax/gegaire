<template>
	<main class="w-full h-full flex flex-col gap-[10px] items-center justify-center p-[15px]">
		<Frame
		v-if="activity !== false"
		border="4px"
		class="w-full lg:w-[500px]"
		classs="flex flex-col items-center p-[5px] gap-[5px]"
		>
			<h1 class="text-center">
				{{ activity.name }}
			</h1>

			<p class="w-full">
				{{ $tr("label.address") }} : 
				<a
				:href="'https://www.google.com/maps?q=' + activity.address"
				target="_blank"
				>
					{{ activity.address }}
				</a>
			</p>

			<p class="w-full">
				{{ $tr("label.date") }} : <b>{{ activity.date.split("T")[0].split("-").reverse().join("/") }}</b>
			</p>

			<p
			class="w-full"
			v-if="activity.hourStart && activity.hourEnd"
			>
				{{ $tr("label.hour") }} : <b>{{ activity.hourStart.replace(":", "h") }}</b>

				/ <b>{{ activity.hourEnd.replace(":", "h") }}</b>
			</p>

			<p class="w-full">
				{{ $tr("label.pepol") }} : <b>{{ activity.number }}</b>
			</p>

			<div
			class="w-full flex gap-[5px]"
			v-if="activity.note"
			>
				<p class="shrink-0">
					{{ $tr("label.note") }} :
				</p>

				<div class="grow overflow-auto max-h-[150px]">
					<p class="whitespace-pre-wrap">
						{{ activity.note }}
					</p>
				</div>
			</div>

			<Frame
			row
			border="4px"
			class="grow overflow-hidden col-start-2 col-end-12 w-full"
			classs="flex flex-col items-center gap-[5px] overflow-y-auto p-[5px] max-h-[150px]"
			>
				<div class="w-full grid grid-cols-12">
					<p class="col-span-3">
						{{ $tr("placeActivity.columnGuideSelectName") }}
					</p>
					
					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectLeader") }}
					</p>

					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectAM") }}
					</p>

					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectPM") }}
					</p>
				</div>

				<div class="w-full bg-[var(--green1)] h-[2px] rounded-full"/>

				<div class="flex flex-col w-full grow overflow-y-auto gap-[5px]">
					<SelectCard
					v-for="guide of selectedGuides"
					:guide="guide"
					/>
				</div>
			</Frame>

			<Btn
			small
			@click="addToCalendar"
			>
				{{ $tr("viewActivity.btnAddToCalendar") }}
			</Btn>
		</Frame>

		<Btn
		theme="orange"
		@click="back"
		>
			{{ $tr("btn.back") }}
		</Btn>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../stores/fixed";
import {taob} from "../taob";
import SelectCard from "../partials/activity/SelectCard.vue";

export default defineComponent({
	components: {
		SelectCard
	},
	data(){
		return {
			activity: false
		};
	},
	computed: {
		amGuide(){
			return this.activity.amGuide;
		},
		pmGuide(){
			return this.activity.pmGuide;
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
					am: false,
					pm: true
				});
			}

			return guides;
		},
	},
	methods: {
		async init(){
			let {close} = fixedStore().requestLoader();
			await taob.get(`/activity/${this.$route.params.id}?all=true`)
			.s(data => {
				this.activity = data;
			})
			.e(() => this.$router.push("/guide/activities"))
			.info(() => close())
			.result;
		},

		addToCalendar(){
			let dateFrom = new Date(
				this.activity.date.split("T")[0] + 
				(this.activity.hourStart ? "T" + this.activity.hourStart + ":00" : "")
			);
			let dateTo = new Date(
				this.activity.date.split("T")[0] + 
				(this.activity.hourEnd ? "T" + this.activity.hourEnd + ":00" : "")
			);
			
			dateFrom = dateFrom.toISOString().replace(/[-:.]/g, "");
			dateTo = dateTo.toISOString().replace(/[-:.]/g, "");
			
			open(
				"http://www.google.com/calendar/event?action=TEMPLATE" +
				`&dates=${dateFrom}%2F${dateTo}` + 
				`&text=${this.activity.name} - ${this.activity.number} P` + 
				`&location=${this.activity.address}` +
				`&details=${location.href}`
			);
		},

		back(){
			if(window.history.length > 2) this.$router.back();
			else this.$router.push("/guide/availability");
		}
	},
	mounted(){
		this.init();
	}
});
</script>

<style>

</style>
