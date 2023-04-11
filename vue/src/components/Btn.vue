<template>
	<div>
		<button
		@click="clicked"
		:class="{[theme] : true, 'icon-only': icon && !$slots.default, 'small': small !== false}"
		:style="{'--icon-padding': iconPadding}"
		:disabled="disabled"
		:type="type"
		>
			<svg
			v-if="loading"
			class="svgLoading"
			viewBox="0 0 50 50"
			>
				<circle
				class="circleLoading"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				/>
			</svg>

			<div
			class="content"
			:style="{'color': loading? 'transparent' : ''}"
			>
				<Ico
				v-if="icon"
				:size="iconSize"
				>
					{{ icon }}
				</Ico>

				<p 
				v-if="$slots.default"
				:style="{'margin-left': icon? '5px' : ''}"
				class="text"
				>
					<slot/>
				</p>
			</div>
		</button>

		<div 
		v-if="isPopupShow !== false" 
		class="popup"
		>
			<Frame
			border="5px"
			bread="20px"
			>
				<h2>{{ popup.title }}</h2>

				<i>{{ popup.subTitle }}</i>

				<div>
					<Btn 
					@click="popup._resolve(false)"
					theme="orange"
					>
						{{ $tr("btn.no") }}
					</Btn>

					<Btn 
					@click="popup._resolve(true)"
					>
						{{ $tr("btn.yes") }}
					</Btn>
				</div>
			</Frame>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "Btn",
	props: {
		icon: {
			type: String,
			default: "",
			required: false
		},
		iconSize: {
			type: String,
			default: "18px",
			required: false
		},
		iconPadding: {
			type: String,
			default: "8px",
			required: false
		},
		theme: {
			type: String,
			default: "green",
			required: false
		},
		small: {
			default: false,
			required: false
		},
		disabled: {
			default: false
		},
		loading: {
			default: false
		},
		popup: {
			default: false
		},
		type: {
			default: "button"
		}
	},
	emits: ["click"],
	data(){
		return {
			isPopupShow: false
		};
	},
	methods: {
		async clicked(event){
			if(this.loading === true)return;

			if(this.popup !== false){
				this.isPopupShow = true;
				let result = await new Promise((resolve) => {
					this.popup._resolve = resolve;
				});
				this.isPopupShow = false;
				if(result === false)return;
			}

			this.$emit("click", event);
		},
	},
});
</script>

<style lang="scss" scoped>
div{

    > button{
        *{
            box-sizing: border-box;   
        }

        position: relative;
        padding: 0 16px;
        height: 36px;
        width: 100%;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 5px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
        transition: 
            filter 300ms ease-out,
            scale 150ms ease-out,
            transform 100ms ease-out, 
            box-shadow 100ms ease-out;

        > .content{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &:disabled{
            opacity: 0.5;
        }

        &.small{
            padding: 0 12px;
            height: 27px;

            p{
                letter-spacing: 0.025em;
                font-size: 0.75em;
            }
        }

        &.green{
            background-color: #606C38;
            color: white;

            &:hover{
                filter: brightness(1.15);
            }
        }

        &.orange{
            background-color: #DDA15E;
            color: white;

            &:hover{
                filter: brightness(0.90);
            }
        }

        &.red{
            background-color: #8B0000;
            color: white;

            &:hover{
                filter: brightness(0.90);
            }
        }

        &.none{
            padding: 2px 2px;
            height: auto;
            background-color: transparent;
            color: black;
            box-shadow: 0 0 0 0;

            &:hover{
                scale: 1.03;
            }

            &:active{
                scale: 0.97;
            }
        }

        &.icon-only{
            padding: 0 var(--icon-padding);
            height: auto;
            aspect-ratio: 1/1;
        }

        &:active:not([disabled]){
            transform: translateY(2px);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
        }

        .text{
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 1em;
            white-space: nowrap;
            margin: 0;
        }

        .svgLoading{
            position: absolute;
            animation: rotate 2s linear infinite;
            aspect-ratio: 1/1;
            height: 80%;

            > .circleLoading{
                stroke: white;
                stroke-width: 3px;
                stroke-linecap: round;
                animation: dash 1.5s ease-in-out infinite;
                stroke: white;
                stroke-width: 5px;
            }
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes dash {
            0% {
                stroke-dasharray: 1, 150;
                stroke-dashoffset: 0;
            }
            50% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -35;
            }
            100% {
                stroke-dasharray: 90, 150;
                stroke-dashoffset: -124;
            }
        }
    }

    .popup:deep(){
        position: fixed;
        background: rgba($color: #000000, $alpha: 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;

        .frame {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 10px;

            > h2 {
                text-align: center;
            }

            > i {
                text-align: center;
            }

            > div{
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
        }
    }
}
</style>
