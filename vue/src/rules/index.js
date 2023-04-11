const rules = {
	required(value){
		return !!value || "Ce champ est requis.";
	},

	minLength(min, value){
		return value.length >= min || "Minimum " + min + " caractères.";
	},

	maxLength(max, value){
		return value.length <= max || "Maximum " + max + " caractères.";
	},

	validEmail(value){
		return !!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value) || "Ce n'est pas une email valide.";
	},

	onlyInt(value){
		return !!(/[0-9]+/).test(value) || "Uniquement des entiers sont autorisés.";
	}
};

export default {
	install(vue){
		vue.config.globalProperties.$rules = rules;
	},
};
