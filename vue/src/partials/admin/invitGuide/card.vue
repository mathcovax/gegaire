<template>
	<Frame 
	border="2px"
	bread="30px"
	row
	classs="p-[5px] flex justify-between items-center gap-[10px]"
	>
		<p class="name text-[20px] text-ellipsis overflow-hidden whitespace-nowrap">
			{{ link.email }}
		</p>

		<Btn
		small
		@click="clicked"
		theme="red"
		:popup="{
			title: $trr('delete.popupTitle'),
			subTitle: $trr('delete.popupSubTitle')
		}"
		>
			{{ $tr("btn.delete") }}
		</Btn>
	</Frame>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../../../stores/fixed";
import {taob} from "../../../taob";

export default defineComponent({
	props: {
		link: {}
	},
	data(){
		return {
			
		};
	},
	methods: {
		async clicked(){
			let {close} = fixedStore().requestLoader();
			await taob.delete("link/" + this.link.id).info(() => close()).sd();
			this.$emit("refresh");
		}
	},
});
</script>


<style lang="scss" scoped>

</style>
