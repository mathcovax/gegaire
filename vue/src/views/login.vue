<template>
	<main class="w-full h-full flex justify-center items-center bg-[white] select-none">
		<section class="p-[15px] bg-[var(--green1)] rounded-[4px] relative overflow-hidden flex justify-center items-center">
			<div class="absolute top-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-b-[20px]"/>

			<div class="absolute bottom-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-t-[20px]"/>

			<Form
			@submit="submited"
			class="bg-[white] w-[322px] z-10 rounded-[4px] p-[10px] relative flex flex-col justify-center items-center gap-[10px]"
			>
				<h1 class="uppercase">
					{{ $tr("/.title") }}
				</h1>

				<TextInput
				class="w-[240px]"
				:label="$tr('email')"
				v-model="email"
				:rules="[emailRule]"
				name="gegaire-email"
				:disabled="waitingResponse"
				/>

				<TextInput
				:type="seePassword? 'text' : 'password'"
				class="w-[240px]"
				:label="$tr('password')"
				v-model="password"
				:rules="[passwordRule]"
				name="gegaire-pwd"
				:disabled="waitingResponse"
				classInput="!pr-[30px]"
				>
					<Btn
					theme="none"
					:icon="seePassword? 'eye' : 'eye-off'"
					class="absolute top-0 right-0"
					@click="seePassword = !seePassword"
					/>
				</TextInput>

				<Btn 
				type="submit"
				:loading="waitingResponse"
				>
					{{ $trr("btnConnect") }}
				</Btn>

				<small class="text-center text-[red]">
					{{ info }}
				</small>
			</Form>
		</section>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../stores/fixed";
import {taob} from "../taob";

export default defineComponent({
	data(){
		return {
			email: "",
			password: "",
			info: "",

			seePassword: false,
			waitingResponse: false,
		};
	},
	computed: {

	},
	methods: {
		async submited(e){
			e.preventDefault();
            
			let {close} = fixedStore().requestLoader();
			this.waitingResponse = true;
			this.info = "";
			await taob.post(
				"/token?callback=" + this.$route.query.callback || "", 
				{email: this.email, password: this.password})
			.s(() => {
				this.$router.push(this.$route.query.callback || "/guide");
			})
			.result;
			close();
			this.waitingResponse = false;
		},

		emailRule(value){
			if(value.length < 10 || value.length > 255){
				return this.$trr("invalideInputEmail");
			}
			return true;
		},

		passwordRule(value){
			if(value.length < 8 || value.length > 25){
				return this.$trr("invalideInputPassword");
			}
			return true;
		}
	}
});
</script>

<style scoped>

</style>
