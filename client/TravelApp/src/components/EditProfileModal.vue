<template>
  <ion-header>
    <h1 class="edit-profile-header">Profile Editor</h1>
  </ion-header>
  <ion-content class="ion-padding">
    <form class="edit-profile-form">
        <ion-item>
            <ion-input 
            v-model="usernameInput"
            label-placement="stacked"
            label="Change username"
            type: any ="review"
            :placeholder= "[[userInfo.username]]">
            </ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="forenameInput"
            label-placement="stacked"
            label="Change forename"
            type: any ="review"
            :placeholder="[[userInfo.forename]]">
            </ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="surnameInput"
            label-placement="stacked"
            label="Change surname"
            type: any ="review"
            :placeholder="[[userInfo.surname]]">
            </ion-input>
        </ion-item>
        <ion-item>
            <ion-input
            v-model="avatarInput"
            label-placement="stacked"
            label="Change avatar"
            type: any ="review"
            placeholder="Enter a new avatar URL">
            </ion-input>
        </ion-item>
    </form>
  </ion-content>

  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button color="medium" @click="cancel">cancel</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="patchUser" :strong="true">Confirm </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts">
    import { mapGetters, useStore } from "vuex";

    export default defineComponent({
        computed: {
            // Use mapGetters to access the getUser getter from the store
            ...mapGetters(["getUserInfo"]),

            // Use a computed property to get the user from the store
            userInfo() {
                return this.getUserInfo;
            },
        },
        data() {
            return {
                usernameInput: "",
                forenameInput: "",
                surnameInput: "",
                avatarInput: "",
            }
        },
        methods: {
            patchUser() {
                axios
                .patch(`https://travel-app-api-8nj9.onrender.com/api/users/${this.userInfo._id}`, {
                    forename: this.forenameInput.length > 0 ? this.forenameInput : this.userInfo.forename,
                    surname: this.surnameInput.length > 0 ? this.surnameInput : this.userInfo.surname,
                    username: this.usernameInput.length > 0 ? this.usernameInput : this.userInfo.username,
                    email: this.userInfo.email,
                    avatar_url: this.avatarInput.length > 0 ? this.avatarInput : this.userInfo.avatar_url,
                    visited_locations: this.userInfo.visited_locations,
                    wishlist: this.userInfo.wishlist,
                    albums: this.userInfo.albums,
                })
                .then((res: any) => {
                    console.log("user patched!")
                    console.log(res.data)
                    modalController.dismiss(res.data, "confirm");
                })
                .catch((err: any) => {
                    console.log(err)
                    modalController.dismiss(err, "confirm");
                })
            }
        }
    });
</script>

<script lang="ts" setup>
import { setupConfig } from "@ionic/core";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  modalController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from "axios";

//get props
import { defineProps } from "vue";
const props = defineProps(["question"]);
//get props

const name = ref();
const cancel = () => modalController.dismiss(null, "cancel");
const confirm = () => modalController.dismiss(name.value, "confirm");

</script>
<style scoped>
.edit-profile-header {
  display: flex;
  justify-content: center;
}
</style>
