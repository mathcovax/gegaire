export default {
	path: "/guide",
	component: () => import("@/layouts/guide.vue"),
	children: [
		{
			path: "/guide",
			name: "guideHome",
			component: () => import("@/views/guide/guide.vue"),
		},
		{
			path: "/guide/availability",
			name: "guideAvailability",
			component: () => import("@/views/guide/availability.vue"),
		},
		{
			path: "/guide/activities",
			name: "guideActivities",
			component: () => import("@/views/guide/activities.vue"),
		}
	]
};
