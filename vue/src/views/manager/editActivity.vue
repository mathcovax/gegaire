<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center justify-center p-[10px]">
		<Frame
		class="w-full lg:w-[500px] max-h-full"
		classs="p-[10px] overflow-y-auto"
		>
			<h1 class="text-center mb-[15px]">
				{{ $route.params.id === "newactivity"? $tr("editActivity.titleCreate") : $tr("editActivity.titleEdit") }}
			</h1>

			<Form
			class="grid grid-cols-12 gap-[10px]"
			@submit="submited"
			>
				<TextInput
				:label="$tr('editActivity.form.name')"
				class="col-span-12"
				v-model="name"
				:rules="nameRules"
				/>

				<PlaceInput
				:label="$tr('editActivity.form.loc')"
				class="col-span-12"
				v-model="loc"
				:rules="locRules"
				/>

				<NumberInput
				:label="$tr('editActivity.form.number')"
				class="col-span-6"
				v-model="number"
				:rules="numberRules"
				/>

				<DateInput
				:label="$tr('editActivity.form.date')"
				class="col-span-6"
				v-model="date"
				:rules="dateRules"
				/>

				<HourInput
				:label="$tr('editActivity.form.hourStart')"
				class="col-span-6"
				v-model="hourStart"
				:rules="hourStartRules"
				/>

				<HourInput
				:label="$tr('editActivity.form.hourEnd')"
				class="col-span-6"
				v-model="hourEnd"
				:rules="hourEndRules"
				/>

				<SelectGroups
				class="col-span-6 h-[130px]"
				v-model="group"
				:max="1"
				:qte="3"
				:rules="sgRules"
				/>

				<AreaInput
				class="col-span-6 max-h-[130px]"
				label="Note"
				v-model="note"
				auto-grow
				:rules="areaRules"
				/>

				<Btn
				type="submit"
				class="col-start-4 col-end-10"
				>
					{{ $route.params.id === "newactivity" ? $tr("btn.create") : $tr("btn.edit") }}
				</Btn>
			
				<Btn
				class="col-start-4 col-end-10"
				theme="orange"
				@click="cancel"
				>
					{{ $tr("btn.cancel") }}
				</Btn>

				<Btn
				v-if="$route.params.id !== 'newactivity'"
				class="col-start-4 col-end-10"
				theme="red"
				:popup="{
					title: $tr('editActivity.btnDeletePopupTitle'),
					subTitle: $tr('editActivity.btnDeletePopupSubTitle')
				}"
				@click="deleteActivity"
				>
					{{ $tr("btn.delete") }}
				</Btn>
			</Form>
		</Frame>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../../stores/fixed";
import {taob} from "../../taob";

export default defineComponent({
	data(){
		return {
			name: "",
			number: "",
			loc: "",
			date: "",
			hourStart: "",
			hourEnd: "",
			note: "",
			group: [],
		};
	}, 
	computed: {
		nameRules(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(4, value),
				(value) => this.$rules.maxLength(30, value),
			];
		},
		numberRules(){
			return [this.$rules.onlyInt];
		},
		locRules(){
			return [this.$rules.required];
		},
		dateRules(){
			return [
				this.$rules.required,
				(value) => Date.parse(value) >  Date.now() || this.$tr("editActivity.form.datePassed")
			];
		},
		hourStartRules(){
			return [
				() => {
					if(this.hourStart === "" && this.hourEnd === "") return true;
					if(this.hourStart === "" && this.hourEnd !== "") return this.$tr("editActivity.form.rules.hourMissing");
					if(
						this.hourStart !== "" && 
						this.hourEnd !== "" &&
						parseFloat(this.hourStart.replace(":", ".")) > parseFloat(this.hourEnd.replace(":", "."))
					) return this.$tr("editActivity.form.rules.hourLessThan");

					return true;
				}
			];
		},
		hourEndRules(){
			return [
				() => {
					if(this.hourStart === "" && this.hourEnd === "") return true;
					if(this.hourStart !== "" && this.hourEnd === "") return this.$tr("editActivity.form.rules.hourMissing");
					if(
						this.hourStart !== "" && 
						this.hourEnd !== "" &&
						parseFloat(this.hourStart.replace(":", ".")) > parseFloat(this.hourEnd.replace(":", "."))
					) return this.$tr("editActivity.form.rules.hourMoreThan");
					return true;
				}
			];
		},
		sgRules(){
			return [(value) => value.length === 1 || "Ce champ est requis.",];
		},
		areaRules(){
			return [(value) => this.$rules.maxLength(1500, value),];
		}
	},
	methods: {

		async submited(){
			let {close} = fixedStore().requestLoader();
			if(this.$route.params.id === "newactivity"){
				await taob.post(
					"/activity", 
					{
						activity_name: this.name,
						activity_number: parseInt(this.number),
						address: this.loc,
						activity_date: this.date,
						activity_hourStart: this.hourStart,
						activity_hourEnd: this.hourEnd,
						activity_note: this.note,
						group_id: this.group[0].id,
					}
				)
				.s(data => {
					this.$router.push("/manager/activities/" + data.id + "/place");
				})
				.result;
			}
			else {
				await taob.put(
					"/activity/" + this.$route.params.id, 
					{
						activity_name: this.name,
						activity_number: parseInt(this.number),
						address: this.loc,
						activity_date: this.date,
						activity_hourStart: this.hourStart,
						activity_hourEnd: this.hourEnd,
						activity_note: this.note,
						group_id: this.group[0].id,
					}
				)
				.s(data => {
					this.$router.push("/manager/activities/" + data.id + "/place");
				})
				.result;
			}
			close();
		},

		async initEdit(){

			await taob.get("/activity/" + this.$route.params.id)
			.s(data => {
				this.name = data.name;
				this.number = data.number;
				this.loc = data.address;
				this.date = data.date.split("T")[0];
				this.hourStart = data.hourStart;
				this.hourEnd = data.hourEnd;
				this.note = data.note;
				this.group = [data.group];
			})
			.e((rep) => {
				this.$router.push("/manager/planning");
			})
			.result;

		},

		async deleteActivity(){
			await taob.delete("/activity/" + this.$route.params.id)
			.s(() => {
				this.$router.push("/manager/planning");
			})
			.result;

		},

		cancel(){
			if(this.$route.params.id !== "newactivity") this.$router.push("/manager/activities/" + this.$route.params.id + "/place");
			else this.$router.push("/manager/planning");
		}
	},
	mounted(){
		if(this.$route.params.id !== "newactivity") this.initEdit();
	}
});
</script>


<style>

</style>
