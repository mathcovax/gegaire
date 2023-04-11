// import { get } from "toanotherback";

export default {
	namespaced: true,

	state: {
		guides: false,
		skipe: 10,
		searchValue: "",

		isFetch: false,
		isAlreadyAll: false,
	},

	mutations: {
		SET_GUIDES(state, guides){
			state.guides = guides;
		},
		PUSH_GUIDE(state, guide){
			state.guides = [...state.guides, ...guide];
		},

		SET_IS_FETCH(state, value){
			state.isFetch = value;
		},
		SET_AL(state, value){
			state.isAlreadyAll = value;
		},

		SET_SV(state, value){
			state.searchValue = value;
		}
		
	},

	getters: {
		guides(state){
			return state.guides;
		},

		isFetch(state){
			return state.isFetch;
		},

		searchValue(state){
			return state.searchValue;
		}
	},

	actions: {
		async initStore({commit, dispatch}){
			let result = await dispatch("get", 0);
			commit("SET_GUIDES", result.guides);
		},

		async findPage({state, commit}){
			let page = state.guides.length / state.skipe;
			if(!Number.isInteger(page) || state.isFetch === true || state.isAlreadyAll === true) return;
			commit("SET_IS_FETCH", true);
			let result = await dispatch("get", page);
			if(result.guides.length === 0)commit("SET_AL", true);
			commit("PUSH_GUIDE", result.guides);
			commit("SET_IS_FETCH", false);
		},

		async get({state}, page){
			return await get(
				"/guide/page/" +
				page + 
				"/qte/" + 
				state.skipe +
				("?search=" + state.searchValue)
			).sd();
		},

		resetStore({commit}){
			commit("SET_GUIDES", false);
			commit("SET_SV", "");
			commit("SET_IS_FETCH", false);
			commit("SET_AL", false);
		}
	},

};
