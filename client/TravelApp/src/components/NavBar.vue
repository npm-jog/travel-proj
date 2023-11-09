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
</script>

<style scoped>
	.select-toolbar {
		position: absolute;
		height: 3.5rem;
		width: 15%;
		float: left;
	}
</style>
