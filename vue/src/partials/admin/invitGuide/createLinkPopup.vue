<template>
	<div
	v-if="isOpen === true"
	class="absolute top-0 left-0 bg-[rgba(0,0,0,0.25)] w-full h-full flex justify-center items-center"
	@click="$emit('close')"
	>
		<Form @submit="submited">
			<Frame
			border="4px"
			classs="p-[15px] flex flex-col gap-[10px] items-center w-[250px]"
			@click="$event.stopPropagation()"
			>
				<TextInput
				:label="$trr('labelSearchLink')"
				class="w-full"
				:rules="emailRules"
				v-model="email"
				/>

				<SelectGroups
				v-model="groups"
				class="w-full"
				:rules="groupsRules"
				/>
			
				<Btn
				icon="plus"
				small
				type="submit"
				>
					{{ $tr('btn.create') }}
				</Btn>
			</Frame>
		</Form>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../../../stores/fixed";
import {taob} from "../../../taob";

export default defineComponent({
	props: {
		isOpen: {}
	},
	data(){
		return {
			email: "",
			groups: [],
		};
	},
	computed: {
		emailRules(){
			return [
				this.$rules.required,
				this.$rules.validEmail,
				(value) => this.$rules.minLength(10, value),
				(value) => this.$rules.maxLength(255, value),
			];
		},
		groupsRules(){
			return [(value) => value.length > 0 || this.$tr("group.min1")];
		}
	},
	watch: {
		isOpen(){
			if(this.isOpen === false){
				this.email = "";
				this.groups = [];
			}
		}
	},
	methods: {
		async submited(){
			let {close} = fixedStore().requestLoader();
			let groups = [];
			this.groups.forEach(value => groups.push({id: value.id}));
			await taob.post("link", {email: this.email, groups: groups}).info(() => close()).sd();
			this.email = "";
			this.groups = [];
			this.$emit("close", null);
		}
	},
});
</script>


<style lang="scss" scoped>

</style>
