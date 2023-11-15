<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Your Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="content-container">
        <h1 class="welcomeHeader">Welcome to your profile {{ userInfo.forename }}!</h1>

        <!-- Profile Photo Section -->
        <img
          class="profile_pic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlbPhSvnw2J3HeWJ4SjZf5ca8esFf_7jmtUhEmY9tKs2Tp6H4bUX2Kitm6Zq--lG73cpE&usqp=CAU"
        />
        <ion-button @click="navigateTo('/mygalleries')" class="button">My Galleries</ion-button>

        <ion-button @click="navigateTo('/wishlist')" class="button">Wishlist</ion-button>

        <ion-button @click="openModal" class="button">Edit profile</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import router from "@/router";
import { mapGetters } from "vuex";
import EditProfileModal from "@/components/EditProfileModal.vue";
import { modalController } from "@ionic/vue";

export default defineComponent({
  computed: {
    ...mapGetters(["getUserInfo"]),
    userInfo() {
      return this.getUserInfo;
    },
  },
  methods: {
    navigateTo(x: any) {
      router.push({ path: x });
    },
    async openModal() {
      const modal = await modalController.create({
        component: EditProfileModal,
      });
      modal.present();
    },
  },
});
</script>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
</script>

<style scoped>
ion-title {
  margin-top: 0;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 1.25em;
}
.content-container > * {
  margin: 1rem;
}

.button {
  padding: 0.3rem;
  width: 40%;
}

.profile_pic {
  width: 40%;
  height: 40%;
}

.welcomeHeader {
  font-size: 2rem;
}
</style>
