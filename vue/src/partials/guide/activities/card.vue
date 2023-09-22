<template>
	<Frame
	border="4px"
	row
	class="w-full"
	classs="p-[5px] grid grid-cols-12 gap-[5px] flex"
	>
		<b class="col-span-12 text-center">
			{{ date }}
		</b>

		<div
		v-if="work.amActivity !== null"
		class="col-span-6 flex flex-col items-center gap-[5px]"
		:class="{
			'!col-span-12': work.pmActivity === null
		}"
		>
			<h4>AM :</h4>

			<p class="text-center">
				{{ work.amActivity === true? $trr("activityNotShow"): work.amActivity.name }}
			</p>

			<b v-if="work.amLeader">
				Leader
			</b>

			<!-- <Btn
			small
			@click="$router.push(`/activity/${work.amActivity.id}`)"
			v-if="work.amActivity !== true && work.amActivity !== null && !isSame"
			>
				{{ $tr("btn.seeMore") }}
			</Btn> -->
		</div>

		<div
		v-if="work.pmActivity !== null"
		class="col-span-6 flex flex-col items-center gap-[5px]"
		:class="{
			'!col-span-12': work.amActivity === null
		}"
		>
			<h4>PM :</h4>

			<p class="text-center">
				{{ work.pmActivity === true? $trr("activityNotShow"): work.pmActivity.name }}
			</p>

			<b v-if="work.pmLeader">
				Leader
			</b>

			<!-- <Btn
			small
			@click="$router.push(`/activity/${work.pmActivity.id}`)"
			v-if="work.pmActivity !== true && work.pmActivity !== null && !isSame"
			>
				{{ $tr("btn.seeMore") }}
			</Btn> -->
		</div>

		<div class="col-span-12 flex justify-center">
			<!-- <Btn
			small
			v-if="isSame"
			@click="$router.push(`/activity/${work.pmActivity.id}`)"
			>
				{{ $tr("btn.seeMore") }}
			</Btn> -->
		</div>
	</Frame>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	props: {
		work: {}
	},
	data(){
		return {
			isOpen: false
		};
	},
	computed: {
		date(){
			let date = new Date(this.work.date);
			let day = this.$tr("/guide/availability.day")[(date.getDay() - 1) === -1 ? 6 : (date.getDay() - 1)];
			let numDay = this.work.date.split("T")[0].split("-").reverse()[0];
			return day + " " + numDay;
		},

		isSame(){
			if(
				this.work.amActivity === null || 
				this.work.pmActivity === null ||
				this.work.amActivity === true ||
				this.work.pmActivity === true
			) return false;
			else if(this.work.amActivity.id === this.work.pmActivity.id) return true;
			else return false;
		}
	},
	mounted(){
		if(this.$route.query?.date === this.work.date.split("T")[0]){
			this.$parent.$parent.$refs.scrollView.scrollTo({top: this.$el.offsetTop - 30});
			this.$router.replace({query: null});
		}
	}
});
</script>

<style scoped>
h3::first-letter{
	text-transform: uppercase;
}
</style>
