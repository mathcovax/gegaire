<template>
	<div class="grid grid-cols-7 gap-[4px]">
		<Day
		v-for="n of 7"
		:key="n-1"
		:week="week"
		:day="n-1"
		class="h-[100px]"
		/>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import Day from "./day.vue";

export default defineComponent({
	name: "Week",
	components: {
		Day
	},
	props: {
		week: {
			default: false
		}
	}
});
</script>


<style>

</style>
