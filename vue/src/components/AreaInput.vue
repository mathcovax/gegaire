<template>
	<div
	:style="{'--fontSize': fontSize}"
	:class="{[theme]: true, 'invalid': invalidMessage !== ''}"
	text-textarea
	form-rules
	>
		<textarea
		type="text"
		ref="textarea"
		:value="modelValue"
		@input="inputed"
		@focus="focused" 
		@blur="blured"
		:name="name"
		:disabled="disabled"
		placeholder=" "
		wrap="soft"
		rows="1"
		/>

		<label
		@click="$refs.textarea.focus()"
		:for="name"
		>
			{{ label }}
		</label>

		<div
		v-if="rules.length !== 0"
		>
			<p :title="invalidMessage">
				{{ invalidMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "AreaInput",
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
		},
		autoGrow: {
			default: false,
		}
	},
	emits: ["update:modelValue", "focus", "blur", "input"],
	data(){
		return {
			invalidMessage: "",
		};
	},
	methods:{
		focused(event){
			this.$emit("focus", event);
			if(this.autoGrow !== false){
				this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px";
			}
		},
		blured(event){
			this.$emit("blur", event);
			this.validate();
			if(this.autoGrow !== false)this.$refs.textarea.style.height = "auto";
		},
		inputed(event){
			this.$emit("update:modelValue", event.target.value || "");
			if(this.invalidMessage !== ""){
				this.validate(event.target.value);
			}
			if(this.autoGrow !== false){
				this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px";
			}
			this.$emit("input", event);
		},
		validate(value=this.modelValue){
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
div[text-textarea]{
    position: relative;
    max-width: 100%;
    padding: 0 0;

    &:has(> textarea:disabled){
        opacity: 0.5;
    }

    *{
        box-sizing: border-box;
    }

    &.green{
        --areaInput-highColor: #606C38;
        --areaInput-lowColor: #AFB59B;
    }

    &.orange{
        --areaInput-highColor: #DDA15E;
        --areaInput-lowColor: #eed0ae;
    }

    &.invalid{
        --areaInput-highColor: red;
        --areaInput-lowColor: rgba(255, 0, 0, 0.5);
    }

    &:has(> textarea:focus){
        > label{
            transform: translateY(-50%);
            top: 0;
            font-size: calc(var(--fontSize)/1.2);
            color: var(--areaInput-highColor);
            font-weight: 600;
        }
    }

    &:has(> textarea:not(:placeholder-shown)){
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
        color: var(--areaInput-lowColor);
    }

    > textarea{
		resize: none;
        width: 100%;
        border-radius: 5px;
        padding: 8px;
        font-size: var(--fontSize);
        background-color: transparent;
        line-height: normal;
        outline: 1px solid var(--areaInput-lowColor);
        border: none;
		font-family: inherit;
		max-height: 100%;
			
        &:focus {
            outline: 2px solid var(--areaInput-highColor);
        }
    }

    &:has(> textarea:not(:disabled):not(:focus)):hover {
        > textarea{
            outline: 1px solid var(--areaInput-highColor);
        }
    }

    > div{
        width: 100%;
        height: 15px;
        font-size: 15px;

        p{
            margin-top: 2px;
            font-size: 12px;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: red;
        }
    }
}
</style>
