<template>
	<div
	:style="{'--fontSize': fontSize}"
	:class="{[theme]: true, 'invalid': invalidMessage !== ''}"
	number-input
	form-rules
	>
		<input 
		type="number"
		ref="input"
		:value="modelValue"
		@input="inputed"
		@focus="focused" 
		@blur="blured"
		:name="name"
		:disabled="disabled"
		placeholder=" "
		/>

		<label
		@click="$refs.input.focus()"
		:for="name"
		>
			{{ label }}
		</label>

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

export default defineComponent({
	name: "NumberInput",
	props: {
		modelValue: {
			default: ""
		},
		label: {
			default: "label"
		},
		theme: {
			default: "green"
		},
		fontSize: {
			default: "1em"
		},
		name: {
			default: ""
		},
		disabled: {
			default: false
		},
		rules: {
			default(){
				return [];
			}
		}
	},
	emits: [
		"update:modelValue", "focus", "blur", "input"
	],
	data(){
		return {
			invalidMessage: "",
		};
	},
	methods: {
		focused(event){
			this.$emit("focus", event);
		},
		blured(event){
			this.$emit("blur", event);
			this.validate();
		},
		inputed(event){
			this.$emit("update:modelValue", event.target.value);
			if(this.invalidMessage !== ""){
				this.validate(event.target.value);
			}
			this.$emit("input", event);
		},
		validate(value = this.modelValue){
			for(const rule of this.rules){
				let result = rule(value);
				if(result !== true){
					this.invalidMessage = result;
					return false;
				}
			}
			this.invalidMessage = "";
		}
	}
});
</script>

<style lang="scss" scoped>
div[number-input]{
    position: relative;
    max-width: 100%;
    padding: 0 0;

    &:has(> input:disabled){
        opacity: 0.5;
    }

    *{
        box-sizing: border-box;
    }

    &.green{
        --numberInput-highColor: #606C38;
        --numberInput-lowColor: #AFB59B;
    }

    &.orange{
        --numberInput-highColor: #DDA15E;
        --numberInput-lowColor: #eed0ae;
    }

    &.invalid{
        --numberInput-highColor: red;
        --numberInput-lowColor: rgba(255, 0, 0, 0.5);
    }

    &:has(> input:focus){
        > label{
            transform: translateY(-50%);
            top: 0;
            font-size: calc(var(--fontSize)/1.2);
            color: var(--numberInput-highColor);
            font-weight: 600;
        }
    }

    &:has(> input:not(:placeholder-shown)){
        > label{
            transform: translateY(-50%);
            top: 0;
            font-size: calc(var(--fontSize)/1.2);
            font-weight: 600;
        }
    }

    > label{
        max-width: calc(100% - 16px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: absolute;
        font-size: var(--fontSize);
        left: 8px;
        top: 8px;
        transition: all 125ms ease-out;
        background-color: white;
        padding: 0 2px;
        user-select: none;
        cursor: text;
        color: var(--numberInput-lowColor);
    }

    > input{
        width: 100%;
        border-radius: 5px;
        padding: 8px;
        font-size: var(--fontSize);
        background-color: transparent;
        line-height: normal;
        outline: 1px solid var(--numberInput-lowColor);
        border: none;
        
        &:focus {
            outline: 2px solid var(--numberInput-highColor);
        }
    }

    &:has(> input:not(:disabled):not(:focus)):hover {
        > input{
            outline: 1px solid var(--numberInput-highColor);
        }
    }

    > div{
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
