<template>
	<div
	class="w-full grid grid-cols-12 h-[22px] hover:bg-[rgba(0,0,0,0.12)]"
	@click="selectGuide(guide)"
	>
		<div class="col-span-6 flex items-center">
			<p class="overflow-hidden whitespace-nowrap text-ellipsis">
				{{ guide.name }}
			</p>
		</div>

		<div
		v-if="availability !== null"
		class="col-span-3 flex justify-end"
		>
			<div
			:class="{
				'bg-[var(--green1)]': availability.note !== '',
				'bg-[var(--red)]': availability.note === ''
			}"
			class="uppercase text-[white] text-[12px] px-[5px] rounded-full flex justify-center items-center w-[40px]"
			>
				{{ availability.note === ""? $tr("btn.no") : $tr("btn.yes") }}
			</div>
		</div>
		
		<div
		v-if="availability !== null"
		class="col-span-3 flex justify-end"
		>
			<div class="h-full aspect-square relative rounded-[4px] overflow-hidden p-[5px] ">
				<div
				:class="{
					'bg-[green]': availability.am === true,
					'bg-[red]': availability.am === false,
					'bg-[orange]': availability.am === null,
				}"
				class="absolute top-0 left-0 w-full h-[50%]"
				/>

				<div
				:class="{
					'bg-[green]': availability.pm === true,
					'bg-[red]': availability.pm === false,
					'bg-[orange]': availability.pm === null,
				}"
				class="absolute bottom-0 left-0 w-full h-[50%]"
				/>

				<div class="relative h-full w-full bg-[white] rounded-[4px] flex">
					<div
					v-if="availability.work !== null && availability.work.amActivity !== null"
					:class="{
						'bg-[green]': availability.work?.amActivity?.id === activity.id,
						'bg-[red]': availability.work?.amActivity?.id !== activity.id,
					}"
					class="absolute top-0 left-0 w-full h-[50%]"
					/>

					<div
					v-if="availability.work !== null && availability.work.pmActivity !== null"
					:class="{
						'bg-[green]': availability.work?.pmActivity?.id === activity.id,
						'bg-[red]': availability.work?.pmActivity?.id !== activity.id,
					}"
					class="absolute bottom-0 left-0 w-full h-[50%]"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {activityPlaceStore} from "../../../stores/activityPlace";

export default defineComponent({
	props: {
		guide: {

		}
	},
	data(){
		return {
			availability: this.guide.availability[0]
		};
	},
	computed: {
		...mapState(activityPlaceStore, ["activity"])	
	},
	methods: {
		...mapActions(activityPlaceStore, ["selectGuide"])
	}
});
</script>


<style>

</style>
