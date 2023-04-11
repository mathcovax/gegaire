<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center p-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<Btn
		icon="clipboard-plus-outline"
		@click="$router.push('/manager/activities/newactivity/edit')"
		>
			{{ $trr("btnAddActivity") }}
		</Btn>
	</main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	
});
</script>


<style>

</style>
