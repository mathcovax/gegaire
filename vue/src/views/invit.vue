<template>
	<main class="flex flex-col gap-[15px] h-full w-full justify-center items-center p-[10px]">
		<Frame
		class=" lg:w-[500px]"
		classs="flex flex-col gap-[15px] h-full w-full p-[10px]"
		>
			<h2 class="w-full text-center">
				{{ $tr('invit.title') }}
			</h2>

			<Form
			@submit="submited"
			class="grid grid-cols-12 w-full gap-[15px]"
			>
				<TextInput
				class="col-span-6"
				name="gegaire-name"
				:label="$tr('label.name') + '*'"
				:rules="nameRules"
				v-model="name"
				autocompleteOff
				/>

				<TextInput
				class="col-span-6"
				name="gegaire-tel"
				:label="$tr('label.tel') + '*'"
				:rules="telRules"
				v-model="tel"
				autocompleteOff
				/>

				<PlaceInput
				class="col-span-12"
				name="gegaire-address"
				:label="$tr('label.address')"
				v-model="address"
				autocompleteOff
				/>

				<TextInput
				ref="pwd"
				:type="seePassword? 'text' : 'password'"
				class="col-span-6"
				:label="$tr('label.password') + '*'"
				v-model="password"
				name="gegaire-pwd"
				classInput="!pr-[30px]"
				:rules="passwordRules"
				disabledAutoRules
				>
					<Btn
					theme="none"
					:icon="seePassword? 'eye' : 'eye-off'"
					class="absolute top-0 right-0"
					@click="seePassword = !seePassword"
					/>
				</TextInput>

				<TextInput
				ref="cpwd"
				:type="seePassword? 'text' : 'password'"
				class="col-span-6"
				:label="$tr('label.confirmPassword') + '*'"
				v-model="confirPassword"
				name="gegaire-pwd"
				classInput="!pr-[30px]"
				:rules="passwordRules"
				disabledAutoRules
				/>

				<Btn
				class="col-start-4 col-end-10"
				type="submit"
				>
					{{ $tr("btn.validate") }}
				</Btn>
			</Form>
		</Frame>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../stores/fixed";
import {taob} from "../taob";

export default defineComponent({
	data(){
		return {
			name: "",
			tel: "",
			address: {},
			password: "",
			confirPassword: "",

			seePassword: false,
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
		telRules(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(10, value),
				(value) => this.$rules.maxLength(12, value)
			];
		},
		passwordRules(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(8, value),
				(value) => this.$rules.maxLength(25, value),
				() => this.password === this.confirPassword || this.$tr("rules.passwordIsnotsame")
			];
		}
	},
	watch: {
		password(){
			this.$refs.cpwd.validate();
		},
		confirPassword(){
			this.$refs.pwd.validate();
		}
	},
	methods: {
		async submited(){
			let {close} = fixedStore().requestLoader();
			await taob.post(
				"user",
				{
					name: this.name,
					tel: this.tel,
					address: Object.keys(this.address).length === 0 ? null : this.address,
					password: this.password,
					link_id: this.$route.params.id
				}
			)
			.info(() => close())
			.sd();

			this.$router.push("/");
		},
	},
});
</script>


<style>

</style>
