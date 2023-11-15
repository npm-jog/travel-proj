<template>
  <ion-menu content-id="main-content" side="start">
    <ion-header>
      <ion-toolbar>
        <ion-menu-toggle>
          <ion-title v-if="userInfo" @click="navigateTo('/profile')">{{ userInfo.username }}</ion-title>
        </ion-menu-toggle>
      </ion-toolbar>
    </ion-header>
    <ion-content class="nav-menu ion-padding">
      <div class="nav-container">
        <ion-menu-toggle>
          <img class="nav-avatar" v-if="userInfo" :src="userInfo.avatar_url" @click="navigateTo('profile')" />
        </ion-menu-toggle>
        <ion-menu-toggle v-for="x in pages">
          <ion-button v-model="x.value[0]" @click="navigateTo(x.value[0])" class="ion-padding" expand="block"
            >{{ x.value[2] }}<ion-icon slot="end" :icon="x.value[1]"></ion-icon>
          </ion-button>
        </ion-menu-toggle>
        <ion-menu-toggle>
          <LogoutButton />
        </ion-menu-toggle>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import router from "@/router";
import { IonContent, IonHeader, IonMenu, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonMenuToggle, IonCard } from "@ionic/vue";

import { home, imageOutline, airplaneOutline } from "ionicons/icons";

import { defineComponent, ref } from "vue";
import LogoutButton from "./LogoutButton.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  data() {
    return {
      // array to render buttons
      pages: [ref(["/home", home, "Home"]), ref(["/mygalleries", imageOutline, "My Galleries"]), ref(["/wishlist", airplaneOutline, "Wishlist"])],
    };
  },
  methods: {
    navigateTo(x: any) {
      router.push({ path: x });
    },
  },
  components: {
    IonContent,
    IonHeader,
    IonMenu,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonMenuToggle,
    LogoutButton,
    IonCard,
  },
  computed: {
    // Use mapGetters to access the getUser getter from the store
    ...mapGetters(["getUserInfo"]),

    // Use a computed property to get the user from the store
    userInfo() {
      return this.getUserInfo;
    },
  },
  // setup() {
  // 	return {
  // 		home,
  // 		personOutline,
  // 		personAddOutline,
  // 		logInOutline,
  // 		logOutOutline,
  // 		imageOutline,
  // 		starHalfOutline,
  // 		chatboxEllipsesOutline,
  // 		giftOutline,
  // 	};
  // },
});
</script>

<style scoped>
.nav-menu {
  text-align: center;
}
.nav-container {
  height: 100%;
}
.nav-avatar {
  height: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
}

ion-title {
  text-align: center;
}
</style>
