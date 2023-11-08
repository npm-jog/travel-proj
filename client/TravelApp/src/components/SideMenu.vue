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
			<ion-button expand="block">
				Home
				<ion-icon
					slot="end"
					:icon="home"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Profile
				<ion-icon
					slot="end"
					:icon="personOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Create Account
				<ion-icon
					slot="end"
					:icon="personAddOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Sign In
				<ion-icon
					slot="end"
					:icon="logInOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Sign Out
				<ion-icon
					slot="end"
					:icon="logOutOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Gallery
				<ion-icon
					slot="end"
					:icon="imageOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				My Reviews
				<ion-icon
					slot="end"
					:icon="starHalfOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Conversations
				<ion-icon
					slot="end"
					:icon="chatboxEllipsesOutline"
				></ion-icon>
			</ion-button>
			<ion-button expand="block">
				Wishlist
				<ion-icon
					slot="end"
					:icon="giftOutline"
				></ion-icon>
			</ion-button>
		</ion-content>
	</ion-menu>
</template>

<script lang="ts">
	import {
		IonContent,
		IonHeader,
		IonMenu,
		IonPage,
		IonTitle,
		IonToolbar,
		IonButton,
		IonIcon,
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
	} from "ionicons/icons";

	import { defineComponent } from "vue";

	export default defineComponent({
		components: {
			IonContent,
			IonHeader,
			IonMenu,
			IonPage,
			IonTitle,
			IonToolbar,
			IonButton,
			IonIcon,
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
