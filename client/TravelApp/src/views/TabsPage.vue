<template>
  <ion-page>
    <!-- to be removed -->
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="login" href="/login">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Log-in</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="map" href="/map">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Map</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="country" href="/country">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Country</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="wishlist" href="/wishlist">
          <ion-icon aria-hidden="true" :icon="chatbubble" />
          <ion-label>WishList</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="myGallery" href="/myGallery">
          <ion-icon aria-hidden="true" :icon="cloud" />
          <ion-label>My Gallery</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon aria-hidden="true" :icon="contrast" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  chatbubble,
  cloud,
  contrast,
  ellipse,
  square,
  triangle,
} from "ionicons/icons";
</script>
