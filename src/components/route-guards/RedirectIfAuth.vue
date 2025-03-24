<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth/auth.store";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

if (isAuthenticated.value) {
	router.replace({ path: "/" });
}

authStore.setSession();

watch(isAuthenticated, (state) => {
	if (state) {
		router.replace({ path: "/" });
	}
});
</script>
<template>
	<div>
		<template v-if="!authStore.isLoading && !authStore.isAuthenticated">
			<RouterView v-slot="{ Component }">
				<Transition name="fade" mode="out-in">
					<Component :is="Component" />
				</Transition>
			</RouterView>
		</template>
		<template v-else></template>
	</div>
</template>
<style lang="css" scoped>
div {
	flex: 1;
	align-self: stretch;
	display: flex;
}
</style>
