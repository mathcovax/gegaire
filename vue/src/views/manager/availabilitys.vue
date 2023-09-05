<template>
	<main class="p-[10px] flex flex-col w-full h-full select-none gap-[10px]">
		<div class="shrink-0 flex gap-[10px] justify-center items-center flex-wrap">
			<TextInput
			:label="$trr('searchInput')"
			v-model="inputSearchName"
			/>
			
			<p>interval :</p>

			<div>
				<label class="text-[12px]">
					{{ $trr('beforeMonth') }} {{ $tr('/guide/availability.month')[new Date().getMonth()] }}
				</label>

				<NumberInput
				label=""
				v-model="beforeMonth"
				class="w-[150px]"
				/>
			</div>
			
			<div>
				<label class="text-[12px]">
					{{ $trr('afterMonth') }} {{ $tr('/guide/availability.month')[new Date().getMonth()] }}
				</label>

				<NumberInput
				label=""
				v-model="afterMonth"
				class="w-[150px]"
				/>
			</div>

			<Btn
			class=""
			@click="search()"
			>
				{{ $tr("btn.search") }}
			</Btn>
		</div>

		<Frame
		border="4px"
		class="grow overflow-hidden"
		classs="p-[10px] overflow-hidden"
		>	
			<div class="overflow-auto flex flex-col w-full h-full relative">
				<div class="border-b-[black] border-0 border-b-[2px] border-solid flex w-[fit-content] min-w-full sticky top-0 h-[55px] z-[5]">
					<div class="shrink-0 w-[100px] sticky left-0 top-0 bg-[white]"/>

					<div class="shrink-0 flex">
						<div v-for="month of months">
							<div class="flex justify-around bg-[white]">
								<p v-for="num in 5">
									{{ $tr("/guide/availability.month")[month.getMonth()] + " " + month.getFullYear() }} 
								</p>
							</div>

							<div class="flex gap-[2px] bg-[black] px-[2px]">
								<div
								v-for="day in month.getDate()"
								class="w-[50px] bg-[white]"
								>
									<div class="pl-[5px]">
										{{ day }}
									</div>

									<div class="flex h-[15px] text-[12px] justify-between px-[2px]">
										<div>AM</div>
										
										<div class="w-[1px] h-full bg-[black]"/>

										<div>PM</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Row
				class="shrink-0"
				v-for="guide of guides"
				:guide="guide"
				/>

				<Btn
				class="sticky left-0 mt-[10px] self-start"
				@click="page++"
				v-if="maxGuide > guides.length"
				>
					{{ $tr("btn.seeMore") }}
				</Btn>
			</div>
		</Frame>

		<AvailabilityMenu v-if="menuIsOpen"/>
	</main>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import Loader from "../../components/Loader.vue";
import AvailabilityMenu from "../../partials/manager/availabilitys/availabilityMenu.vue";
import Row from "../../partials/manager/availabilitys/row.vue";
import {duplo} from "../../taob";
import {availabilitysManagerStore} from "../../partials/manager/availabilitys/availabilitysManagerStore";

export default defineComponent({
	components: {Row, Loader, AvailabilityMenu},
	data(){
		return {
			months: [],
			guides: [],
			page: 0,
			maxGuide: 0,
			inputSearchName: "",
			searchName: "",
			beforeMonth: 0,
			afterMonth: 0,
		};
	},
	computed: {
		...mapState(availabilitysManagerStore, ["menuIsOpen"])
	},
	watch: {
		page(){
			this.months.forEach(value => this.getAvailabilitys(value, this.page));
		},
	},
	methods: {
		...mapActions(availabilitysManagerStore, ["initAvailabilitysManagerStore"]),
		async getAvailabilitys(date, page = 0, searchName = this.searchName){
			date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			const guides = await duplo.get(
				"/availabilitys", 
				{
					query: {page, date: date.toISOString(), searchName},
					loader: true,
				}
			).sd();

			guides.forEach(value => {
				let guide = this.guides.find(g => g.id === value.id);
				if(!guide){
					guide = {
						id: value.id,
						name: value.name,
						availabilitys: []
					};
					this.guides.push(guide);
				}

				guide.availabilitys.push({
					date,
					data: value.availability
				});

				guide.availabilitys.sort((a1, a2) => a1.date - a2.date);
			});
		},
		getMaxGuides(searchName = this.searchName){
			return duplo.get("/guides/count", {query: {searchName}, loader: true}).sd();
		},
		async search(bm = this.beforeMonth, am = this.afterMonth){
			this.guides = [];
			this.months = [];
			this.page = 0;
			this.searchName = this.inputSearchName;
			this.maxGuide = await this.getMaxGuides();
			
			let date = new Date();
			date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			const month = [date];

			for(let count = 1; count <= bm; count++){
				let date = new Date();
				date.setDate(1);
				date.setMonth(date.getMonth() - count);
				date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				month.push(date);
			}

			for(let count = 1; count <= am; count++){
				let date = new Date();
				date.setDate(1);
				date.setMonth(date.getMonth() + count);
				date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				month.push(date);
			}
			
			this.months = month.sort((date1, date2) => date1 - date2);
			this.months.forEach(value => this.getAvailabilitys(value, 0));
		}
	},
	mounted(){
		this.search();
		this.initAvailabilitysManagerStore();
	}
});
</script>

<style>

</style>
