<template>
	<ion-page>
		<ion-content
			:fullscreen="true"
			id="main-content"
			ion-padding
			>My Conversations</ion-content
		>
	</ion-page>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";

	export default defineComponent({
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUserInfo"]),

			// Use a computed property to get the user from the store
			userInfo() {
				return this.getUserInfo;
			},
		},
	});
</script>

<script setup lang="ts">
	import { IonPage, IonContent } from "@ionic/vue";
	import { defineComponent } from "vue";
</script>
