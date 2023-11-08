<template>
	<ion-app>
		<side-menu />
		<nav-bar />
		<ion-router-outlet id="main-content" />
	</ion-app>
</template>

<script setup lang="ts">
	import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>
