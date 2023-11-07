import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MapPage from "@/views/MapPage.vue";
import CountryPage from "@/views/CountryPage.vue";
import WishList from "@/views/WishlistPage.vue";
import TabsPage from "@/views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "login",
        component: () => import("@/views/LoginPage.vue"),
      },
      {
        path: "map",
        component: MapPage,
      },
      {
        path: "country",
        component: CountryPage,
      },
      {
        path: "wishlist",
        component: WishList,
      },
      {
        path: "profile",
        component: () => import("@/views/ProfilePage.vue"),
      },
      {
        path: "myGallery",
        component: () => import("@/views/MyGalleryPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
