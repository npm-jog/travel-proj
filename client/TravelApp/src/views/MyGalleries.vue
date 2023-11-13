<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<h1 class="my-galleries-title">My Galleries</h1>
            <ion-card class="album-div" v-for="x in albumNames" @click="navigateTo(x.country)">
                <ion-card-title>{{ username }}'s Album of {{ x.country }} </ion-card-title>
                <ion-img class="album-card-image" :src="x.firstImage">

                </ion-img>
            </ion-card>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { mapGetters } from "vuex";
    import { countries } from "../../API";
    import router from "@/router";
	export default defineComponent({
		components: {},
        data() {
            return {
                albumNames: [],
            }
        },
        methods: {
            navigateTo(x: any) {
				router.push(`mygalleries/${x}`);
			},
            uniqueCountries() {
                const addedCountries = new Set();

                this.userAlbums.forEach((country: Object) => {
                    if (!addedCountries.has(country.country)) {
                        this.albumNames.push({
                            country: country.country,
                            firstImage: country.url,
            });
            addedCountries.add(country.country);
        }
    });
}

        },
		computed: {
			// Use mapGetters to access the getUser getter from the store
			...mapGetters(["getUsername", "getUserEmail", "getUserId", "getUserForename", "getUserSurname", "getUserAvatar", "getUserVisitedLocations", "getUserWishlist", "getUserAlbums"]),

			// Use a computed property to get the user from the store
			username() {
				return this.getUsername;
			},
			userId() {
				return this.getUserId;
			},
			userEmail() {
				return this.getUserEmail;
			},
            userForename() {
				return this.getUserForename;
			},
            userSurname() {
				return this.getUserSurname;
			},
            userAvatar() {
				return this.getUserAvatar;
			},
            userVisitedLocations() {
				return this.getUserVisitedLocations;
			},
            userWishlist() {
				return this.getUserWishlist;
			},
            userAlbums() {
				return this.getUserAlbums;
			},
		},
        mounted() {
            this.uniqueCountries()
        //     axios.patch(`https://travel-app-api-8nj9.onrender.com/api/users/${this.userId}`, {
        //         _id: this.userId,
        //         forename: this.userForename,
        //         surname: this.userSurname,
        //         username: this.username,
        //         email: this.userEmail,
        //         avatar_url: this.userAvatar,
        //         visited_locations: this.userVisitedLocations,
        //         wishlist: this.userWishlist,
        //         albums: [
        //                 { country: "England", url: "https://images.pexels.com/photos/6953365/pexels-photo-6953365.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" },
        //                 { country: "Spain", url: "https://images.pexels.com/photos/12360546/pexels-photo-12360546.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" },
        //                 { country: "Spain", url: "https://images.pexels.com/photos/15893581/pexels-photo-15893581/free-photo-of-a-blurry-image-of-a-tunnel-in-the-woods.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
        //                 ], 
        //     })
        //     .then((response: any) => {
        //         console.log(response.data)
        //         console.log("user patched!")
        //     })
        //     .catch((err: any) => {
        //         console.log(err)
        //     }) 
           }
	})
</script>

<script setup lang="ts">
import axios from "axios"
import { key } from "ionicons/icons";
import { defineComponent, onMounted } from "vue";

</script>

<style>
.my-galleries-title {
    text-align: center;
}

.album-div {
    text-align: center;
    height: 10rem;
}

.album-card-image {
   width: 100%;
    height: 100%; 
    object-fit: cover;
}

</style>