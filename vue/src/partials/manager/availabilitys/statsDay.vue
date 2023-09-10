<template>
	<div
	class="fixed h-full w-full bg-[rgba(0,0,0,0.25)] flex justify-center items-center top-0 left-0 z-10"
	@click="$emit('close')"
	>
		<Frame
		border="4px"
		class="lg:w-auto w-[90%]"
		classs="flex flex-col p-[10px] gap-[10px]"
		@click="$event.stopPropagation()"
		>
			<h2 class="text-center">
				{{ date }}
			</h2>

			<div class="flex justify-around">
				<div class="flex flex-col items-center gap-[10px]">
					<div class="w-[50px] h-[40px] flex">
						<div class="bg-[green] grow"/>

						<div class="w-[1px] h-full bg-[black]"/>

						<div class="bg-[green] grow"/>
					</div>

					<div class="w-[50px] h-[40px] flex">
						<div class="bg-[green] grow"/>

						<div class="w-[1px] h-full bg-[black]"/>

						<div class="bg-[red] grow"/>
					</div>

					<div class="w-[50px] h-[40px] flex">
						<div class="bg-[red] grow"/>

						<div class="w-[1px] h-full bg-[black]"/>

						<div class="bg-[green] grow"/>
					</div>

					<div class="w-[50px] h-[40px] flex">
						<div class="bg-[orange] grow"/>

						<div class="w-[1px] h-full bg-[black]"/>

						<div class="bg-[orange] grow"/>
					</div>
				</div>

				<div class="flex flex-col items-center gap-[10px]">
					<p class="h-[40px] flex items-center">
						{{ stats.total }} : {{ stats.totalFree }}
					</p>
					
					<p class="h-[40px] flex items-center">
						{{ stats.totalAm }} : {{ stats.totalAmFree }}
					</p>

					<p class="h-[40px] flex items-center">
						{{ stats.totalPm }} : {{ stats.totalPmFree }}
					</p>

					<p class="h-[40px] flex items-center">
						{{ stats.totalMaybe }}
					</p>
				</div>
			</div>
		</Frame>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	props: ["stats"],
	emits: ["close"],
	computed: {
		date(){
			const date = new Date(this.stats.date);

			return this.$tr("/guide/availability.day")[date.getDay()]
				+ " " + date.getDate() 
				+ " " + this.$tr("/guide/availability.month")[date.getMonth()] 
				+ " " + date.getFullYear();
		},
	},
});
</script>

<style>

</style>
