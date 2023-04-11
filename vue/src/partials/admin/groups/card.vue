<template>
	<Frame 
	border="2px"
	bread="30px"
	row
	>
		<div  
		v-if="isEditing === false"
		class="p-[5px] flex justify-between items-center"
		>
			<p class="name pl-[20px] text-[20px]">
				{{ group.name }}
			</p>

			<section class="flex flex-col gap-[5px] w-[90px]">
				<Btn
				small
				@click="isEditing = true"
				>
					{{ $tr("btn.edit") }}
				</Btn>

				<Btn
				small
				theme="red"
				@click="$emit('delete', group.id)"
				:popup="{
					title: $trr('btnPopupTitle'),
					subTitle: $trr('btnPopupSubTitle')
				}"
				>
					{{ $tr("btn.delete") }}
				</Btn>
			</section>
		</div>

		<Form 
		v-else
		class="p-[5px] flex justify-between items-center gap-[10px]"
		@submit="submited"
		>
			<TextInput
			v-model="copyGroup.name"
			label=""
			:rules="rulesName"
			/>

			<section class="flex flex-col gap-[5px] w-[90px] shrink-0">
				<Btn
				small
				type="submit"
				>
					{{ $tr("btn.validate") }}
				</Btn>

				<Btn
				small
				theme="orange"
				@click="isEditing = false"
				>
					{{ $tr("btn.cancel") }}
				</Btn>
			</section>
		</Form>
	</Frame>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		group: {
			default(){
				return {};
			}
		}
	},
	data(){
		return {
			copyGroup: false,
			isEditing: false,
		};
	},
	computed: {
		rulesName(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(4, value),
				(value) => this.$rules.maxLength(15, value),
			];
		}
	},
	watch: {
		isEditing(){
			if(this.isEditing === true) this.copyGroup = {...this.group};
		}
	},
	methods: {
		async submited(){
			await this.$emit("edit", this.copyGroup.id, this.copyGroup.name);
			this.isEditing = false;
		}
	},
});
</script>


<style lang="scss" scoped>

</style>
