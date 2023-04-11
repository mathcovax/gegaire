export default {
	path: "/admin",
	component: () => import("@/layouts/admin.vue"),
	children: [
		{
			path: "/admin/guides",
			name: "adminGuides",
			component: () => import("@/views/admin/guides.vue"),
		},
		{
			path: "/admin/invits",
			name: "adminGuidesInvit",
			component: () => import("@/views/admin/invitGuide.vue"),
		},
		{
			path: "/admin/guides/:id",
			name: "adminGuidesEdit",
			component: () => import("@/views/admin/editGuide.vue"),
		},		
		{
			path: "/admin/groups",
			name: "adminGroups",
			component: () => import("@/views/admin/groups.vue"),
		}
	]
};
