<template>
  <ion-header>
    <ion-toolbar class="select-toolbar">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { IonButtons, IonMenuButton, IonToolbar, IonHeader } from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { IonMenuButton, IonButtons, IonToolbar, IonHeader },
});
</script>

<style scoped>
.select-toolbar {
  position: absolute;
  height: 3.5rem;
  width: 15%;
  float: left;
}
</style>
