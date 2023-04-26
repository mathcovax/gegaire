<template>
	<div
	select-input
	:style="{'--fontSize': fontSize}"
	:class="{[theme]: true, 'invalid': invalidMessage !== '', 'disabled': disabled}"
	tabindex="0"
	@click="isOpen = true"
	@blur="isOpen = false"
	ref="div"
	form-rules
	>	
		<div
		class="input"
		:name="name"
		>
			<p class="value">
				{{ value !== undefined? itemText(value) : "" }}
			</p>

			<p class="transparent">
				yolo
			</p>

			<div>
				<ico
				class="icon"
				:size="fontSize"
				>
					{{ isOpen === true? "chevron-up" : "chevron-down" }}
				</ico>

				<ico
				class="icon"
				:size="fontSize"
				v-if="value"
				@click="selectValue($event, undefined)"
				>
					close
				</ico>
			</div>

			<label
			:for="name"
			class="label"
			:value="value"
			>
				{{ label }}
			</label>
		</div>

		<div
		class="message-div"
		v-if="rules.length !== 0"
		>
			<p :title="invalidMessage">
				{{ invalidMessage }}
			</p>
		</div>

		<div
		class="box"
		v-if="isOpen === true"
		>
			<p
			class="item"
			v-for="item of items"
			@click="selectValue($event, item)"
			>
				{{ itemText(item) }}
			</p>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	name: "SelectInput",
	props: {
		modelValue: {
			default: ""
		},
		label: {
			default: "label"
		},
		items: {
			default(){
				return [];
			}
		},
		theme: {
			default: "green"
		},
		itemText: {
			default(){
				return value => value;
			}
		},
		fontSize: {
			default: "1em"
		},
		name: {
			default: ""
		},
		rules: {
			default(){
				return [];
			}
		},
		disabled: {
			default: false
		},
	},
	emits: ["update:modelValue"],
	data(){
		return {
			value: undefined,
			isOpen: false,
			invalidMessage: "",
		};
	},
	watch: {
		modelValue(){
			this.value = this.modelValue;
		}
	},
	methods: {
		selectValue(e, value){
			e.stopPropagation();

			this.value = value;
			this.$refs.div.blur();
			this.$emit("update:modelValue", value);
			this.validate();
		},
		validate(value = this.value){
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
		this.value = this.modelValue;
		this.$el.formElement = this;
	}
});
</script>

<style lang="scss">
div[select-input]{
	position: relative;
    max-width: 100%;
    padding: 0 0;
	display: flex;
	flex-direction: column;
	user-select: none;

    &:has(> input:disabled){
        opacity: 0.5;
    }

    *{
        box-sizing: border-box;
    }

    &.green{
        --selectInput-highColor: #606C38;
        --selectInput-lowColor: #AFB59B;
    }

    &.orange{
        --selectInput-highColor: #DDA15E;
        --selectInput-lowColor: #eed0ae;
    }

    &.invalid{
        --selectInput-highColor: red;
        --selectInput-lowColor: rgba(255, 0, 0, 0.5);
    }

	&:hover > .input{
		outline: 1px solid var(--selectInput-highColor);

		> .label{
			color: var(--selectInput-highColor);
		}
	}

	&:focus > .input{
		outline: 2px solid var(--selectInput-highColor);

		> .label{
			transform: translateY(-50%);
			top: 0;
			font-size: calc(var(--fontSize)/1.2);
			color: var(--selectInput-highColor);
			font-weight: 600;
		}
	}

	> .input{
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
        border-radius: 5px;
		padding: 6px 4px;
        font-size: var(--fontSize);
        background-color: transparent;
        line-height: normal;
        outline: 1px solid var(--selectInput-lowColor);
        border: none;

		> .value {
			padding-left: 4px;
			max-width: calc(100% - var(--fontSize));
			overflow-x: hidden;
			text-overflow: ellipsis;
		}

		> .transparent{
			position: relative;
			color: transparent;
			width: 0;
		}
		
		> .label{
			max-width: calc(100% - 16px);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			position: absolute;
			font-size: var(--fontSize);
			left: 8px;
			top: calc(var(--fontSize) / 2 - 2px);
			transition: all 125ms ease-out;
			background-color: white;
			padding: 0 2px;
			cursor: text;
			color: var(--selectInput-lowColor);

			&[value]:not([value=""]){
				transform: translateY(-50%);
				top: 0;
				font-size: calc(var(--fontSize)/1.2);
				font-weight: 600;
			}
		}
	}

	> .box {
		position: fixed;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		transform: translateY(4px);
		width: inherit;
		border: 1px solid gray;
		max-height: 100px;
		background-color: #fff;
		z-index: 2;

		&::-webkit-scrollbar{
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background-color: white;
		}

		&::-webkit-scrollbar-thumb{
			background: gray;
			border-radius: 10px;
			border: 2px solid white;
		}

		> .item{
			width: inherit;
			
			&:hover{
				background: rgba($color: #000, $alpha: 0.1);
				
			}
		}
	}

	> .message-div{
        width: 100%;
        font-size: 15px;

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
