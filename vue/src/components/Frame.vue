<template>
    <section 
    class="p-[var(--frame-border)] bg-[var(--green1)] rounded-[4px] relative"
    :style="{
        '--frame-border': border,
        '--frame-bread': bread
    }"
    >
        <div 
        class="absolute top-0 left-0 bg-[var(--orange2)]"
        :class="{
            'w-full h-[var(--frame-bread)] rounded-b-[20px] rounded-t-[4px]': !row,
            'h-full w-[var(--frame-bread)] rounded-r-[20px] rounded-l-[4px]': row,
        }"
        />
        <div 
        class="absolute bottom-0 right-0 bg-[var(--orange2)]"
        :class="{
            'w-full h-[var(--frame-bread)] rounded-t-[20px] rounded-b-[4px]': !row,
            'h-full w-[var(--frame-bread)] rounded-l-[20px] rounded-r-[4px]': row,
        }"
        />
        
        <div 
        class="relative bg-[white] w-full h-full rounded-[4px] frame"
        :class="classs"
        @scroll="$emit('scroll', $event)"
        >
            <slot></slot>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Frame",
    props: {
        border: {
            type: String,
            default: "10px",
            required: false
        },
        bread: {
            type: String,
            default: "40px",
            required: false
        },
        row: {
            type: Boolean,
            default: false,
            required: false
        },
        classs: {
            type: String,
            default: "",
            required: false
        }
    },
    emits: ["scroll"],
})
</script>

<style lang="scss" scoped>

</style>