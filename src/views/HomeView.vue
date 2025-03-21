<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import { useAuthStore } from "@/stores/auth/auth.store";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const logout = (e: Event) => {
	authStore.logout();
};

watch(isAuthenticated, (state) => {
	if (!state) {
		router.push({ path: "/sign-up", replace: true });
	}
});
</script>

<template>
	<MainLayout>
		<button @click="logout">Logout</button>
	</MainLayout>
</template>
