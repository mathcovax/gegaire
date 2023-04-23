<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center pt-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<div
		class="w-full grow overflow-y-auto flex flex-col lg:items-center gap-[10px] p-[10px] pt-0"
		@scroll="scrolled"
		>
			<Month
			class="lg:w-[800px]"
			v-for="m in page"
			:month="m-1"
			/>
		</div>
	</main>
</template>

<script>
import {mapActions} from "pinia";
import {defineComponent} from "vue";
import Month from "../../partials/guide/activities/month.vue";
import {activitiesStore} from "../../stores/activities";

export default defineComponent({
	components: {
		Month
	},
	data(){
		return {
			page: 3,
		};
	},
	methods: {
		...mapActions(activitiesStore, ["purgeActivitiesStore"]),

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 100)){
				this.page++;
			}
		},
	},
	unmounted(){
		this.purgeActivitiesStore();
	}
});
</script>

<style>

</style>
