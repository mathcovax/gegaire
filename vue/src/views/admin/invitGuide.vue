<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center p-[10px]">
		<h2 class="text-center">
			{{ $trr("title") }}
		</h2>

		<Btn
		icon="link-variant-plus"
		@click="showCreateLinkPopup = true"
		>
			{{ $trr("btnAddLink") }}
		</Btn>
		
		<TextInput
		:label="$trr('labelSearchLink')"
		v-model="email"
		/>

		<Frame
		border="4px" 
		class="grow w-full overflow-hidden"
		classs="w-full h-full flex flex-col p-[5px] gap-[5px] overflow-y-auto items-center"
		@scroll="scrolled"
		>
			<Loader
			class="h-full"
			v-if="links === false"
			/>

			<Card
			v-else
			v-for="link of links"
			:link="link"
			@refresh="refresh"
			class="w-full shrink"
			/>

			<Loader
			size="50px"
			v-if="isFetch === true && links !== false"
			/>
		</Frame>

		<CreateLinkPopup
		:isOpen="showCreateLinkPopup"
		@close="showCreateLinkPopup = $event === null? null : false"
		/>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import CreateLinkPopup from "../../partials/admin/invitGuide/createLinkPopup.vue";
import Card from "../../partials/admin/invitGuide/card.vue";
import {taob} from "../../taob";

export default defineComponent({
	components: {
		CreateLinkPopup,
		Card
	},
	data(){
		return {
			email: "",
			links: false,
			page: 0,
			isFetch: false,
			isAllFetch: false,

			showCreateLinkPopup: false
		};
	},
	watch: {
		email(){
			this.refresh();
		},
		showCreateLinkPopup(){
			if(this.showCreateLinkPopup === null){
				this.refresh();
				this.showCreateLinkPopup = false;
			}
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

			let result = await taob.get(`links?skip=${page * 10}&take=10&searchEmail=${this.email.toLocaleLowerCase()}`).sd();

			if(result === undefined || this.isFetch === false) return;

			if(this.links === false) this.links = [];
			this.links = [...this.links, ...result];

			if(result.length !== 10) this.isAllFetch = true;
			this.isFetch = false;
		},
		refresh(){
			this.isAllFetch = false;
			this.isFetch = false;
			this.links = false;
			this.findPage(0);
		}
	},
	mounted(){
		this.findPage(this.page);
	},
});
</script>


<style lang="scss" scoped>

</style>
