<template>
	<div
	class="w-full grid grid-cols-12 h-[24px] text-[20px] hover:bg-[rgba(0,0,0,0.12)]"
	@click="selectGuide(guide.id)"
	>
		<p class="col-span-4 overflow-hidden text-ellipsis">
			{{ guide.name }}
		</p>

		<p class="col-span-2 flex justify-end">
			<ico
			v-if="guide.leader === true"
			size="24px"
			>
				close
			</ico>
		</p>

		<div class="col-span-2 flex justify-end">
			<div
			:class="{
				'bg-[var(--green1)]': guide.note,
				'bg-[var(--red)]': !guide.note
			}"
			class="uppercase text-[white] text-[12px] px-[5px] rounded-full flex justify-center items-center w-[40px]"
			>
				{{ !guide.note? $tr("btn.no") : $tr("btn.yes") }}
			</div>
		</div>

		<p class="col-span-2 flex justify-end">
			<ico
			v-if="guide.am === true"
			size="24px"
			>
				close
			</ico>
		</p>

		<p class="col-span-2 flex justify-end">
			<ico
			v-if="guide.pm === true"
			size="24px"
			>
				close
			</ico>
		</p>
	</div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {activityPlaceStore} from "./activityPlacesStore";

export default defineComponent({
	props: {
		guide: {

		}
	},
	data(){
		return {
			
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
