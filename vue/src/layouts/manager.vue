<template>
	<div class="h-full w-full relative">
		<div 
		v-show="isOpen === true" 
		class="absolute z-10 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.30)] top-0 right-0"
		@click="isOpen = false"
		/>

		<nav 
		class="z-10 absolute transition duration-[400ms] -left-[200px] top-0 w-[200px] h-full p-[15px] pl-0 bg-[var(--green1)] rounded-r-[4px] flex justify-center items-center"
		:class="{
			'translate-x-[200px]': isOpen
		}"
		>
			<div class="absolute top-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-br-[20px] rounded-tr-[4px]"/>

			<div class="absolute bottom-0 left-0 bg-[var(--orange2)] h-[60px] w-full rounded-tr-[20px] rounded-br-[4px]"/>

			<div class="absolute top-[50px] left-[calc(100%-1px)] h-[40px] aspect-square bg-[var(--green1)] rounded-r-full flex justify-center items-center">
				<div 
				class="bg-[var(--orange1)] transition duration-[400ms] rounded-full aspect-square w-[30px] flex flex-col justify-center items-center hover:bg-5"
				:class="{
					'rotate-180': isOpen
				}"
				@click="isOpen = !isOpen"
				>
					<ico
					class="text-[white]"
					size="30px"
					>
						arrow-right-bold
					</ico>
				</div>
			</div>

			<div class="w-full h-full bg-[white] z-10 rounded-r-[4px] p-[10px] flex flex-col justify-between">
				<ul class="w-full flex flex-col gap-[10px]">
					<li>
						<ico size="25px">
							clipboard-list-outline
						</ico>

						<router-link 
						:to="{path: '/manager/planning'}"
						@click="isOpen = false" 
						class="no-underline hover:underline"
						>
							Planning
						</router-link>
					</li>
				</ul>

				<ul class="w-full flex flex-col">
					<li v-if="isAdmin === true">
						<ico size="25px">
							checkbox-multiple-marked-outline
						</ico>

						<router-link 
						to="/admin/guides" 
						class="no-underline hover:underline text-ellipsis overflow-hidden"
						>
							Administration
						</router-link>
					</li>

					<li>
						<ico size="25px">
							arrow-u-right-bottom-bold
						</ico>

						<router-link
						:to="{path: '/guide'}"
						class="no-underline hover:underline"
						>
							Retour
						</router-link>
					</li>
				</ul>
			</div>
		</nav>

		<router-view/>
	</div>
</template>

<script>
import {mapState} from "pinia";
import {defineComponent} from "vue";
import {userStore} from "../stores/user";

export default defineComponent({
	data(){
		return {
			isOpen: false,
		};
	},
	computed: {
		...mapState(userStore, ["isAdmin"]),
	}
});
</script>


<style scoped lang="scss">
nav ul{
    list-style: none;

    > li{
        display: flex;
        gap: 5px;
        align-items: center;
        
        > a{
            line-height: 1.3em;
            font-size: 1.3em;
            color: black;
        }
    }
}
</style>
