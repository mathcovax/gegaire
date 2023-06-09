<template>
	<div class="z-20 absolute w-0 h-full top-0 right-0">
		<div 
		v-show="editDay !== false" 
		class="absolute w-[100vw] h-full bg-[rgba(0,0,0,0.25)] top-0 right-0"
		@click="stopEditingDay"
		/>

		<section 
		:class="{
			'translate-x-[-250px]': editDay !== false
		}"
		class="absolute transition duration-[400ms] top-0 w-[250px] h-full p-[10px] pr-0 bg-[var(--green1)] rounded-l-[4px] overflow-hidden"
		>
			<div class="absolute top-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-bl-[20px]"/>

			<div class="absolute bottom-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-tl-[20px]"/>

			<div class="relative w-full h-full bg-[white] z-10 rounded-l-[4px]">
				<Form
				v-if="editDay !== false"
				class="relative w-full h-full p-[10px] flex flex-col items-center gap-[15px]"
				@submit="submited"
				>	
					<p class="capitalize text-center">
						{{ displayDate }}
						<br/>
						{{ year }}
					</p>

					<div class="flex gap-[15px]">
						<AvailableBtn
						class="h-[30px]"
						@click="am = true; pm = true"
						:am="true"
						:pm="true"
						:check="am === true && pm === true"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="am = true; pm = false"
						:am="true"
						:pm="false"
						:check="am === true && pm === false"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="am = false; pm = true"
						:am="false"
						:pm="true"
						:check="am === false && pm === true"
						/>
					</div>

					<div class="flex gap-[15px]">
						<AvailableBtn
						class="h-[30px]"
						@click="am = false; pm = false"
						:am="false"
						:pm="false"
						:check="am === false && pm === false"
						/>

						<AvailableBtn
						class="h-[30px]"
						@click="am = null; pm = null"
						:am="null"
						:pm="null"
						:check="am === null && pm === null"
						/>
					</div>

					<SelectInput
					class="w-[200px]"
					:items="this.groups"
					:item-text="value => value.name"
					:label="$trr('labelSelectGroup')"
					v-model="group"
					:rules="[$rules.required]"
					/>

					<AreaInput
					class="w-[200px] max-h-[200px]"
					auto-grow
					:label="$trr('labelNote')"
					v-model="note"
					:rules="rulesArea"
					/>

					<Btn type="submit">
						{{ $tr("btn.validate") }}
					</Btn>
				</Form>
			</div>
		</section>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapState} from "pinia";
import {availabilityStore} from "../../../stores/availability";
import {userStore} from "../../../stores/user";
import AvailableBtn from "../../../components/AvailableBtn.vue";

export default defineComponent({
	name: "DayBar",
	components: {
		AvailableBtn
	},
	data(){
		return {
			am: undefined,
			pm: undefined,
			group: undefined,
			note: "",

			day: undefined,
			month: undefined,
			year: undefined,
		};
	},
	computed: {
		...mapState(availabilityStore, ["editDay", "availability"]),
		...mapState(userStore, ["groups"]),

		displayDate(){
			return `${this.$trr("day")[this.day - 1 !== -1 ? this.day - 1 : 6]} ${this.editDay.getDate()} ${this.$trr("month")[this.month - 1]}`;
		},

		rulesArea(){
			return [(value) => this.$rules.maxLength(255, value)];
		}
	},
	watch: {
		editDay(){
			if(this.editDay !== false){
				this.day = this.editDay.getDay();
				this.month = this.editDay.getMonth() + 1;
				this.year = this.editDay.getFullYear();

				let tad = this.availability[this.month + "-" + this.year]?.[this.editDay.getDate()] || undefined;

				if(tad !== undefined){
					this.am = tad.am;
					this.pm = tad.pm;
					this.note = tad.note;
					this.group = tad.group;
				}
				else {
					this.am = undefined;
					this.pm = undefined;
					this.note = "";
					this.group = this.groups[0];
				}
			}
		}
	},
	methods: {
		...mapActions(availabilityStore, ["stopEditingDay", "postDay"]),

		async submited(){
			if(this.am === undefined || this.pm === undefined || this.group === undefined){
				return;
			}
			
			await this.postDay(this.am, this.pm, this.group.id, this.note);
			this.stopEditingDay();
		}
	}
});
</script>


<style>

</style>
