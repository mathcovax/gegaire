import {createRouter, createWebHistory} from "vue-router";
import guide from "./guide";
import manager from "./manager";
import admin from "./admin";
import {taob} from "../taob";
import {fixedStore} from "../stores/fixed";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "login",
			component: () => import("@/views/login.vue"),
		},
		{
			path: "/invit/:id",
			name: "invit",
			component: () => import("@/views/invit.vue"),
		},
		{
			path: "/activity/:id",
			name: "activity",
			component: () => import("@/views/activity.vue"),
		},
		guide,
		manager,
		admin,
	]
});

router.beforeEach(async(to, from, next) => {
	if(!router.hasRoute(to.name)){
		next("/");
		return;
	}

	let {close} = fixedStore().requestLoader(to.fullPath);

	await taob.get("/entry" + to.fullPath)
	.s(() => next())
	.e(data => {
		close();
		next(data || "/");
	})
	.result;
});

router.afterEach(async(to) => {
	fixedStore().closeLoader(to.fullPath);
});

export default router;

