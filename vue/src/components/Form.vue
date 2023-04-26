<template>
	<form
	ref="form"
	@submit="submited"
	>
		<slot/>
	</form>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
	name: "Form",
	emits: ["submit"],
	methods: {
		submited(e){
			e.preventDefault();
			if(this.validate() === true) this.$emit("submit", e);
		},

		validate(){
			let result = true;
			for(const el of this.$refs.form.querySelectorAll("[form-rules]")){
				if(el.formElement.disabled !== false) continue;
				if(el.formElement.validate() === false)result = false;
			}
			return result;
		}
	}
});
</script>


<style>

</style>
