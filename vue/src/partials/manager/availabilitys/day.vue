<template>
	<div
	class="bg-[white] flex justify-between hover:opacity-[0.8] text-[15px] relative "
	@click="day.id ? openMenu(day.id) : openEmptyEditAvailabilityMenu(userId, new Date(date))"
	>
		<div
		class="w-[24.5px] h-full flex items-center justify-center"
		:class="{
			'bg-[green]': day.am === true,
			'bg-[red]': day.am === false,
			'bg-[orange]': day.am === null,
		}"
		>
			<p v-if="day.work?.amActivityId">
				{{ day.work.amLeader ? "L" : "G" }}
			</p>
		</div>

		<div class="w-[1px] h-full bg-[black]"/>

		<div
		class="w-[24.5px] h-full flex items-center justify-center"
		:class="{
			'bg-[green]': day.pm === true,
			'bg-[red]': day.pm === false,
			'bg-[orange]': day.pm === null,
		}"
		>
			<p v-if="day.work?.pmActivityId">
				{{ day.work.pmLeader ? "L" : "G" }}
			</p>
		</div>

		<span
		v-if="day.note"
		class="absolute top-[2px] right-[2px] bg-[white] h-[8px] w-[8px] rounded-full"
		/>
	</div>
</template>

<script>
import {mapActions} from "pinia";
import {defineComponent} from "vue";  
import {availabilitysManagerStore} from "./availabilitysManagerStore";

export default defineComponent({  
	props: {
		day: {
			default(){
				return {};
			}
		},
		date: {},
		userId: {},
	},
	methods: {
		...mapActions(availabilitysManagerStore, ["openMenu", "openEmptyEditAvailabilityMenu"])
	}
});
</script>

<style>

</style>
