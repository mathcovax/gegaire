<template>
	<div
	@click="SET_SELECT_GUIDE(guide)"
	class="w-full grid grid-cols-12 h-[22px] hover:bg-[rgba(0,0,0,0.12)]"
	>
		<div class="col-span-6 flex items-center">
			<p class="overflow-hidden whitespace-nowrap text-ellipsis">
				{{ guide.name }}
			</p>
		</div>

		<div
		v-if="guide.availability !== undefined"
		class="col-span-3 flex justify-end"
		>
			<div
			:class="{
				'bg-[var(--green1)]': guide.availability.note !== '',
				'bg-[var(--red)]': guide.availability.note === ''
			}"
			class="uppercase text-[white] text-[12px] px-[5px] rounded-full flex justify-center items-center w-[40px]"
			>
				{{ guide.availability.note === ""? $tr("btn.no") : $tr("btn.yes") }}
			</div>
		</div>
		
		<div
		v-if="guide.availability !== undefined"
		class="col-span-3 flex justify-end"
		>
			<div class="h-full aspect-square relative rounded-[4px] overflow-hidden p-[5px] ">
				<div
				:class="{
					'bg-[green]': guide.availability.am === true,
					'bg-[red]': guide.availability.am === false,
					'bg-[orange]': guide.availability.am === null,
				}"
				class="absolute top-0 left-0 w-full h-[50%]"
				/>

				<div
				:class="{
					'bg-[green]': guide.availability.pm === true,
					'bg-[red]': guide.availability.pm === false,
					'bg-[orange]': guide.availability.pm === null,
				}"
				class="absolute bottom-0 left-0 w-full h-[50%]"
				/>

				<div class="relative h-full w-full bg-[white] rounded-[4px] flex">
					<div
					v-if="guide.availability.work.am !== false"
					:class="{
						'bg-[green]': guide.availability.work.am === activity._id,
						'bg-[red]': guide.availability.work.am !== activity._id,
					}"
					class="absolute top-0 left-0 w-full h-[50%]"
					/>

					<div
					v-if="guide.availability.work.pm !== false"
					:class="{
						'bg-[green]': guide.availability.work.pm === activity._id,
						'bg-[red]': guide.availability.work.pm !== activity._id,
					}"
					class="absolute bottom-0 left-0 w-full h-[50%]"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
	props: {
		guide: {

		}
	},
	computed: {
		...mapGetters("managerActivityPlace", ["activity"]),
	},
	methods: {
		...mapMutations("managerActivityPlace", ["SET_SELECT_GUIDE"])
	}
});
</script>


<style>

</style>
