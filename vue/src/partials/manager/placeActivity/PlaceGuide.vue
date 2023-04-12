<template>
	<div
	@click="SET_SELECT_GUIDE(false)"
	class="absolute w-full h-full top-0 bg-[rgba(0,0,0,0.30)] flex justify-center items-center"
	>
		<Frame
		@click="$event.stopPropagation()"
		border="4px"
		class="w-[90%]"
		classs="p-[10px]"
		>
			<Loader
			v-if="guide === false"
			/>

			<div
			v-else
			class="w-full h-full flex flex-col gap-[10px] items-center"
			>
				<div class="flex justify-between w-full">
					<p>{{ guide.name }}</p>

					<div class="flex gap-[5px]">
						<div class="flex flex-col justify-between">
							<p v-if="guide.am === true">
								{{ guide.work.am === false? $tr("placeActivity.placeAvailable") : guide.work.am.name }}
							</p>

							<p v-else>
								{{ $tr("placeActivity.placeUnAvailable") }}
							</p>

							<p v-if="guide.pm === true">
								{{ guide.work.pm === false? $tr("placeActivity.placeAvailable") : guide.work.pm.name }}
							</p>

							<p v-else>
								{{ $tr("placeActivity.placeUnAvailable") }}
							</p>
						</div>

						<div>
							<div class="h-[40px] w-[20px] relative rounded-[4px] overflow-hidden p-[5px] ">
								<div
								:class="{
									'bg-[green]': guide.am === true,
									'bg-[red]': guide.am === false,
									'bg-[orange]': guide.am === null,
								}"
								class="absolute top-0 left-0 w-full h-[50%]"
								/>

								<div
								:class="{
									'bg-[green]': guide.pm === true,
									'bg-[red]': guide.pm === false,
									'bg-[orange]': guide.pm === null,
								}"
								class="absolute bottom-0 left-0 w-full h-[50%]"
								/>

								<div class="relative h-full w-full bg-[white] rounded-[4px] flex">
									<div
									v-if="guide.work.am !== false"
									:class="{
										'bg-[green]': guide.work.am === activity._id,
										'bg-[red]': guide.work.am !== activity._id,
									}"
									class="absolute top-0 left-0 w-full h-[50%]"
									/>

									<div
									v-if="guide.work.pm !== false"
									:class="{
										'bg-[green]': guide.work.pm === activity._id,
										'bg-[red]': guide.work.pm !== activity._id,
									}"
									class="absolute bottom-0 left-0 w-full h-[50%]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
				v-if="guide.note !== ''"
				class="flex w-full gap-[5px]"
				>
					<p>
						{{ $tr("placeActivity.placeNote") }} :
					</p>

					<p class="grow overflow-y-auto max-h-[150px]">
						{{ guide.note }}
					</p>
				</div>

				<div class="flex items-center w-full justify-between">
					<div
					class="flex gap-[5px]"
					:class="{'invisible': !((guide.am === true && guide.work.am === false) || (guide.pm === true && guide.work.pm === false))}"
					>
						<p>Leader :</p>

						<input type="checkbox"/>
					</div>
					
					<div class="flex gap-[10px] justify-center">
						<AvailableBtn
						class="h-[30px]"
						:class="{'invisible': guide.am === false || guide.pm === false || guide.work.am !== false || guide.work.pm !== false}"
						@click="am = true; pm = true"
						:am="true"
						:pm="true"
						:check="am === true && pm === true"
						/>

						<AvailableBtn
						:class="{'invisible': guide.am === false || guide.work.am !== false}"
						class="h-[30px]"
						@click="am = true; pm = false"
						:am="true"
						:pm="null"
						:check="am === true && pm === false"
						/>

						<AvailableBtn
						:class="{'invisible': guide.pm === false || guide.work.pm !== false}"
						class="h-[30px]"
						@click="am = false; pm = true"
						:am="null"
						:pm="true"
						:check="am === false && pm === true"
						/>
					</div>
				</div>

				<Btn
				v-if="(guide.am === true && guide.work.am === false) || (guide.pm === true && guide.work.pm === false)"
				small
				>
					{{ $tr("btn.validate") }}
				</Btn>

				<Btn
				v-if="isInActivity === true"
				small
				>
					{{ $tr("btn.remove") }}
				</Btn>
			</div>
		</Frame>
	</div>
</template>

<script>

import {defineComponent} from "vue";
import AvailableBtn from "@/components/AvailableBtn.vue";

export default defineComponent({
	components: {
		AvailableBtn
	},
	data(){
		return {
			guide: false,

			am: false,
			pm: false,
			leader: false,

			isInActivity: false
		};
	},
	computed: {

	},
	methods: {

		async init(){
			let date = new Date(this.activity.date);

			let info = await get(
				"/guide/availability/" + 
				(date.getMonth() + 1) + "-" + date.getFullYear() + 
				"/day/" + 
				date.getDate() + 
				"/" +
				this.selectGuide._id
			)
			.sd();

			info.day.name = info.name;
			info = info.day;

			if(info.work.am !== false && info.work.am !== this.activity._id) await this.getActivity(info.work.am);
			else if(info.work.am !== false && info.work.am === this.activity._id)info.work.am = this.activity;

			if(info.work.pm !== false && info.work.pm !== this.activity._id) await this.getActivity(info.work.pm);
			else if(info.work.pm !== false && info.work.pm === this.activity._id)info.work.pm = this.activity;
			
			let guideParameter = this.guidesSelect.find(value => value.guide._id === info._id);

			this.isInActivity = guideParameter ? true : false;

			this.leader = guideParameter?.leader || false;
			this.am = guideParameter?.am || false;
			this.pm = guideParameter?.pm || false;

			this.guide = info;
		},

		async getActivity(_id){
			return await get("/activity/info/" + _id).sd();
		}
	},
	mounted(){
		this.init();
	}
});
</script>


<style>

</style>
