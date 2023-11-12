<template>
	<ion-menu
		content-id="main-content"
		side="start"
	>
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-menu-toggle v-for="x in pages">
				<ion-button
					v-model="x.value[0]"
					@click="navigateTo(x.value[0])"
					class="ion-padding"
					expand="block"
					>{{ x.value[2]
					}}<ion-icon
						slot="end"
						:icon="x.value[1]"
					></ion-icon>
				</ion-button>
			</ion-menu-toggle>
			<ion-menu-toggle>
				<LogoutButton />
			</ion-menu-toggle>
		</ion-content>
	</ion-menu>
</template>

<script lang="ts">
	import router from "@/router";
	import {
		IonContent,
		IonHeader,
		IonMenu,
		IonPage,
		IonTitle,
		IonToolbar,
		IonButton,
		IonIcon,
		IonMenuToggle,
	} from "@ionic/vue";

	import {
		home,
		personOutline,
		personAddOutline,
		logInOutline,
		logOutOutline,
		imageOutline,
		starHalfOutline,
		chatboxEllipsesOutline,
		giftOutline,
		airplaneOutline,
	} from "ionicons/icons";

	import { defineComponent, ref } from "vue";

	import LogoutButton from "./LogoutButton.vue";

	export default defineComponent({
		data() {
			return {
				// array to render buttons
				pages: [
					ref(["home", home, "Home"]),
					ref(["profile", personOutline, "Profile"]),
					ref(["mygallery", imageOutline, "My Gallery"]),
					ref(["wishlist", airplaneOutline, "Wishlist"]),
					ref(["conversations", chatboxEllipsesOutline, "My Conversations"]),
				],
			};
		},
		methods: {
			navigateTo(x: any) {
				router.push(x);
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
		},
		setup() {
			return {
				home,
				personOutline,
				personAddOutline,
				logInOutline,
				logOutOutline,
				imageOutline,
				starHalfOutline,
				chatboxEllipsesOutline,
				giftOutline,
			};
		},
	});
</script>
