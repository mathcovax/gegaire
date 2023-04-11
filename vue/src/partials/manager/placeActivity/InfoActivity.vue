<template>
	<div
	@click="SET_SHOW_INFO(false)"
	class="absolute w-full h-full top-0 bg-[rgba(0,0,0,0.30)] flex justify-center items-center"
	>
		<Frame
		@click="$event.stopPropagation()"
		v-if="activity !== false"
		border="4px"
		class="w-[90%]"
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
				{{ activity.loc.text }}
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
				{{ activity.hour.from.replace(":", "h") }}
			</p>

			<p class="col-span-4">
				{{ $tr("placeActivity.infoEnd") + " :" }}
			</p>

			<p class="col-span-8 overflow-hidden whitespace-nowrap text-ellipsis">
				{{ activity.hour.to.replace(":", "h") }}
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
				@click="$router.push('/manager/activities/' + activity._id + '/edit')"
				>
					{{ $tr("btn.edit") }}
				</Btn>
			</div>
		</Frame>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
	computed: {
		...mapGetters("managerActivityPlace", ["activity"])
	},
	methods: {
		...mapMutations("managerActivityPlace", ["SET_SHOW_INFO"]),
	}
});
</script>


<style>

</style>
