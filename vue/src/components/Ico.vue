<template>
    <i
    @click="clicked"
    class="mdi"
    :class="{['mdi-' + $slots.default()[0].children.replace(/[\n ]/g, '')]: true}"
    :style="{
        '--ico-size': size,
    }"
    />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Ico",
    props: {
        size: {
            type: String,
            default: "1em",
            required: false
        },
    },
    methods: {
        clicked(event){
            this.$emit("click", event)
        }
    },
});
</script>

<style lang="scss" scoped>
i{
    line-height: 0;

    &::before{
        line-height: normal;
        font-size: var(--ico-size);
    }
}
</style>
