<template>
	<div
	:style="{'--size': size, '--size-stroke': sizeStroke}"
	:class="{['theme-' + theme]: true}"
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
import { defineComponent } from "vue";

export default defineComponent({
	name: "Loader",
	props: {
		theme: {
			type: String,
			default: "orange"
		},
		size: {
			type: String,
			default: "100px",
		},
		sizeStroke: {
			type: String,
			default: "3px",
		}
	},

});
</script>

<style lang="scss" scoped>
div{
    display: flex;
    justify-content: center;
    align-items: center;

    &.theme-orange{
        --theme-stroke-color: var(--orange1);
    }

    &.theme-green{
        --theme-stroke-color: var(--green1);
    }

    &.theme-black{
        --theme-stroke-color: black;
    }

    .svgLoading{
        animation: rotate 2s linear infinite;
        aspect-ratio: 1/1;
        width: var(--size);

        > .circleLoading{
            stroke: white;
            stroke-width: 3px;
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
            stroke: var(--theme-stroke-color);
            stroke-width: var(--size-stroke);
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
}
</style>
