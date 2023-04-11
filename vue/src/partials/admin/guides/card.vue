<template>
	<Frame 
	border="2px"
	bread="30px"
	row
	classs="p-[5px] flex justify-between items-center"
	>
		<p class="name text-[20px]">
			{{ guide.name }}
		</p>

		<Btn
		small
		@click="clicked"
		>
			{{ $tr("btn.edit") }}
		</Btn>
	</Frame>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		guide: {
			default: false
		}
	},
	methods: {
		clicked(){
			this.$router.push("/admin/guides/" + this.guide.id);
		}
	}
});
</script>


<style>

</style>
