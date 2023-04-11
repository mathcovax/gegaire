<template>
	<div
	v-show="loader.length !== 0"
	class="w-full h-full fixed z-50 bg-[rgba(0,0,0,0.4)] flex justify-center items-center"
	>
		<svg
		class="svgLoading"
		viewBox="0 0 50 50"
		>
			<circle
			class="circleLoading"
			cx="25"
			cy="25"
			r="20"
			fill="none"
			/>
		</svg>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {fixedStore} from "../stores/fixed";
import {mapState} from "pinia";

export default defineComponent({
	computed: {
		...mapState(fixedStore, ["loader"])
	}
});
</script>

<style lang="scss" scoped>
.svgLoading{
    animation: rotate 2s linear infinite;
    aspect-ratio: 1/1;
    width: 200px;

    > .circleLoading{
        stroke: white;
        stroke-width: 3px;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>
