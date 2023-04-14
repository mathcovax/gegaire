<template>
	<div
	@click="$emit('close')"
	class="absolute w-full h-full top-0 bg-[rgba(0,0,0,0.30)] flex justify-center items-center"
	>
		<Frame
		@click="$event.stopPropagation()"
		border="4px"
		class="w-[90%] lg:w-[350px]"
		classs="p-[10px] grid grid-cols-12 gap-[5px] overflow-hidden"
		>
			<p class="col-span-4">
				{{ $tr("placeActivity.infoName") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.name }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoDate") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.date.split("T")[0].split("-").reverse().join("-") }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoGroup") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.group.name }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoAdresse") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.address.text }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoNumber") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.number }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoStart") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.hourStart.replace(":", "h") }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoEnd") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.hourEnd.replace(":", "h") }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoNote") + " :" }}
			</p>

			<div class="col-span-8 whitespace-pre-wrap">
				<div class="overflow-auto max-h-[150px]">
					{{ activity.note }}
				</div>
			</div>

			<div class="col-span-12 flex justify-center">
				<Btn
				small
				@click="$router.push('/manager/activities/' + activity.id + '/edit')"
				>
					{{ $tr("btn.edit") }}
				</Btn>
			</div>
		</Frame>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {mapState} from "pinia";
import {activityPlaceStore} from "../../../stores/activityPlace";

export default defineComponent({
	computed: {
		...mapState(activityPlaceStore, ["activity"])
	}
});
</script>


<style>

</style>
