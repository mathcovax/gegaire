<template>
	<main class="w-full h-full flex flex-col gap-[10px] items-center p-[10px]">
		<div class="flex items-center gap-[5px] justify-between w-full">
			<h3 class="text-center">
				{{ $tr("placeActivity.title") }}
			</h3>

			<Btn
			small
			@click="SET_SHOW_INFO(true)"
			>
				{{ $tr("btn.info") }}
			</Btn>
		</div>

		<div class="w-full grow overflow-hidden flex flex-col gap-[10px]">
			<Frame
			border="4px"
			class="h-[70%]"
			classs="p-[5px] gap-[5px] flex flex-col items-center"
			>
				<div class="flex gap-[5px] items-center mt-[5px]">
					<TextInput
					:label="$tr('placeActivity.searchInput')"
					v-model="sv"
					/>

					<div class="flex gap-[5px]">
						<AvailableBtn
						class="h-[30px]"
						@click="setAMPM(true, true)"
						:am="true"
						:pm="true"
						:check="am === true && pm === true"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="setAMPM(true, false)"
						:am="true"
						:pm="false"
						:check="am === true && pm === false"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="setAMPM(false, true)"
						:am="false"
						:pm="true"
						:check="am === false && pm === true"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="setAMPM(false, false)"
						:am="false"
						:pm="false"
						:check="am === false && pm === false"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="setAMPM(null, null)"
						:am="null"
						:pm="null"
						:check="am === null && pm === null"
						/>
					</div>
				</div>

				<div class="w-full grid grid-cols-12">
					<p class="col-span-6">
						{{ $tr("placeActivity.columnGuideName") }}
					</p>

					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideNote") }}
					</p>

					<p class="col-span-3 flex justify-end">
						{{ $tr("placeActivity.columnGuideAvailable") }}
					</p>
				</div>

				<div class="w-full bg-[var(--green1)] h-[2px] rounded-full"/>

				<div class="flex flex-col w-full grow overflow-y-auto gap-[5px]">
					<Loader
					class="h-full"
					v-if="guides === false"
					/>

					<Card
					v-else
					v-for="guide of guides"
					:key="guide._id"
					:guide="guide"
					class="w-full"
					/>
				</div>
			</Frame>

			<Frame
			border="4px"
			class="grow overflow-hidden"
			classs="flex flex-col items-center gap-[5px] overflow-y-auto p-[5px]"
			>
				<div class="w-full grid grid-cols-12">
					<p class="col-span-4">
						{{ $tr("placeActivity.columnGuideSelectName") }}
					</p>
					
					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectLeader") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectNote") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectAM") }}
					</p>

					<p class="col-span-2 flex justify-end">
						{{ $tr("placeActivity.columnGuideSelectPM") }}
					</p>
				</div>

				<div class="w-full bg-[var(--green1)] h-[2px] rounded-full"/>

				<div class="flex flex-col w-full grow overflow-y-auto">
					l
				</div>
			</Frame>
		</div>

		<InfoActivity v-if="showInfo === true"/>

		<!-- <PlaceGuide v-if="selectGuide !== false"/> -->
	</main>
</template>

<script>
import {defineComponent} from "vue";
import AvailableBtn from "@/components/AvailableBtn.vue";
import Card from "@/partials/manager/placeActivity/Card.vue";
import InfoActivity from "@/partials/manager/placeActivity/InfoActivity.vue";
import PlaceGuide from "@/partials/manager/placeActivity/PlaceGuide.vue";

export default defineComponent({
	components: {
		AvailableBtn,
		Card,
		InfoActivity,
		PlaceGuide,
	},
	data(){
		return {

		};
	},
	computed: {

	},
	methods: {

	},
	mounted(){

	},
	unmounted(){

	}

});
</script>


<style>

</style>
