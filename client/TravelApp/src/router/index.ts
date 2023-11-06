import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: () => import("@/views/TabsPage.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/views/LoginPage.vue"),
      },
      {
        path: "map",
        component: () => import("@/views/MapPage.vue"),
      },
      {
        path: "country",
        component: () => import("@/views/CountryPage.vue"),
      },
      {
        path: "wishlist",
        component: () => import("@/views/WishlistPage.vue"),
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
