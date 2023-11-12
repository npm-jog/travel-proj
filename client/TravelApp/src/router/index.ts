import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MapPage from "@/views/MapPage.vue";
import CountryPage from "@/views/CountryPage.vue";
import WishlistPage from "@/views/WishlistPage.vue";

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
		path: "/country",
		component: CountryPage,
	},
	{
		path: "/wishlist",
		component: WishlistPage,
		props: (route) => ({ user: route.params.user }),
	},
	{
		path: "/profile",
		component: () => import("@/views/ProfilePage.vue"),
	},
	{
		path: "/mygallery",
		component: () => import("@/views/MyGalleryPage.vue"),
	},
	{
		path: "/conversations",
		component: () => import("@/views/Conversations.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
