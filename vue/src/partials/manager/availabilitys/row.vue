<template>
	<div class="h-[40px] border-b-[black] border-0 border-b-[2px] border-solid flex w-[fit-content] min-w-full">
		<div class="shrink-0 w-[100px] text-ellipsis overflow-hidden h-full flex items-center sticky left-0 bg-[white] z-[1]">
			{{ guide.name }}
		</div>

		<div class="shrink-0 flex">
			<div
			v-for="{date, data} of guide.availabilitys"
			class="flex gap-[2px] bg-[black] px-[2px]"
			>
				<Day
				v-for="day in date.getDate()"
				class="w-[50px]"
				:day="data.find(a => a.day === day)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import Day from "../../manager/availabilitys/day.vue";

export default defineComponent({
	components: {Day},
	props: ["guide"],
});
</script>

<style>

</style>
