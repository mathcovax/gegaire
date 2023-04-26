<template>
	<div
	:style="{'--fontSize': fontSize}"
	:class="{
		[theme]: true, 
		'invalid': invalidMessage !== '', 
		'disabled': disabled,
		'focus': focus,
	}"
	text-input
	form-rules
	>
		<input 
		:type="type"
		ref="input"
		:value="modelValue"
		@input="inputed"
		@focus="focused" 
		@blur="blured"
		:name="name"
		:disabled="disabled"
		placeholder=" "
		:class="{[classInput]: true}"
		:autocomplete="autocompleteOff === true ? autocomplete : 'new-password'"
		/>

		<label
		@click="$refs.input.focus()"
		:for="name"
		:class="{
			'focus': focus,
			'valueNotEmpty': !focus && modelValue,
		}"
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

		<slot/>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	name: "TextInput",
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
		type: {
			default: "text"
		},
		classInput: {
			default: ""
		},
		rules: {
			default(){
				return [];
			}
		},
		disabledAutoRules: {
			default: false
		},
		autocompleteOff: {
			default: true
		},
		autocomplete: {
			default: "on"
		}
	},
	emits: [
		"update:modelValue", "focus", "blur", "input"
	],
	data(){
		return {
			invalidMessage: "",
			random: Math.random(),
			focus: false,
		};
	},
	methods: {
		focused(event){
			this.focus = true;
			this.$emit("focus", event);
		},
		blured(event){
			this.focus = false;
			this.$emit("blur", event);
			if(this.disabledAutoRules === false) this.validate();
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
	},
	mounted(){
		this.$el.formElement = this;
	}
});
</script>

<style lang="scss" scoped>
div[text-input]{
    position: relative;
    max-width: 100%;
    padding: 0 0;

    &.disabled{
        opacity: 0.5;
    }

    *{
        box-sizing: border-box;
    }

    &.green{
        --textInput-highColor: #606C38;
        --textInput-lowColor: #AFB59B;
    }

    &.orange{
        --textInput-highColor: #DDA15E;
        --textInput-lowColor: #eed0ae;
    }

    &.invalid{
        --textInput-highColor: red;
        --textInput-lowColor: rgba(255, 0, 0, 0.5);
    }

    label.focus{
		transform: translateY(-50%);
		top: 0;
		font-size: calc(var(--fontSize)/1.2);
		color: var(--textInput-highColor);
		font-weight: 600;
	}

    label.valueNotEmpty{
		transform: translateY(-50%);
		top: 0;
		font-size: calc(var(--fontSize)/1.2);
		font-weight: 600;
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
        color: var(--textInput-lowColor);
    }

    > input{
        width: 100%;
        border-radius: 5px;
        padding: 8px;
        font-size: var(--fontSize);
        background-color: transparent;
        line-height: normal;
        outline: 1px solid var(--textInput-lowColor);
        border: none;
        
        &:focus {
            outline: 2px solid var(--textInput-highColor);
        }
    }

    &:not(.disabled):not(.focus):hover {
        > input{
            outline: 1px solid var(--textInput-highColor);
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
