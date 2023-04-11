// import { get } from "toanotherback";
import router from "../../../router";

export default {
	namespaced: true,
	
	state: {
		info: false,
		guidesSelect: false,
		
		guides: false,
		skipe: 20,
		searchValue: "",
		AM: undefined,
		PM: undefined,

		showInfo: false,
		selectGuide: false,
	},

	mutations: {
		SET_GUIDES_SELECT(state, value){
			state.guidesSelect = value;
		},
		SET_INFO(state, value){
			state.info = value;
		},
		SET_GUIDES(state, value){
			state.guides = value;
		},

		SET_SEARCH_VALUE(state, value){
			state.searchValue = value;
		},
		SET_AM(state, value){
			state.AM = value;
		},
		SET_PM(state, value){
			state.PM = value;
		},
		SET_SHOW_INFO(state, value){
			state.showInfo = value;
		},
		SET_SELECT_GUIDE(state, value){
			state.selectGuide = value;
		}
	},

	getters: {
		guidesSelect(state){
			return state.guidesSelect;
		},
		guides(state){
			return state.guides;
		},

		searchValue(state){
			return state.searchValue;
		},
		AM(state){
			return state.AM;
		},
		PM(state){
			return state.PM;
		},
		activity(state){
			return state.info;
		},
		showInfo(state){
			return state.showInfo;
		},
		selectGuide(state){
			return state.selectGuide;
		}
	},

	actions: {
		async initStore({dispatch, commit}, id){
			dispatch("fixed/loaderStart", "getActivityFromPlace", {root: true});

			await get("/activity/" + id)
			.info((message, status) => {
				if(status == "error")dispatch("fixed/toasterPush", {message: message, status}, {root: true});
			})
			.s((rep) => {
				commit("SET_GUIDES_SELECT", rep.guides);
				delete rep.guides;
				commit("SET_INFO", rep);
				dispatch("getFirtPage");
			})
			.e((rep) => {
				router.push("/manager/planning");
			})
			.result;

			dispatch("fixed/loaderEnd", "getActivityFromPlace", {root: true});
		},

		async getFirtPage({dispatch, commit}){
			let timeout = setTimeout(() => commit("SET_GUIDES", false), 200);
			commit("SET_GUIDES", await dispatch("get", 0));
			clearTimeout(timeout);
		},

		async getPage({dispatch, commit, state}){
			page = (state.guides.length || 0) / state.skipe;
			if(!Number.isInteger(page)) return;
			commit("SET_GUIDES", await dispatch("get", page));
		},

		async get({state}, page){
			let date = new Date(state.info.date);

			let result = await get(
				"/guide/page/" +
				page + 
				"/qte/" + 
				state.skipe + 
				("?search=" + state.searchValue) +
				("&my=" + (date.getMonth() + 1) + "-" + date.getFullYear()) +
				("&day=" + date.getDate()) +
				("&group=" + state.info.group._id) +
				("&AM=" + (state.AM === undefined ? "" : state.AM)) +
				("&PM=" + (state.PM === undefined ? "" : state.PM))
			).sd();

			return result.guides;
		},

		purgeStore({commit}){
			commit("SET_GUIDES_SELECT", false);
			commit("SET_INFO", false);
			commit("SET_AM", undefined);
			commit("SET_PM", undefined);
			commit("SET_GUIDES", false);
			commit("SET_SHOW_INFO", false);
			commit("SET_SEARCH_VALUE", "");
		}
	}
};
