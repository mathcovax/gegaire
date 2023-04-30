<template>
	<main class="w-full h-full flex flex-col gap-[10px] items-center justify-center">
		<Frame
		v-if="activity !== false"
		border="4px"
		class="w-[90%] lg:w-[500px]"
		classs="flex flex-col items-center p-[5px] gap-[5px]"
		>
			<h1 class="text-center">
				{{ activity.name }}
			</h1>

			<p class="w-full">
				{{ $tr("label.address") }} : 
				<a
				:href="'https://www.google.com/maps?q=' + activity.address.text"
				target="_blank"
				>
					{{ activity.address.text }}
				</a>
			</p>

			<p class="w-full">
				{{ $tr("label.date") }} : <b>{{ activity.date.split("T")[0].split("-").reverse().join("/") }}</b>
			</p>

			<p class="w-full">
				{{ $tr("label.hour") }} : <b>{{ activity.hourStart.replace(":", "h") }}</b>

				/ <b>{{ activity.hourEnd.replace(":", "h") }}</b>
			</p>

			<p class="w-full">
				{{ $tr("label.pepol") }} : <b>{{ activity.number }}</b>
			</p>

			<div class="w-full flex gap-[5px]">
				<p class="shrink-0">
					{{ $tr("label.note") }} :
				</p>

				<div class="grow overflow-auto max-h-[150px]">
					<p class="whitespace-pre-wrap">
						{{ activity.note }}
					</p>
				</div>
			</div>

			<Btn
			small
			@click="addToCalendar"
			>
				{{ $tr("activity.btnAddToCalendar") }}
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

export default defineComponent({
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
		}
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
				`&location=${this.activity.address.text}` +
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
