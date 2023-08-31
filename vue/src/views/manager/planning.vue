<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center pt-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<Btn
		icon="clipboard-plus-outline"
		@click="$router.push('/manager/activities/newactivity/edit')"
		>
			{{ $trr("btnAddActivity") }}
		</Btn>

		<div
		class="w-full grow overflow-y-auto flex flex-col lg:items-center gap-[10px] p-[10px] pt-0"
		@scroll="scrolled"
		>
			<Month
			class="lg:w-[800px]"
			v-if="dateInStore"
			v-for="m in page"
			:month="m-1"
			/>

			<div class="h-[750px] shrink-0"/>
		</div>
	</main>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import Month from "../../partials/manager/planning/month.vue";
import {planningStore} from "../../stores/planning";

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
		...mapState(planningStore, ["dateInStore"]),
	},
	methods: {
		...mapActions(planningStore, ["purgePlanningStore", "initPlanningStore"]),

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 750)){
				this.page++;
			}
		},
	},
	mounted(){
		this.initPlanningStore();
	},
	unmounted(){
		this.purgePlanningStore();
	}
});
</script>

<style>

</style>
