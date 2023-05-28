<template>
	<div 
	@click="clicked"
	class="p-[3px] relative overflow-hidden rounded-[4px] select-none"
	:class="{
		'opacity-[0.5]': isPast || hasWork,
	}"
	>  
		<div 
		class="absolute top-0 left-0 w-full h-[50%]"
		v-if="avb"
		:class="{
			'bg-[green]': avb.am === true,
			'bg-[red]': avb.am === false,
			'bg-[orange]': avb.am === null,
		}"
		/>

		<div 
		class="absolute bottom-0 left-0 w-full h-[50%]"
		v-if="avb"
		:class="{
			'bg-[green]': avb.pm === true,
			'bg-[red]': avb.pm === false,
			'bg-[orange]': avb.pm === null,
		}"
		/>

		<div
		class="relative w-full h-full p-[2px] flex flex-col rounded-[4px] border-solid border-[2px] border-[black] gap-[5px]"
		:class="{
			'bg-[#ADD8E6]': hasWork,
			'bg-[white]': !hasWork
		}"
		>
			<p class="w-full text-center text-[13px]">
				{{ toDay }}-{{ month }}
			</p>

			<Loader 
			v-if="avb === undefined"
			size="50px" 
			class="absolute top-0 w-full h-full left-0"
			/>

			<div
			v-else-if="avb !== null"
			class="flex flex-col items-center gap-[5px]"
			>
				<span class="max-w-full overflow-x-hidden text-ellipsis text-[12px]">
					{{ avb.group.name }}
				</span>

				<span
				v-if="avb.note !== ''"
				class="bg-[var(--green1)] text-white text-[10px] rounded-full px-[3px]"
				>
					Note
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {mapActions, mapState} from "pinia";
import {availabilityStore} from "../../../stores/availability";

export default defineComponent({
	name: "Day",
	props: {
		week: {
			default: false
		},
		day: {
			default: false
		},
	},
	data(){
		return {
			toDate: false,
			month: false,
			toDay: false,
			my: false
		};
	},
	computed: {
		...mapState(availabilityStore, ["availability", "date"]),

		avb(){
			if(
				this.my === false ||
                this.availability[this.my] === undefined ||
                this.availability[this.my] === false
			) return undefined;

			else if(this.availability[this.my][this.toDay] === undefined) return null;

			else return this.availability[this.my][this.toDay];
		},

		isPast(){
			if(this.toDate === false || this.toDate.getTime() > Date.now()) return false;
			else return true;
		},
		hasWork(){
			if(!this.avb) return false;
			else if(this.avb.work) return true;
			else return false;
		}
	},
	methods: {
		...mapActions(availabilityStore, ["getMonth", "startEditingDay"]),

		clicked(){
			if(this.avb === undefined) return;
			else if(this.hasWork === true) this.$router.push(`/guide/activities?date=${this.toDate.toISOString().split("T")[0]}`);
			else if(this.isPast !== true) this.startEditingDay(this.toDate);
		},

		getDay(date){
			let day = date.getDay();
			return day - 1 !== -1 ? day - 1 : 6;
		}
	},
	mounted(){
		this.toDate = new Date(this.date.toString());
		this.toDate.setDate(this.date.getDate() - this.getDay(this.date) + (this.week * 7) + this.day);
		this.month = this.toDate.getMonth() + 1;
		this.toDay = this.toDate.getDate();
		this.my = this.month + "-" + this.toDate.getFullYear();
		this.getMonth(this.my);

	}
});
</script>


<style>

</style>
