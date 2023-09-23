<template>
	<div
	class="fixed h-full w-full bg-[rgba(0,0,0,0.25)] flex justify-center items-center top-0 left-0 z-10"
	@click="closeMenu"
	>
		<Frame
		border="4px"
		class="lg:w-auto w-[90%]"
		classs="flex flex-col p-[10px] gap-[10px]"
		@click="$event.stopPropagation()"
		>
			<h2 class="text-center">
				{{ date }}
			</h2>

			<div class="flex gap-[10px] justify-around items-center">
				<p class="max-w-[45%] overflow-hidden text-ellipsis">
					{{ user.name }}
				</p>

				<div class="flex gap-[5px] overflow-hidden justify-end">
					<div class="flex flex-col justify-between overflow-hidden">
						<div
						v-if="availability.am === true"
						class="whitespace-nowrap overflow-hidden text-ellipsis text-right"
						>
							<router-link
							v-if="work?.amActivity"
							:to="'/manager/activities/' + work.amActivity.id + '/place'"
							>
								{{ work.amActivity.name }}
							</router-link>

							<p v-else>
								{{ $tr("placeActivity.placeAvailable") }}
							</p>
						</div>

						<p
						v-else-if="availability.am === null"
						class="whitespace-nowrap overflow-hidden text-ellipsis text-right"
						>
							{{ $tr("placeActivity.placeMaybeAvailable") }}
						</p>

						<p
						v-else
						class="text-right"
						>
							{{ $tr("placeActivity.placeUnAvailable") }}
						</p>

						<div
						v-if="availability.pm === true"
						class="whitespace-nowrap overflow-hidden text-ellipsis text-right"
						>
							<router-link
							v-if="work?.pmActivity"
							:to="'/manager/activities/' + work.pmActivity.id + '/place'"
							>
								{{ work.pmActivity.name }}
							</router-link>

							<p v-else>
								{{ $tr("placeActivity.placeAvailable") }}
							</p>
						</div>

						<p
						v-else-if="availability.am === null"
						class="whitespace-nowrap overflow-hidden text-ellipsis text-right"
						>
							{{ $tr("placeActivity.placeMaybeAvailable") }}
						</p>

						<p
						v-else
						class="text-right"
						>
							{{ $tr("placeActivity.placeUnAvailable") }}
						</p>
					</div>

					<div class="h-[40px] w-[20px] relative rounded-[4px] overflow-hidden p-[5px]">
						<div
						:class="{
							'bg-[green]': availability.am === true,
							'bg-[red]': availability.am === false,
							'bg-[orange]': availability.am === null,
						}"
						class="absolute top-0 left-0 w-full h-[50%] text-center"
						>
							<p v-if="work?.amActivity">
								{{ work.amLeader ? "L" : "G" }}
							</p>
						</div>

						<div
						:class="{
							'bg-[green]': availability.pm === true,
							'bg-[red]': availability.pm === false,
							'bg-[orange]': availability.pm === null,
						}"
						class="absolute bottom-0 left-0 w-full h-[50%] text-center"
						>
							<p v-if="work?.pmActivity">
								{{ work.pmLeader ? "L" : "G" }}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div v-if="availability.note">
				<u>Note</u> : {{ availability.note }}
			</div>
			
			<Btn
			v-if="!work && new Date(this.availability?.date).getTime() > Date.now()"
			@click="openEditAvailabilityMenu(this.availability.id).then(closeMenu)"
			class="self-center"
			>
				{{ $tr("btn.edit") }}
			</Btn>
		</Frame>
	</div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {defineComponent} from "vue";
import {availabilitysManagerStore} from "./availabilitysManagerStore";

export default defineComponent({
	computed: {
		...mapState(availabilitysManagerStore, ["availability"]),
		
		date(){
			const date = new Date(this.availability.date);

			return this.$tr("/guide/availability.day")[date.getDay()]
				+ " " + date.getDate() 
				+ " " + this.$tr("/guide/availability.month")[date.getMonth()] 
				+ " " + date.getFullYear();
		},

		user(){
			return this.availability.user;
		},

		work(){
			return this.availability.work;
		}
	},
	methods: {
		...mapActions(availabilitysManagerStore, ["closeMenu", "openEditAvailabilityMenu"]),
	},
	mounted(){
		
	}
});
</script>

<style>

</style>
