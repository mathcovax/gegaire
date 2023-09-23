<template>
	<div
	class="fixed h-full w-full bg-[rgba(0,0,0,0.25)] flex justify-center items-center top-0 left-0 z-10"
	@click="closeEditAvailabilityMenu"
	>
		<Frame
		border="4px"
		class="lg:w-auto w-[90%]"
		@click="$event.stopPropagation()"
		>
			<Form
			class="w-full h-full flex flex-col items-center p-[10px] gap-[10px]"
			@submit="submited"
			>
				<p class="capitalize text-center">
					{{ editAvailabilityDay.user.name }}
					<br/>
					{{ displayDate }}
				</p>

				<div class="flex gap-[15px]">
					<AvailableBtn
					class="h-[30px] w-[30px]"
					@click="am = true; pm = true"
					:am="true"
					:pm="true"
					:check="am === true && pm === true"
					/>

					<AvailableBtn
					class="h-[30px] w-[30px]"
					@click="am = true; pm = false"
					:am="true"
					:pm="false"
					:check="am === true && pm === false"
					/>

					<AvailableBtn
					class="h-[30px] w-[30px]"
					@click="am = false; pm = true"
					:am="false"
					:pm="true"
					:check="am === false && pm === true"
					/>
				</div>

				<div class="flex gap-[15px]">
					<AvailableBtn
					class="h-[30px] w-[30px]"
					@click="am = false; pm = false"
					:am="false"
					:pm="false"
					:check="am === false && pm === false"
					/>

					<AvailableBtn
					class="h-[30px] w-[30px]"
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
				:label="$tr('label.group')"
				v-model="group"
				:rules="[$rules.required]"
				/>

				<AreaInput
				class="w-[200px] h-[150px]"
				auto-grow
				:label="$tr('label.note')"
				v-model="note"
				:rules="rulesArea"
				/>

				<div class="text-[12px] flex items-center gap-[5px]">
					<input
					type="checkbox"
					v-model="checkedToDate"
					/>

					{{ $tr("/guide/availability.label.checkedToDate") }}
				</div>

				<DateInput
				class="w-[200px]"
				:label="$tr('/guide/availability.label.toDate')"
				v-model="toDate"
				v-if="checkedToDate"
				:rules="toDateRules"
				/>

				<Btn type="submit">
					{{ $tr("btn.validate") }}
				</Btn>

				<p
				v-if="info"
				class="text-center text-[red] text-[12px]"
				>
					{{ info }}
				</p>
			</Form>
		</Frame>
	</div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {availabilitysManagerStore} from "./availabilitysManagerStore";
import AvailableBtn from "../../../components/AvailableBtn.vue";
import {userStore} from "../../../stores/user";

export default defineComponent({
	components: {
		AvailableBtn
	},
	data(){
		return {
			date: undefined,
			am: undefined,
			pm: undefined,
			group: undefined,
			note: "",

			checkedToDate: false,
			toDate: undefined,

			info: undefined
		};
	},
	computed: {
		...mapState(availabilitysManagerStore, ["editAvailabilityDay"]),
		...mapState(userStore, ["groups"]),

		displayDate(){
			if(!this.date) return "";

			return this.$tr("/guide/availability.day")[this.date.getDay()]
				+ " " + this.date.getDate() 
				+ " " + this.$tr("/guide/availability.month")[this.date.getMonth()] 
				+ " " + this.date.getFullYear();
		}, 
		
		rulesArea(){
			return [(value) => this.$rules.maxLength(255, value)];
		},

		toDateRules(){
			return [
				value => new Date(value).getTime() > this.date.getTime() || this.$tr("/guide/availability.toDateIsPast"),
				value => Math.ceil((new Date(value).getTime() - this.date.getTime()) / 86400000) < 22 || this.$tr("/guide/availability.toDateTooLarge"),
			];
		}
	},
	watch: {
		checkedToDate(){
			if(this.checkedToDate) this.toDate = this.date.toISOString().split("T")[0];
			else this.toDate = undefined;
		},
		am(){
			if(this.am) this.info = undefined;
		}
	},
	methods: {
		...mapActions(availabilitysManagerStore, ["closeEditAvailabilityMenu", "postAvailability"]),

		async submited(){
			if(this.am === undefined || this.pm === undefined){
				this.info = this.$tr("/guide/availability.mustSelectAvailability");
				return;
			}
			if(this.group === undefined) return; 

			await this.postAvailability(this.am, this.pm, this.group.id, this.note || "", this.date, this.toDate);
			this.$parent.search();
		}
	},
	mounted(){
		this.date = new Date(this.editAvailabilityDay.date);
		this.am = this.editAvailabilityDay.am;
		this.pm = this.editAvailabilityDay.pm;
		this.note = this.editAvailabilityDay.note;
		this.group = this.editAvailabilityDay.group || this.groups[0];
	}
});
</script>

<style>

</style>
