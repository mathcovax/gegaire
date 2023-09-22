<template>
	<main class="w-full h-full flex flex-col justify-center items-center gap-[10px]">
		<Frame
		border="4px"
		class="w-[95%] lg:w-[500px]"
		>
			<Form
			class=" w-full grid grid-cols-6 lg:grid-cols-12 p-[10px] gap-[10px]"
			@submit="submited"
			>
				<TextInput
				class="col-span-6"
				:label="$tr('label.name')"
				v-model="nameC"
				:disabled="!edit"
				:rules="nameRules"
				/>
			
				<TextInput
				class="col-span-6"
				:label="$tr('label.email')"
				v-model="emailC"
				:disabled="!edit"
				:rules="emailRules"
				/>

				<TextInput
				class="col-span-6"
				:label="$tr('label.tel')"
				v-model="telC"
				:disabled="!edit"
				:rules="telRules"
				/>

				<PlaceInput
				class="col-span-6"
				v-model="addressC"
				:disabled="!edit"
				/>

				<div class="col-span-6 lg:col-span-12 flex justify-center gap-[10px]">
					<Btn
					v-if="edit === false"
					class="w-[140px]"
					@click="startEdit"
					>
						{{ $tr("btn.edit") }}
					</Btn>

					<Btn
					type="submit"
					v-if="edit === true"
					class="w-[140px]"
					>
						{{ $tr("btn.save") }}
					</Btn>

					<Btn
					v-if="edit === true"
					theme="orange"
					class="w-[140px]"
					@click="edit = false"
					>
						{{ $tr("btn.cancel") }}
					</Btn>
				</div>
			</Form>
		</Frame>

		<Btn
		theme="red"
		small
		@click="disconnect"
		>
			{{ $trr("btnDisconnect") }}
		</Btn>
	</main>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import Form from "../../components/Form.vue";
import {fixedStore} from "../../stores/fixed";
import {userStore} from "../../stores/user";
import {taob} from "../../taob";

export default defineComponent({
	components: {Form},
	data(){
		return {
			edit: false,

			newName: false,
			newEmail: false,
			newTel: false,
			newAddress: false,
		};
	},
	computed: {
		...mapState(userStore, [
			"name", "email", "tel", "address"
		]),
		nameC: {
			get(){
				return this.edit ? this.newName : this.name;
			},
			set(value){
				this.newName = value;
			}
		},
		emailC: {
			get(){
				return this.edit ? this.newEmail : this.email;
			},
			set(value){
				this.newEmail = value;
			}
		},
		telC: {
			get(){
				return this.edit ? this.newTel : this.tel;
			},
			set(value){
				this.newTel = value;
			}
		},
		addressC: {
			get(){
				return this.edit ? this.newAddress : this.address;
			},
			set(value){
				this.newAddress = value;
			}
		},

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
				(value) => this.$rules.minLength(10, value.replace(/ /g, "")),
				(value) => this.$rules.maxLength(12, value.replace(/ /g, ""))
			];
		},
	},
	methods: {
		...mapActions(userStore, ["disconnect"]),

		startEdit(){
			this.newName = this.name;
			this.newEmail = this.email;
			this.newTel = this.tel;
			this.newAddress = this.address;

			this.edit = true;
		},

		async submited(){
			this.newName = this.newName.trim();
			this.newEmail = this.newEmail.trim();
			this.newTel = this.newTel.replace(/ /g, "").trim();

			let body = {
				user_name: this.newName !== this.name ? this.newName : undefined,
				user_email: this.newEmail !== this.email ? this.newEmail : undefined,
				user_tel: this.newTel !== this.tel ? this.newTel : undefined,
				address: JSON.stringify(this.newAddress) !== JSON.stringify(this.address) ? this.newAddress : undefined,
			};

			if(JSON.stringify(body) === "{}"){
				this.edit = false;
				return;
			}

			let {close} = fixedStore().requestLoader();
			await taob.patch(
				"/user",
				body
			)
			.info(() => close())
			.sd();

			this.edit = false;
		},
	}
});
</script>


<style lang="scss" scoped>

</style>
