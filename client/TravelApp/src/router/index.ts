import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MapPage from "@/views/MapPage.vue";
import CountryPage from "@/views/CountryPage.vue";
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
		component: MapPage,
		name: "home",
	},
	{
		path: "/country/:country",
		component: CountryPage,
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
		component: MyGalleryPage,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
