<script lang="ts" setup>
import Header from "@/components/layouts/semantics/Header.vue";
import Content from "@/components/layouts/semantics/Content.vue";
import Footer from "@/components/layouts/semantics/Footer.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth.store";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

watch(isAuthenticated, (state) => {
	if (!state) {
		router.push({ path: "/sign-up", replace: true });
	}
});
</script>
<template>
	<div class="wrapper">
		<Header />
		<Content>
			<slot></slot>
		</Content>
		<Footer />
	</div>
</template>
<style lang="css" scoped>
.wrapper {
	background-color: #fff;
	flex: 1;
	align-self: stretch;
	display: flex;
	flex-direction: column;
}
</style>
