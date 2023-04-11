export default {
	install(vue) {
		vue.config.globalProperties.$tp = toasterPush;
	},

	namespaced: true,
    
	state: {
		loader: [],
		loaderKill: [],

		toasts: []
	}, 

	mutations: {
		LOADER_PUSH(state, name){
			state.loader.push(name);

		},
		LOADER_REMOVE(state, name){
			state.loader = state.loader.filter(value => value !== name);
		},
		LOADER_KILL_PUSH(state, name){
			state.loaderKill.push(name);
		},
		LOADER_KILL_REMOVE(state, name){
			state.loaderKill = state.loaderKill.filter(value => value !== name);
		},

		TOASTER_PUSH(state, toast){
			state.toasts = [...state.toasts, toast];
		},

		TOASTER_KILL(state, toast){
			state.toasts = state.toasts.filter(value => value.id !== toast.id);
		},

	},

	getters: {
		isLoaderShow(state){
			if(state.loader.length > 0)return true;
			return false;
		},

		toasts(state){
			return state.toasts;
		}
	},

	actions: {
		async loaderStart({commit, state}, name){
			if(state.loader.length === 0)await new Promise(resolve => setTimeout(resolve, 200));
			
			if(state.loaderKill.find(value => value === name) === undefined)commit("LOADER_PUSH", name);
			else commit("LOADER_KILL_REMOVE", name);
		},
		loaderEnd({commit, state}, name){
			if(state.loader.find(value => value === name) === undefined)commit("LOADER_KILL_PUSH", name);
			else setTimeout(() => {
				commit("LOADER_REMOVE", name);
			}, 200);
		},

		toasterPush({commit, state}, toast){
			toast.id = Date.now();
			commit("TOASTER_PUSH", toast);
			setTimeout(() => {
				commit("TOASTER_KILL", toast);
			}, 8000);
		}
	}
};

export function toasterPush(status, message){
	import("../index")
	.then(imp => imp.default)
	.then(stores => stores.dispatch("fixed/toasterPush", {status, message}));
}
