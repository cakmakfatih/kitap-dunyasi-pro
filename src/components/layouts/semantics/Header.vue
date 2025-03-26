<script lang="ts" setup>
import Logo from "@/components/shared/Logo.vue";
import Button from "@/components/shared/Button.vue";

import { useAuthStore } from "@/stores/auth/auth.store";

const authStore = useAuthStore();

const logout = (e: Event) => {
	authStore.logout();
};
</script>
<template>
	<header>
		<section>
			<div class="header-wrapper">
				<Logo />
			</div>
		</section>
		<section>
			<div class="header-wrapper">
				<Button @click="logout" :is-outline="true" :is-rounded="true"
					>Çıkış Yap</Button
				>
			</div>
		</section>
	</header>
</template>
<style lang="css" scoped>
header {
	height: 96px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
	background-color: white;
}

.header-wrapper {
	flex: 1;
	max-width: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
}

section {
	flex: 1;
	display: flex;
}
section:nth-child(2) {
	justify-content: flex-end;
}
</style>
