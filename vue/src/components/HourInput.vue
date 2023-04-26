<template>
	<div
	:style="{'--fontSize': fontSize}"
	:class="{
		[theme]: true, 
		'invalid': invalidMessage !== '',
		'disabled': disabled,
		'focus': focus,
	}"
	@click="clicked"
	hour-input
	form-rules
	>  
		<div>
			<input 
			ref="input" 
			type="time"
			:value="modelValue"
			@input="inputed"
			@focus="focused" 
			@blur="blured"
			placeholder=" "
			:disabled="disabled"
			/>

			<ico
			class="icon"
			size="1.3em"
			>
				clock-outline
			</ico>

			<label
			:class="{
				'focus': focus,
				'valueNotEmpty': !focus && modelValue,
			}"
			>
				{{ label }}
			</label>
		</div>

		<div v-if="rules.length !== 0">
			<p :title="invalidMessage">
				{{ invalidMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	name: "HourInput",
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
			focus: false,
		};
	},
	methods: {
		clicked(){
			this.$refs.input.focus();
		},
		focused(event){
			this.focus = true;
			this.$refs.input.showPicker();
			this.$emit("focus", event);
		},
		blured(event){
			this.focus = false;
			this.$emit("blur", event);
			this.validate();
		},
		inputed(event){
			console.log(event.target.value);
			this.$emit("update:modelValue", event.target.value);
			if(this.invalidMessage !== ""){
				this.validate(event.target.value);
			}
			this.$emit("input", event);
		},
		validate(){
			for(const rule of this.rules){
				let result = rule(this.modelValue);
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


<style lang="scss">
div[hour-input]{
    position: relative;
    max-width: 100%;
    user-select: none;

    *{
        box-sizing: border-box;
    }

    &.green{
        --dateInput-highColor: #606C38;
        --dateInput-lowColor: #AFB59B;
    }

    &.orange{
        --dateInput-highColor: #DDA15E;
        --dateInput-lowColor: #eed0ae;
    }

    &.invalid{
        --dateInput-highColor: red;
        --dateInput-lowColor: rgba(255, 0, 0, 0.5);
    }

	input{
        width: 100%;
        border-radius: 5px;
        font-size: var(--fontSize);
        background-color: transparent;
        line-height: normal;
        border: none;
        
        &:focus {
            outline: 2px solid var(--textInput-highColor);
        }

		&::-webkit-calendar-picker-indicator {
			background: none;
		}
    }
    
    > div:nth-child(1){
		height: 34px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: normal;
        padding: 8px;
        border-radius: 5px;
        outline: 1px solid var(--dateInput-lowColor);

        &:hover{
            outline: 1px solid var(--dateInput-highColor);
        }

        > .icon{
            position: absolute;
            transform: translateY(50%);
            bottom: 50%;
            right: 8px;
            color: black;
        }
    }

    label{
        max-width: calc(100% - 16px  - 1.3em);
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        white-space: nowrap;
        font-size: var(--fontSize);
        left: 8px;
        top: 8px;
        transition: all 125ms ease-out;
        background-color: white;
        padding: 0 2px;
        color: var(--dateInput-lowColor);
        line-height: normal;
    }

    // > input{
    //     position: absolute;
    //     width: 0;
    //     height: 0;
    //     bottom: 10px;
    //     left: 0;
    //     outline: none;
    //     color: transparent;
    //     border: none;
    // }

    > div:nth-child(2){
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

    &.focus{
        .icon{
            color: var(--dateInput-highColor);
        }

        > div:nth-child(1){
            outline: 2px solid var(--dateInput-highColor);
        }

        label{
            transform: translateY(-50%);
            z-index: 1;
            top: 0;
            font-size: calc(var(--fontSize)/1.2);
            line-height: calc(var(--fontSize)/1.2);
            color: var(--dateInput-highColor);
            font-weight: 600;
        }
    }

    label.valueNotEmpty{
		transform: translateY(-50%);
		z-index: 1;
		top: 0;
		font-size: calc(var(--fontSize)/1.2);
		line-height: calc(var(--fontSize)/1.2);
		font-weight: 600;
	}
}

</style>
