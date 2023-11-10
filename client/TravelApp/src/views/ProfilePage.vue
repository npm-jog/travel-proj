<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title class="ion-text-center">Your Profile</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<div class="content-container">
				<h1 class="welcomeHeader">Welcome to your profile!</h1>

				<!-- Profile Photo Section -->
				<div>
					<img
						class="profile_pic"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlbPhSvnw2J3HeWJ4SjZf5ca8esFf_7jmtUhEmY9tKs2Tp6H4bUX2Kitm6Zq--lG73cpE&usqp=CAU"
					/>
				</div>

				<div class="profile-section">
					<ion-title class="section-title">My Galleries</ion-title>
				</div>

				<div class="profile-section">
					<ion-title class="section-title">Wishlist</ion-title>
				</div>

				<ion-button
					@click="handleEditProfileClick"
					class="editProfile"
					>Edit profile</ion-button
				>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
	import {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonButton,
	} from "@ionic/vue";

	const handleEditProfileClick = () => {
		console.log("Edit profile button clicked!");
	};
</script>

<style>
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

	.profile-section {
		margin-top: 3.75em;
	}

	.section-title {
		font-size: 1.25em;
		font-weight: bold;
	}

	.editProfile {
		margin-top: 2em;
		width: 12.5em;
	}

	.profile_pic {
		margin-top: 2em;
	}

	.welcomeHeader {
		font-size: 3.125em;
	}
</style>
