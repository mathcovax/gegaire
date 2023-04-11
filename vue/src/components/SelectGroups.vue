<template>
	<div
	class="flex flex-col"
	select-groups
	form-rules
	:class="{'invalid': invalidMessage !== ''}"
	>
		<div
		ref="sg"
		class="sg flex flex-col justify-between overflow-hidden grow"
		tabindex="0"
		>
			<Loader
			v-if="groups === false"
			class="grow overflow-hidden"
			size="70px"
			/>

			<div
			v-else
			v-for="index of qte"
			:key="index"
			class="flex h-[1.2em] justify-between"
			>
				<input
				v-if="groups[index-1] !== undefined"
				class="mr-[5px]"
				:value="groups[index-1]"
				v-model="select"
				type="checkbox"
				:disabled="
					disabled ||
						(
							max !== false &&
							select.length+1 > max &&
							select.find(value => value._id === groups[index-1]._id) === undefined
						)
				"
				:id="groups[index-1]._id"
				/>

				<label
				:for="groups[index-1]._id"
				v-if="groups[index-1] !== undefined"
				class="overflow-hidden text-ellipsis select-none"
				>
					{{ groups[index-1].name }}
				</label>
			</div>

			<div class="flex justify-center shrink">
				<Btn
				@click="getGroups(page - 1)"
				theme="none"
				icon="arrow-left"
				/>

				<Btn
				@click="getGroups(page + 1)"
				theme="none"
				icon="arrow-right"
				/>
			</div>
		</div>

		<div
		class="message-div"
		v-if="rules.length !== 0"
		>
			<p :title="invalidMessage">
				{{ invalidMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import {taob} from "../taob/";

export default defineComponent({
	name: "SelectGroups",
	props: {
		qte: {
			default: 4,
		},
		max: {
			default: false,
		}, 
		modelValue: {
			default(){
				return [];
			}
		},
		disabled: {
			default: false,
		},
		rules: {
			default(){
				return [];
			}
		}
	},
	emits: ["update:modelValue"],
	data(){
		return {
			select: this.modelValue,
			page: 0,
			groups: [],
			invalidMessage: ""
		};
	},
	watch: {
		select(){
			this.$refs.sg.focus();
			this.$emit("update:modelValue", this.select);
			this.validate();
			this.$forceUpdate();
		},
		modelValue(){
			this.select = this.modelValue;
		}
	},
	methods: {
		async getGroups(page = 0){
			page = page < 0 ? 0 : page;
			this.groups = false;
			this.groups = await taob.get(`group?skip=${page * this.qte}&take=${this.qte}`).sd();
			this.page = page;
		},
		validate(value = this.select){
			for(const rule of this.rules){
				let result = rule(value);
				if(result !== true){
					this.invalidMessage = result;
					return false;
				}
			}
			this.invalidMessage = "";
		}
	},
	mounted(){
		this.getGroups();
	}
});
</script>


<style lang="scss">
div[select-groups]{
    --sg-highColor: #606C38;
    --sg-lowColor: #AFB59B;

	&.invalid{
        --sg-highColor: red;
        --sg-lowColor: rgba(255, 0, 0, 0.5);
    }

	> .sg{
		outline: 1px solid var(--sg-lowColor);
		padding: 5px;
		border-radius: 4px;

		> input {
			margin-right: 5px;
		}

		&:hover{
			outline: 1px solid var(--sg-highColor);
		}

		&:focus{
			outline: 2px solid var(--sg-highColor);
		}
	}

	> .message-div{
        width: 100%;

        p{
            margin-top: 2px;
            font-size: 12px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            color: red;
        }
    }
}
</style>
