<template>
	<main class="w-full h-full flex flex-col gap-[10px] items-center p-[10px]">
		<div class="flex items-center gap-[5px] justify-between w-full">
			<h3 class="text-center">
				{{ $tr("placeActivity.title") }}
			</h3>

			<Btn
			small
			@click="showInfo = true"
			>
				{{ $tr("btn.info") }}
			</Btn>
		</div>

		<div class="w-full grow overflow-hidden flex flex-col gap-[10px]">
			<Frame
			border="4px"
			class="h-[70%] shrink-0"
			classs="p-[5px] gap-[5px] flex flex-col items-center"
			>
				<div class="flex gap-[5px] items-center mt-[5px]">
					<TextInput
					:label="$tr('placeActivity.searchInput')"
					v-model="searchName"
					/>

					<div class="flex gap-[5px]">
						<AvailableBtn
						class="h-[30px] w-[30px]"
						@click="setAMPM(true, true)"
						:am="true"
						:pm="true"
						:check="am === true && pm === true"
						/>

						<AvailableBtn
						class="h-[30px] w-[30px]"
						@click="setAMPM(true, false)"
						:am="true"
						:pm="false"
						:check="am === true && pm === false"
						/>

						<AvailableBtn
						class="h-[30px] w-[30px]"
						@click="setAMPM(false, true)"
						:am="false"
						:pm="true"
						:check="am === false && pm === true"
						/>

						<AvailableBtn
						class="h-[30px] w-[30px]"
						@click="setAMPM(false, false)"
						:am="false"
						:pm="false"
						:check="am === false && pm === false"
						/>

						<AvailableBtn
						class="h-[30px] w-[30px]"
						@click="setAMPM(null, null)"
						:am="null"
						:pm="null"
						:check="am === null && pm === null"
						/>
					</div>
				</div>

				<div
				class="flex flex-col w-full grow overflow-y-auto gap-[5px]"
				@scroll="scrolled"
				>
					<div class="w-full sticky top-0 z-[1]">
						<div class="w-full grid grid-cols-11 bg-[white]">
							<p class="col-span-3">
								{{ $tr("placeActivity.columnGuideName") }}
							</p>

							<p class="col-span-2 flex justify-end">
								{{ $tr("placeActivity.columnGuideRatio") }}
							</p>

							<p class="col-span-2 flex justify-end">
								{{ $tr("placeActivity.columnGuideWork") }}
							</p>

							<p class="col-span-2 flex justify-end">
								{{ $tr("placeActivity.columnGuideNote") }}
							</p>

							<p class="col-span-2 flex justify-end">
								{{ $tr("placeActivity.columnGuideAvailable") }}
							</p>
						</div>

						<div class="w-full bg-[var(--green1)] h-[2px] shrink-0 rounded-full"/>
					</div>
					
				
					<Loader
					class="h-full"
					v-if="guides === false"
					/>

					<Card
					v-else
					v-for="guide of guides"
					:key="guide.id"
					:guide="guide"
					class="w-full shrink-0"
					/>

					<Loader
					size="50px"
					v-if="isFetch === true && guides !== false"
					/>
				</div>
			</Frame>

			<Frame
			border="4px"
			class="grow overflow-hidden"
			classs="flex flex-col items-center gap-[5px] overflow-y-auto p-[5px]"
			>
				<div class="flex flex-col w-full grow overflow-y-auto gap-[5px]">
					<div class="w-full sticky top-0 z-[1]">
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
					</div>

					<Loader
					class="h-full"
					size="75px"
					v-if="selectedGuides === false"
					/>

					<SelectCard
					v-else
					v-for="guide of selectedGuides"
					:guide="guide"
					/>
				</div>
			</Frame>
		</div>

		<InfoActivity
		v-if="showInfo === true"
		@close="showInfo = false"
		class="z-[1]"
		/>

		<PlaceGuide
		v-if="selectedGuide !== false"
		class="z-[1]"
		/>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import AvailableBtn from "@/components/AvailableBtn.vue";
import Card from "@/partials/manager/placeActivity/Card.vue";
import InfoActivity from "../../partials/manager/placeActivity/InfoActivity.vue";
import PlaceGuide from "@/partials/manager/placeActivity/PlaceGuide.vue";
import SelectCard from "../../partials/manager/placeActivity/SelectCard.vue";
import {duplo, taob} from "../../taob";
import {mapActions, mapState} from "pinia";
import {activityPlaceStore} from "../../partials/manager/placeActivity/activityPlacesStore";
import {fixedStore} from "../../stores/fixed";

export default defineComponent({
	components: {
		AvailableBtn,
		Card,
		InfoActivity,
		PlaceGuide,
		SelectCard,
	},
	data(){
		return {
			page: 0,
			guides: false,

			am: undefined,
			pm: undefined,
			searchName: "",
			isFetch: false,
			isAllFetch: false,

			showInfo: false,
		};
	},
	computed: {
		...mapState(activityPlaceStore, [
			"activity", "selectedGuide", "selectedGuides"
		]),
	},
	watch: {
		am(){
			this.reset();
			this.findPage();
		},
		pm(){
			this.reset();
			this.findPage();
		},
		searchName(){
			this.reset();
			this.findPage();
		},
		$route(){
			if(/\/manager\/activities\/[0-9]+\/place/.test(this.$route.fullPath)){
				this.unSelectGuide();
				this.init();
			}
		}
	},
	methods: {
		...mapActions(activityPlaceStore, [
			"initActivityPlaceStore", "purgeActivityPlaceStore", "findUser", "unSelectGuide"
		]),
		
		async findPage(page = this.page){
			if(this.isFetch === true || this.isAllFetch === true) return;
			this.isFetch = true;

			const result = await this.findUser({
				date: this.activity.date,
				am: this.am,
				pm: this.pm,
				page,
				searchName: this.searchName,
			});

			if(result === undefined || this.isFetch === false) return;

			if(this.guides === false) this.guides = [];
			this.guides = [...this.guides, ...result];

			if(result.length !== 10) this.isAllFetch = true;
			this.isFetch = false;
		},

		setAMPM(am, pm){
			if(this.am === am && this.pm === pm){
				this.am = undefined;
				this.pm = undefined;
			}
			else {
				this.am = am;
				this.pm = pm;
			}
		},

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 100) && this.isFetch === false){
				this.page++;
				this.findPage();
			}
		},

		reset(){
			this.page = 0;
			this.guides = false;
			this.isFetch = false;
			this.isAllFetch = false;
		},

		async init(){
			await duplo.get(
				"/activity/{id}",
				{
					params: {id: this.$route.params.id},
					query: {all: true},
					loader: true,
				}
			)
			.s(data => {
				this.initActivityPlaceStore(data);
				this.reset();
				this.findPage();
			})
			.e((rep) => {
				this.$router.push("/manager/planning");
			})
			.result;
		}
	},
	mounted(){
		this.init();
	},
	unmounted(){
		this.purgeActivityPlaceStore();
	}

});
</script>


<style>

</style>
