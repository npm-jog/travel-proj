<template>
	<ion-header>
		<ion-toolbar class="select-toolbar">
			<ion-buttons slot="start">
				<ion-menu-button v-if="path"></ion-menu-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>

<script lang="ts">
	import { IonButtons, IonMenuButton, IonToolbar, IonHeader } from "@ionic/vue";
	import { defineComponent } from "vue";

	export default defineComponent({
		components: {
			IonButtons,
			IonMenuButton,
			IonToolbar,
			IonHeader,
		},
		data() {
			return {
				path: this.$route.path !== "/login",
			};
		},
		watch: {
			$route(to, from) {
				this.path = to.path !== "/login";
			},
		},
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
