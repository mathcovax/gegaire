<template>
	<div
	class="p-[5px] relative rounded-[4px] overflow-hidden"
	@click="$emit('click')"
	availability-card
	>
		<div
		:class="{
			'bg-[green]': am === true,
			'bg-[red]': am === false,
			'bg-[orange]': am === null,
		}"
		class="absolute top-0 left-0 w-full h-[50%]"
		/>

		<div
		:class="{
			'bg-[green]': pm === true,
			'bg-[red]': pm === false,
			'bg-[orange]': pm === null,
		}"
		class="absolute bottom-0 left-0 w-full h-[50%]"
		/>

		<div class="relative h-full w-full bg-[white] rounded-[4px] border-solid border-[2px] border-[black] flex">
			<ico
			class="text-[green]"
			v-if="check"
			>
				check-bold
			</ico>

			<ico
			class="placeholder hidden text-[gray]"
			v-else
			>
				check-bold
			</ico>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		am: {
			default: undefined,
		}, 
		pm: {
			default: undefined,
		},
		check: {
			default: false,
		}
	},
	emits: ["click"]
});
</script>

<style lang="scss">
div[availability-card]{
	&:hover .placeholder{
		display: block;

	}
}
</style>
