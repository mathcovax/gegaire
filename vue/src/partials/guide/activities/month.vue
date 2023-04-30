<template>
	<section
	class="flex flex-col items-center gap-[10px]"
	>
		<h3 class="sticky top-0 z-[1] bg-[white] w-full text-center">
			{{ this.$tr("/guide/availability.month")[this.date?.getMonth?.() || 0] + " " + this.date?.getFullYear?.() }}
		</h3>
		
		<Loader
		v-if="monthWork === false"
		class="h-[300px]"
		/>

		<p
		v-else-if="monthWork.length === 0"
		class="h-[300px]"
		>
			{{ this.$trr("empty") }}
		</p>

		<Card
		v-else
		v-for="work of monthWork"
		:work="work"
		/>
	</section>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {activitiesStore} from "../../../stores/activities";
import Card from "../../guide/activities/card.vue";

export default defineComponent({
	components: {
		Card
	},
	props: {
		month: {}
	},
	data(){
		return {
			date: false 
		};
	},
	computed: {
		...mapState(activitiesStore, ["dateInStore", "work"]),

		monthWork(){
			if(this.date === false) return false;
			return this.work[this.date.toISOString().split("-").reverse().slice(1).join("-")] || false; 
		},

	},
	methods: {
		...mapActions(activitiesStore, ["getMonth"]),

		init(){

		}
	},
	mounted(){
		let date = new Date(this.dateInStore.toISOString());
		date.setMonth(date.getMonth() + this.month);
		this.date = date;

		this.getMonth(this.date.toISOString().split("T")[0]);
	}
});
</script>

<style scoped>
h3::first-letter{
	text-transform: uppercase;
}
</style>
