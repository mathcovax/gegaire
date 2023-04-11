<template>
	<main class="w-full h-full flex flex-col gap-[15px] items-center p-[10px]">
		<h2>{{ $trr("title") }}</h2>

		<Frame
		class="w-[70%] shrink"
		>
			<Form 
			class="flex flex-col gap-[2px] w-full h-full p-[10px]"
			@submit="submited"
			>
				<TextInput
				:label="$trr('labelCreate')"
				:rules="rulesName"
				class="w-full"
				v-model="nameCreate"
				/>

				<Btn
				class="w-full"
				type="submit"
				:loading="isBtnCreateLoading"
				>
					{{ $trr("btnCreate") }}
				</Btn>
			</Form>
		</Frame>

		<Frame 
		border="4px" 
		class="grow w-full overflow-hidden"
		classs="w-full h-full flex flex-col p-[5px] gap-[5px] overflow-y-auto items-center"
		@scroll="scrolled"
		>
			<Loader
			class="h-full"
			v-if="groups === false"
			/>

			<Card
			v-else
			v-for="group of groups"
			:key="group.id"
			:group="group"
			@delete="deleteGroup"
			@edit="editGroup"
			class="w-full shrink"
			/>

			<Loader
			size="50px"
			v-if="isFetch === true && groups !== false"
			/>
		</Frame>
	</main>
</template>

<script>
import {defineComponent} from "vue";
import Card from "../../partials/admin/groups/card.vue";
import {fixedStore} from "../../stores/fixed";
import {taob} from "../../taob";

export default defineComponent({
	components: {
		Card
	},
	data(){
		return {
			nameCreate: "",
			isBtnCreateLoading: false,
			groups: false,
			page: 0,
			isFetch: false,
			isAllFetch: false,
		};
	},
	computed: {
		rulesName(){
			return [
				this.$rules.required,
				(value) => this.$rules.minLength(4, value),
				(value) => this.$rules.maxLength(20, value),
			];
		}
	},
	methods: {
		async submited(){
			this.isBtnCreateLoading = true;

			if(await this.createGroups(this.nameCreate)){
				this.nameCreate = "";

				this.groups = false;
				this.isAllFetch = false;
				this.page = 0;
				this.findPage(0);
			}
			this.isBtnCreateLoading = false;
		},

		scrolled(e){
			if(e.target.scrollTop >= (e.target.scrollHeight - e.target.clientHeight - 100) && this.isFetch === false){
				this.page++;
				this.findPage(this.page);
			}
		},

		async findPage(page){
			if(this.isFetch === true || this.isAllFetch === true) return;
			this.isFetch = true;

			let result = await taob.get(`group?skip=${page * 10}&take=10`).sd();
			if(this.groups === false) this.groups = [];
			this.groups = [...this.groups, ...result];

			if(result.length !== 10) this.isAllFetch = true;
			this.isFetch = false;
		},

		async createGroups(name){
			let {close} = fixedStore().requestLoader();
			try {
				await taob.post("group", {group_name: name}).sd();
				return true;
			}
			catch {
				return false;
			}
			finally {
				close();
			}
		},

		async deleteGroup(id){
			let {close} = fixedStore().requestLoader();
			await taob.delete("group/" + id).info(() => close()).sd();
			this.groups = this.groups.filter(value => value.id !== id);
		},

		async editGroup(id, name){
			let {close} = fixedStore().requestLoader();
			await taob.patch("group", {group_id: id, group_name: name}).info(() => close()).sd();
			let index = this.groups.findIndex(value => value.id === id);
			this.groups[index].name = name;
			this.groups = [...this.groups];
		}
	},
	mounted(){
		this.findPage(this.page);
	},
});
</script>


<style>

</style>
