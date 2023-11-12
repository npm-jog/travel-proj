import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Auth0 imports */
import { createAuth0 } from "@auth0/auth0-vue";
import config from "../capacitor.config";

/*Components added manually*/
import NavBar from "@/components/NavBar.vue";
import SideMenu from "@/components/SideMenu.vue";

const app = createApp(App).use(IonicVue).use(router);

// Build the URL that Auth0 should redirect back to
// const redirect_uri = `${config.appId}://dev-02batacgo02k8aak.us.auth0.com/capacitor/${config.appId}/callback`;

app.use(
	createAuth0({
		domain: "dev-02batacgo02k8aak.us.auth0.com",
		clientId: "S2QeKQzU2jzfvg1lqRMve8LPQPg6pdrB",
		useRefreshTokens: true,
		useRefreshTokensFallback: false,
		authorizationParams: {
			redirect_uri: "http://localhost:8100/callback",
		},
	})
);

app.component("nav-bar", NavBar);
app.component("side-menu", SideMenu);

router.isReady().then(() => {
	app.mount("#app");
});
