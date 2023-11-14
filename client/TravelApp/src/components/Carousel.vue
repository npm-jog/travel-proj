<ion-page class="carouselContainer">
		<ion-content>
			<swiper class="carousel">
				<swiper-slide v-for="pic in pics">
					<img class="carouselPic" :src="pic" />
				</swiper-slide>
			</swiper>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
	import { defineComponent, ref, defineProps } from "vue";
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { IonContent, IonPage } from "@ionic/vue";

	import "swiper/css";
	import "@ionic/vue/css/ionic-swiper.css";
	const props = defineProps(["pics"]);
	// PASS IMAGES ON AN ARRAY CALLED 'pics'
	// E.g. <Carousel :pics='picsArray' />
</script>

<script lang="ts">
	export default defineComponent({
		components: {
			Swiper,
			SwiperSlide,
			IonContent,
			IonPage,
		},
	});
</script>

<style scoped>
	.carousel {
		height: 100%;
	}
</style>
