<template>
	<main class="flex flex-col justify-center items-center h-full w-full p-[10px]">
		<Frame
		class="w-full flex flex-col lg:w-[500px]"
		classs="flex flex-col p-[10px] gap-[15px]"
		>
			<h2 class="w-full text-center">
				{{ $route.params.id === "newguide"? $tr("editGuide.create") : $tr("editGuide.edit") }}
			</h2>

			<Form
			@submit="submited"
			class="grid grid-cols-12 w-full gap-x-[10px] gap-y-[10px]"
			>
				<TextInput
				class="col-span-6"
				name="gegaire-name"
				:label="$tr('label.name') + '*'"
				:rules="nameRules"
				v-model="name"
				/>

				<TextInput
				class="col-span-6"
				name="gegaire-tel"
				:label="$tr('editGuide.form.tel') + '*'"
				:rules="telRules"
				v-model="tel"
				/>
            
				<TextInput
				class="col-span-12"
				name="gegaire-email"
				:label="$tr('editGuide.form.email') + '*'"
				:rules="emailRules"
				v-model="email"
				/>

				<PlaceInput
				class="col-span-12"
				v-model="address"
				/>

				<div class="col-span-6 flex flex-col justify-between gap-y-[10px]">
					<small class="text-center">
						Carte Pro
					</small>

					<DateInput
					label="de"
					v-model="pro_card.from"
					:rules="proCardFrom"
					/>

					<DateInput
					label="à"
					v-model="pro_card.to"
					:rules="proCardTo"
					/>
				</div>

				<SelectGroups
				class="col-span-6"
				v-model="groups"
				:qte="5"
				:rules="groupsRules"
				/>

				<div class="col-span-12 flex gap-[10px] justify-center">
					<input
					type="checkbox"
					v-model="isManager"
					/>

					<p>Manager</p>
				</div>

				<Btn
				type="submit"
				class="col-start-4 col-end-10"
				>
					{{ $tr("btn.edit") }}
				</Btn>

				<Btn
				theme="orange"
				class="col-start-4 col-end-10"
				@click="$router.push('/admin/guides')"
				>
					{{ $tr("btn.cancel") }}
				</Btn>

				<Btn
				class="col-start-4 col-end-10"
				theme="red"
				:popup="{
					title: $tr('editGuide.btnDeletePopupTitle'),
					subTitle: $tr('editGuide.btnDeletePopupSubTitle')
				}"
				@click="deleteGuide"
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
			email: "",
			tel: "",
			name: "",
			groups: [],
			address: {},
			pro_card: {
				from: "",
				to: ""
			},
			isManager: false,
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
		emailRules(){
			return [
				this.$rules.required,
				this.$rules.validEmail,
				(value) => this.$rules.minLength(10, value),
				(value) => this.$rules.maxLength(255, value),
			];
		},
		telRules(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(10, value),
				(value) => this.$rules.maxLength(20, value)
			];
		},
		proCardFrom(){
			return [
				() => {
					if(this.pro_card.from === "" && this.pro_card.to === "") return true;
					if(this.pro_card.from === "" && this.pro_card.to !== "") return this.$tr("editGuide.form.rules.proCardMissing");
					if(
						this.pro_card.from !== "" &&
                        this.pro_card.to !== "" &&
                        Date.parse(this.pro_card.to) < Date.parse(this.pro_card.from)
					) return this.$tr("editGuide.form.rules.proCardLessThan");
                    
					return true;
				}
			];
		},
		proCardTo(){
			return [
				() => {
					if(this.pro_card.from === "" && this.pro_card.to === "") return true;
					if(this.pro_card.from !== "" && this.pro_card.to === "") return this.$tr("editGuide.form.rules.proCardMissing");
					if(
						this.pro_card.from !== "" &&
                        this.pro_card.to !== "" &&
                        Date.parse(this.pro_card.to) < Date.parse(this.pro_card.from)
					) return this.$tr("editGuide.form.rules.proCardMoreThan");
                    
					return true;
				}
			];
		},
		groupsRules(){
			return [(value) => value.length > 0 || this.$tr("group.min1")];
		}
	},
	methods: {
		async submited(e){
			let {close} = fixedStore().requestLoader();
			await taob.put("/user/" + this.$route.params.id, {
				email: this.email,
				tel: this.tel,
				name: this.name,
				groups: this.groups,
				address: JSON.stringify(this.address) === "{}" ? undefined : this.address,
				pro_card: this.pro_card.from && this.pro_card.to ? this.pro_card : null,
				isManager: this.isManager,
			})
			.info((message, status) => {
				
			})
			.s(() => {
				this.$router.push("/admin/guides");
			})
			.result;
			close();
		},

		async initEdit(){
			let {close} = fixedStore().requestLoader();
			await taob.get("/user/" + this.$route.params.id)
			.s(data => {
				this.email = data.email;
				this.name = data.name;
				this.tel = data.tel;
				this.groups = data.groups;
				this.pro_card = {from: data?.pro_card?.from.split("T")[0] || "", to: data?.pro_card?.to.split("T")[0] || ""};
				this.address = data.address || this.address;
				this.isManager = data.isManager;
			})
			.e(() => {
				this.$router.push("/admin/guides");
			})
			.result;
			close();
		},

		async deleteGuide(){
			let {close} = fixedStore().requestLoader();
			await taob.delete("/user/" + this.$route.params.id)
			.info((message, status) => {
				
			})
			.s(() => {
				this.$router.push("/admin/guides");
			});
			close();
		}
	},
	mounted(){
		this.initEdit();
	}
});
</script>


<style>

</style>
