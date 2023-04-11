// import { get, post, del, patch } from "toanotherback";

export default {
	namespaced: true,
    
	state: {
		groups: false,
		skipe: 10,
        
		isFetch: false,
		isAlreadyAll: false,
	}, 

	mutations: {
		SET_GROUPS(state, groups){
			state.groups = groups;
		},
		PUSH_GROUP(state, groups){
			state.groups = [...state.groups, ...groups];
		},
		REMOVE_GROUP(state, group){
			state.groups = state.groups.filter(value => value._id !== group._id);
		},
		RENAME_GROUP(state, group){
			for(let index = 0; index < state.groups.length; index++){
				if(state.groups[index]._id === group._id){
					state.groups[index] = group;
					break;
				}
			}
		},

		SET_IS_FETCH(state, value){
			state.isFetch = value;
		},
		SET_AL(state, value){
			state.isAlreadyAll = value;
		},
	},

	getters: {
		groups(state){
			return state.groups;
		},

		isFetch(state){
			return state.isFetch;
		}
	},

	actions: {
		async initStore({state, commit}){
			let result = await get("/group/page/0/qte/" + state.skipe).sd();
			commit("SET_GROUPS", result.groups);
		},

		async findPage({state, commit}){
			let page = state.groups.length / state.skipe;
			if(!Number.isInteger(page) || state.isFetch === true || state.isAlreadyAll === true) return;
			commit("SET_IS_FETCH", true);
			let result = await get("/group/page/" + page + "/qte/" + state.skipe).sd();
			if(result.groups.length === 0)commit("SET_AL", true);
			commit("PUSH_GROUP", result.groups);
			commit("SET_IS_FETCH", false);
		},

		async createGroups({dispatch}, name){
			let result = await post("/group", {name})
			.info((message, status) => {
				dispatch("fixed/toasterPush", {message: message.replace("#R", name), status}, {root: true});
			})
			.sd();

			if(result)dispatch("initStore");
			return result;
		},

		async deleteGroup({commit, dispatch}, group){
			let result = await del("/group/" + group._id)
			.info((message, status) => {
				dispatch("fixed/toasterPush", {message: message.replace("#R", group.name), status}, {root: true});
			})
			.sd();

			if(result)commit("REMOVE_GROUP", group);
		},

		async renameGroup({commit, dispatch}, group){
			let result = await patch("/group/" + group._id, group)
			.info((message, status) => {
				dispatch("fixed/toasterPush", {message: message.replace("#R", group.name), status}, {root: true});
			})
			.sd();

			if(result)commit("RENAME_GROUP", group);
			return result;
		},

		resetStore({commit}){
			commit("SET_GROUPS", false);
			commit("SET_AL", false);
			commit("SET_IS_FETCH", false);
		}
	}
};
