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
				name="activity-name"
				/>

				<TextInput
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
				:disabled="$route.params.id !== 'newactivity'"
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
				:disabled="$route.params.id !== 'newactivity'"
				/>

				<AreaInput
				class="col-span-6 h-[130px]"
				label="Note"
				v-model="note"
				:rules="areaRules"
				@click="toShowNote"
				/>

				<Btn
				type="submit"
				class="col-start-4 col-end-10"
				>
					{{ $route.params.id === "newactivity" ? $tr("btn.create") : $tr("btn.save") }}
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

		<div
		v-if="showNote"
		class="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center p-[20px] bg-[rgba(0,0,0,0.30)]"
		@click="showNote = false"
		>
			<Frame
			class="w-full h-full lg:w-[600px] lg:h-[80%]"
			classs="p-[10px] flex flex-col items-center gap-[10px]"
			@click="$event.stopPropagation()"
			>
				<AreaInput
				ref="note"
				class="w-full grow"
				label="Note"
				v-model="note"
				:rules="areaRules"
				/>

				<Btn
				theme="red"
				@click="showNote = false"
				>
					{{ $tr("btn.close") }}
				</Btn>
			</Frame>
		</div>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import {duplo, taob} from "../../taob";

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
			showNote: false,
		};
	}, 
	computed: {
		nameRules(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(4, value),
				(value) => this.$rules.maxLength(50, value),
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
			if(this.$route.params.id === "newactivity"){
				await duplo.post(
					"/activity", 
					{
						name: this.name,
						number: parseInt(this.number),
						address: this.loc,
						date: this.date,
						hourStart: this.hourStart || undefined,
						hourEnd: this.hourEnd || undefined,
						note: this.note,
						groupId: this.group[0].id,
					},
					{loader: true}
				)
				.s(data => {
					this.$router.push("/manager/activities/" + data.id + "/place");
				})
				.result;
			}
			else {
				await duplo.put(
					"/activity/{id}", 
					{
						name: this.name,
						number: parseInt(this.number),
						address: this.loc,
						hourStart: this.hourStart || undefined,
						hourEnd: this.hourEnd || undefined,
						note: this.note,
					},
					{
						params: {id: this.$route.params.id},
						loader: true
					}
				)
				.s(() => {
					this.$router.push("/manager/activities/" + this.$route.params.id + "/place");
				})
				.result;
			}
		},

		async initEdit(){
			await duplo.get("/activity/{id}", {params: {id: this.$route.params.id}})
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
		},

		toShowNote(){
			this.showNote = true;
			setTimeout(() => this.$refs.note.$refs.textarea.focus(), 100);
		}
	},
	mounted(){
		if(this.$route.params.id !== "newactivity") this.initEdit();
	}
});
</script>


<style>

</style>
