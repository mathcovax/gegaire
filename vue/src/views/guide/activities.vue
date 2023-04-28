<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center pt-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<div
		class="w-full grow overflow-y-auto flex flex-col lg:items-center gap-[10px] p-[10px] pt-0 relative"
		@scroll="scrolled"
		ref="scrollView"
		>
			<Month
			class="lg:w-[800px]"
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
		...mapState(activitiesStore, ["dateInStore"])
	},
	methods: {
		...mapActions(activitiesStore, ["purgeActivitiesStore"]),

		initDate(date){
			date = new Date(date);
			
			let months = (date.getFullYear() - this.dateInStore.getFullYear()) * 12;
			months += date.getMonth();
			months -= this.dateInStore.getMonth();
			this.page = months + 4;

			setTimeout(() => {
				let id = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
				let top = document.getElementById(id).offsetTop - 30;
				this.$refs.scrollView.scrollTo({top});
			}, 500);
		},

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 750) && this.page < 8){
				this.page++;
			}
		},
	},
	async mounted(){
		if(this.$route.query.date){
			this.initDate(this.$route.query.date);
			this.$router.replace({query: null});
		}
	},
	unmounted(){
		this.purgeActivitiesStore();
	}
});
</script>

<style>

</style>
