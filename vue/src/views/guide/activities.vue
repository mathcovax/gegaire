<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center pt-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<div
		class="w-full grow overflow-y-auto flex flex-col lg:items-center gap-[10px] p-[10px] pt-0 relative"
		@scroll="scrolled"
		ref="scrollView"
		>
			<Btn
			@click="previousMonth"
			theme="orange"
			class="self-center"
			small
			>
				{{ $tr("/manager/planning.btnSeeMonthBefore") }}
			</Btn>

			<Month
			class="lg:w-[800px]"
			v-if="dateInStore"
			v-for="m in page"
			:month="m-1"
			/>

			<div
			class="h-[750px] shrink-0"
			v-if="this.page < 8"
			/>
		</div>
	</main>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import Month from "../../partials/guide/activities/month.vue";
import {activitiesStore} from "../../stores/activities";

export default defineComponent({
	components: {
		Month
	},
	data(){
		return {
			page: 4,
		};
	},
	computed: {
		...mapState(activitiesStore, ["dateInStore", "countPreviousMonth"])
	},
	methods: {
		...mapActions(activitiesStore, [
			"purgeActivitiesStore", "initPlanningStore", "previousMonth"
		]),

		initDate(date){
			date = new Date(date);

			let months = (date.getFullYear() - this.dateInStore.getFullYear()) * 12;
			months += date.getMonth();
			months -= this.dateInStore.getMonth();
			this.page = months + 4;
		},

		scrolled(e){
			if(
				e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 750) && 
				this.page < (8 + this.countPreviousMonth)
			) this.page++;
		},
	},
	async mounted(){
		this.initPlanningStore();
		if(this.$route.query.date) this.initDate(this.$route.query.date);
	},
	unmounted(){
		this.purgeActivitiesStore();
	}
});
</script>

<style>

</style>
