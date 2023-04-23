<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center p-[10px]">
		<h2 class="text-center">
			{{ $trr("title") }}
		</h2>
		
		<TextInput
		:label="$trr('labelSearchGuide')"
		v-model="name"
		/>

		<Frame
		border="4px" 
		class="grow w-full overflow-hidden lg:w-[700px]"
		classs="w-full h-full flex flex-col p-[5px] gap-[5px] overflow-y-auto items-center"
		@scroll="scrolled"
		>
			<Loader
			class="h-full"
			v-if="guides === false"
			/>

			<Card
			v-else
			v-for="guide of guides"
			:key="guide._id"
			:guide="guide"
			class="w-full shrink"
			/>

			<Loader
			size="50px"
			v-if="isFetch === true && guides !== false"
			/>
		</Frame>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import Card from "../../partials/admin/guides/card.vue";
import {taob} from "../../taob";

export default defineComponent({
	components: {
		Card
	},
	data(){
		return {
			name: "",
			guides: false,
			page: 0,
			isFetch: false,
			isAllFetch: false,
		};
	},
	watch: {
		name(){
			this.isAllFetch = false;
			this.isFetch = false;
			this.guides = false;
			this.findPage(this.page);
		}
	},
	methods: {
		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 100) && this.isFetch === false){
				this.page++;
				this.findPage(this.page);
			}
		},

		async findPage(page){
			if(this.isFetch === true || this.isAllFetch === true) return;
			this.isFetch = true;

			let result = await taob.get(`users?skip=${page * 10}&take=10&searchName=${this.name}`).sd();

			if(result === undefined || this.isFetch === false) return;

			if(this.guides === false) this.guides = [];
			this.guides = [...this.guides, ...result];

			if(result.length !== 10) this.isAllFetch = true;
			this.isFetch = false;
		},
	},
	mounted(){
		this.findPage(this.page);
	},
});
</script>


<style lang="scss" scoped>

</style>
