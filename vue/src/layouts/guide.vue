<template>
	<div class="h-full w-full relative">
		<div 
		v-show="isOpen === true" 
		class="z-10 absolute w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.30)] top-0 right-0"
		@click="isOpen = false"
		/>

		<nav 
		class="bg-[var(--green1)] rounded-b-[4px] fixed max-w-full w-[400px] flex justify-center items-start pb-[10px] px-[10px] z-10"
		:class="{'open': isOpen}"
		>
			<div class="absolute top-0 left-0 bg-[var(--orange2)] h-full w-[50px] rounded-br-[20px] rounded-bl-[4px]"/>

			<div class="absolute top-0 right-0 bg-[var(--orange2)] h-full w-[50px] rounded-bl-[20px] rounded-br-[4px]"/>

			<div class="absolute right-[50px] bottom-[-25px] h-[25px] w-[50px] bg-[var(--green1)] overflow-x-visible rounded-b-full flex justify-center">
				<div 
				class="bg-[var(--orange2)] h-[20px] w-[40px] rounded-b-full transition flex justify-center hover:bg-[var(--orange1)]" 
				:class="{'flex-row-reverse': isOpen}" 
				@click="isOpen = !isOpen"
				>
					<div class="rounded-full h-[5px] w-[15px] bg-[white] rotate-45 mt-[6px] mx-[-3px]"/>

					<div class="rounded-full h-[5px] w-[15px] bg-[white] -rotate-45 mt-[6px] mx-[-3px]"/>
				</div>
			</div>

			<ul class="m-0 bg-[white] w-full rounded-b-[4px] p-[10px] relative flex flex-col justify-center items-start gap-[8px]">
				<li>
					<ico size="25px">
						calendar-account
					</ico>

					<router-link 
					to="/guide/availability"
					@click="isOpen = false" 
					class="no-underline hover:underline"
					>
						{{ $tr("layouts.guide.availability") }}
					</router-link>
				</li>

				<li>
					<ico size="25px">
						archive-outline
					</ico>

					<router-link 
					to="/guide/activities" 
					@click="isOpen = false" 
					class="no-underline hover:underline"
					>
						{{ $tr("layouts.guide.activity") }}
					</router-link>
				</li>

				<li>
					<ico size="25px">
						account
					</ico>

					<router-link 
					to="/guide" 
					@click="isOpen = false"
					class="no-underline hover:underline"
					>
						{{ $tr("layouts.guide.account") }}
					</router-link>
				</li>

				<li v-if="isManager === true">
					<ico size="25px">
						clipboard-list-outline
					</ico>

					<router-link 
					to="/manager/planning"
					class="no-underline hover:underline"
					>
						{{ $tr("layouts.guide.planning") }}
					</router-link>
				</li>

				<li v-if="isAdmin === true">
					<ico size="25px">
						checkbox-multiple-marked-outline
					</ico>

					<router-link 
					to="/admin/guides" 
					class="no-underline hover:underline"
					>
						{{ $tr("layouts.guide.admin") }}
					</router-link>
				</li>
			</ul>
		</nav>

		<router-view/>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {mapState} from "pinia";
import {userStore} from "../stores/user";


export default defineComponent({
	data(){
		return {
			isOpen: false,
		};
	},
	computed: {
		...mapState(userStore, ["isManager", "isAdmin"])
	}
});
</script>


<style lang="scss" scoped>
nav{
    top: 0;
    left: 0;
    transform: translateY(-100%);
    transition: all 0.5s ease-in-out;

    &.open{
        transform: translateY(0);
    }

    > ul{
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
}
</style>
