<script lang="ts" setup>
import Header from "@/components/layouts/semantics/Header.vue";
import Content from "@/components/layouts/semantics/Content.vue";
import Footer from "@/components/layouts/semantics/Footer.vue";
import Aside from "./semantics/Aside.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth.store";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

watch(isAuthenticated, (state) => {
	if (!state) {
		router.replace({ path: "/sign-up" });
	}
});
</script>
<template>
	<div class="wrapper">
		<Header />
		<div class="content-wrapper">
			<Aside />
			<Content v-bind="$attrs">
				<slot></slot>
			</Content>
		</div>
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
.content-wrapper {
	flex: 1;
	display: flex;
	align-items: stretch;
	box-shadow: rgba(0, 0, 0, 0.16) 1px 1px 4px;
	min-height: auto;
	max-height: calc(100vh - 96px);
	box-sizing: border-box;
}
.content-wrapper > aside {
	flex: 1;
}
.content-wrapper > main {
	flex: 3;
}
</style>
