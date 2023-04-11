<template>
	<div class="w-full h-full">
		<Loader/>

		<Toaster/>

		<router-view/>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import "@/scss/global.scss";
import "@mdi/font/css/materialdesignicons.css";
import Loader from "./fixed/loader.vue";
import Toaster from "./fixed/toaster.vue";

export default defineComponent({
	components: {
		Loader,
		Toaster
	}
});
</script>

<style>
.p{
text-justify: auto;
}
</style>
