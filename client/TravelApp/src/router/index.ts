import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MyGalleryPage from "@/views/MyGalleryPage.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/callback",
		redirect: "/home",
	},
	{
		path: "/login",
		component: () => import("@/views/LoginPage.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/MapPage.vue"),
	},
	{
		path: "/country/:country",
		component: () => import("@/views/CountryPage.vue"),
	},
	{
		path: "/wishlist",
		component: () => import("@/views/WishlistPage.vue"),
	},
	{
		path: "/profile",
		component: () => import("@/views/ProfilePage.vue"),
	},
	{
		path: "/conversations",
		component: () => import("@/views/Conversations.vue"),
	},
	{
		path: "/mygalleries",
		component: () => import("@/views/MyGalleries.vue"),
	},
	{
		path: "/mygalleries/:country",
		component: () => import("@/views/MyGalleryPage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
