<template>
	<main class="absolute w-full h-full flex flex-col items-center top-0 left-0">
		<h1 class="uppercase w-full lg:text-center">
			{{ $trr("title") }}
		</h1>

		<section
		@scroll="scrolled"
		class="w-full grow overflow-y-auto flex flex-col gap-[4px] lg:w-[800px]"
		>
			<section class="daylist left-0 w-full select-none gap-[5px] sticky top-0 z-[2] bg-[white]">
				<p
				v-for="n in 7"
				:key="n"
				>
					{{ $trr("day")[n-1] }}
				</p>
			</section>

			<Week
			v-for="week in weeks"
			:key="week-1"
			:week="week-1"
			/>
		</section>

		<DayBar/>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import Week from "../../partials/guide/availability/week.vue";
import DayBar from "../../partials/guide/availability/dayBar.vue";
import {mapActions} from "pinia";
import {availabilityStore} from "../../stores/availability";

export default defineComponent({
	components: {
		Week,
		DayBar
	},
	data(){
		return {
			weeks: 10,
		};
	},
	computed: {
        
	},
	methods: {
		...mapActions(availabilityStore, ["purgeAvailabilityStore"]),

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 100) && this.weeks <= 24){
				this.weeks++;
			}
		}
	},
	unmounted(){
		this.purgeAvailabilityStore();
	}
});
</script>


<style lang="scss" scoped>
.daylist {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    > p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        
        &:first-letter {
            text-transform: uppercase;
        }
    }
}
</style>
