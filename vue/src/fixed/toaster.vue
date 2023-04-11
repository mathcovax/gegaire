<template>
	<div class="absolute w-full h-full flex flex-col justify-end items-center p-[15px] gap-[10px]">
		<div
		v-for="toast of toasts"
		:key="toast.id"
		class="toast bg-[#333] p-[10px] z-50 max-w-full rounded-[4px] flex items-center gap-[10px]"
		>
			<Ico 
			class="scale-[1.5] pl-[2px]"
			:class="{
				'text-[green]': toast.status === true,
				'text-[red]': toast.status === false
			}"
			>
				{{ toast.status === false? "close" : "check" }}
			</Ico>

			<p class="text-[white] whitespace-nowrap max-w-full overflow-hidden text-ellipsis text-[13px]">
				{{ toast.message }}
			</p>

			<button
			class="text-[white] bg-transparent uppercase border-none"
			@click="toasterKill(toast)"
			>
				{{ $tr("btn.close") }}
			</button>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {fixedStore} from "../stores/fixed";

export default defineComponent({
	computed: {
		...mapState(fixedStore, ["toasts"])
	},
	methods: {
		...mapActions(fixedStore, ["toasterKill"])
	}
    
});
</script>

<style lang="scss" scoped>
.toast{
    animation: fade 7s forwards;

    @keyframes fade{
        90%{
            opacity: 1;
        }

        to{
            opacity: 0;
        }
    }
}
</style>
