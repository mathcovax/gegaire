<template>
	<div
	form-rules
	place-input
	>
		<TextInput
		v-model="name"
		@focus="focused"
		:label="label"
		ref="input"
		name="gegaire-address"
		:class="{'invalid': invalidMessage !== ''}"
		autocomplete
		:disabled="disabled"
		/>

		<div
		class="message-div"
		v-if="rules.length !== 0"
		>
			<p :title="invalidMessage">
				{{ invalidMessage }}
			</p>
		</div>

		<div 
		v-show="isOpen === true"
		@click="isOpen = false"
		class="popup"
		>
			<div @click="$event.stopPropagation()">
				<Map
				ref="map"
				v-model="mapValue"
				/>

				<p v-if="this.mapValue.text !== undefined">
					{{ this.mapValue.text }}
				</p>

				<Btn
				@click="clicked"
				>
					{{ $tr("btn.validate") }}
				</Btn>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	name: "PlaceInput",
	props: {
		modelValue: {
			default(){
				return {};
			},
		},
		label: {
			default: "Adresse"
		},
		rules: {
			default(){
				return [];
			}
		},
		disabled: {
			default: false,
		}
	},
	emits: [
		"update:modelValue", "focus", "blur", "input"
	],
	data(){
		return {
			name: "",
			mapValue: {},
			isOpen: false,
			invalidMessage: ""
		};
	},
	watch: {
		modelValue(){
			this.init();
		},
		isOpen(){
			if(this.isOpen === false) this.validate();
		}
	},
	methods: {
		focused(e){
			e.target.blur();
			this.isOpen = true;
			this.$refs.map.resize();
		},
		clicked(){
			this.name = this.mapValue.text !== undefined ? this.mapValue.text : "";
			this.$emit("update:modelValue", this.mapValue);
			this.isOpen = false;
		},
		init(){
			if(this.modelValue?.text !== undefined){
				this.mapValue = this.modelValue;
				this.name = this.modelValue.text;
			}
		},
		validate(value = this.mapValue?.text){
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
		this.init();
	}
});
</script>

<style lang="scss">
div[place-input]{
    position: relative;
    max-width: 100%;
    padding: 0 0;

    .popup{
        z-index: 5;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        > div {
            z-index: 10;
            width: 80%;
            height: 500px;
            background: white;
            padding: 10px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 10px;

            > p {
                text-align: center;
            }
        }

        [map]{
            width: 100%;
            flex-grow: 1;
            border-radius: 4px;
            overflow: hidden;
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
