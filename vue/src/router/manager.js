export default {
	path: "/manager",
	component: () => import("@/layouts/manager.vue"),
	children: [
		{
			path: "/manager/planning",
			name: "planning",
			component: () => import("@/views/manager/planning.vue"),
		},
		{
			path: "/manager/activities/:id/edit",
			name: "editActivity",
			component: () => import("@/views/manager/editActivity.vue"),
		},
		{
			path: "/manager/activities/:id/place",
			name: "placeActivity",
			component: () => import("@/views/manager/placeActivity.vue"),
		},
	]
};
