<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);
authStore.setSession();

watch(isAuthenticated, (state) => {
	if (state) {
		router.push({ name: "home", replace: true });
	}
});
</script>
<template>
	<template v-if="!authStore.isLoading"><router-view></router-view></template>
	<template v-else></template>
</template>
