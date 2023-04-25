import Toanotherback, {Dictionary} from "toanotherback";
import fr from "./dictionary/fr";
import router from "../router";
import {fixedStore} from "../stores/fixed";

export const taob = new Toanotherback({
	prefix: "/api",
	// https: true,
	parameters: {
		credentials: "include"
	},
	hookError(error){
		console.error(error);
	},
	responseInterceptor: (response) => {
		let tr = Dictionary.translate(response.response.headers.get("aob-info"));
		if(tr !== response.response.headers.get("aob-info"))fixedStore().toasterPush(response.response.ok, tr);
		return response;
	},
});

taob.setHookInfo("expireAccessToken", () => router.push("/?callback=" + router.currentRoute.value.path));

Dictionary.add("fr", fr);
Dictionary.use("fr");

export default {
	install(vue){
		vue.config.globalProperties.$tr = index => Dictionary.translate(index);
		vue.config.globalProperties.$trr = index => Dictionary.translate(router.currentRoute.value.path + "." + index);
		vue.config.globalProperties.$useDico = dico => Dictionary.use(dico);
	},
};
