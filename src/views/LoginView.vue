<script setup lang="ts">
import SplitLayout from "@/components/layouts/SplitLayout.vue";
import Button from "@/components/shared/Button.vue";
import TextInput from "@/components/shared/TextInput.vue";
import Checkbox from "@/components/shared/Checkbox.vue";

import BgLogin from "@/assets/bg-login.jpg";

import { useLoginStore } from "@/stores/login/login.store";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useApiService, type LoginUserResponse } from "@/services/api.service";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const apiService = useApiService();
const store = useLoginStore();
const authStore = useAuthStore();

const { rememberMe } = storeToRefs(store);

const login = async (e: Event) => {
	e.preventDefault();

	store.setIsLoading(true);
	store.resetError();

	if (rememberMe.value) {
		localStorage.setItem("email", store.email);
		localStorage.setItem("password", store.password);
	} else {
		localStorage.removeItem("rememberMe");
		localStorage.removeItem("email");
		localStorage.removeItem("password");
	}

	try {
		const result = await apiService.login(store.email, store.password);

		if (result.success && !result.error.hasErrors) {
			authStore.setToken(result.token ?? "");
			authStore.setSession();
			store.resetForm();
			router.push({ name: "home", replace: true });
		} else {
			store.setError(result.error);
		}
	} catch (err) {
		const errResponse = err as LoginUserResponse;
		store.setError(errResponse.error);
	} finally {
		store.setIsLoading(false);
	}
};

const bgStyle = {
	backgroundImage: `url(${BgLogin})`,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
};

onMounted(() => {
	if (rememberMe) {
		store.setEmail(localStorage.getItem("email") ?? "");
		store.setPassword(localStorage.getItem("password") ?? "");
	}
});

watch(rememberMe, (state) => {
	if (state) {
		localStorage.setItem("rememberMe", JSON.stringify(true));
	} else {
		localStorage.removeItem("rememberMe");
		localStorage.removeItem("email");
		localStorage.removeItem("password");
	}
});
</script>

<template>
	<SplitLayout>
		<template #left>
			<section class="left-pane" :style="bgStyle">
				<div class="pane-content">
					<h1 class="logo-title outlined-text-shadow">Kitap Dünyası Pro</h1>
					<span class="form-subtitle logo-subtitle outlined-text-shadow"
						>İstediğin kitabı bul, ekle, takip et, arkadaşlarınla paylaş!</span
					>
					<div style="height: 25px"></div>
					<Button>Daha Fazla</Button>
				</div>
			</section>
		</template>
		<template #right>
			<form @submit="login" class="form-wrapper">
				<div class="form">
					<header class="form-header">
						<h1 class="form-title">Giriş Yap</h1>
						<span class="form-subtitle"
							>İstediğin kitabı bul, ekle, takip et, arkadaşlarınla
							paylaş!</span
						>
					</header>
					<TextInput
						v-model="store.email"
						type="email"
						label="E-posta"
						:errors="store.error.fieldErrors.email"
						autocomplete="off"
						required
					/>
					<TextInput
						v-model="store.password"
						type="password"
						label="Şifre"
						:errors="store.error.fieldErrors.password"
						autocomplete="off"
						required
					/>
					<Checkbox v-model="store.rememberMe">Beni hatırla</Checkbox>
					<div style="height: 25px"></div>
					<Button
						:is-loading="store.isLoading"
						:disabled="!store.isFormValid || store.isLoading"
						type="submit"
						>Giriş Yap</Button
					>
					<RouterLink to="sign-up" class="text-link"
						>Üyeliğin yok mu? Kayıt ol</RouterLink
					>
				</div>
			</form>
		</template>
	</SplitLayout>
</template>
<style lang="css" scoped>
.pane-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	align-self: stretch;
	justify-content: center;
	user-select: none;
}
.logo-title {
	font-size: 54pt;
	font-weight: 500;
	text-align: center;
}
.logo-subtitle {
	font-size: 24pt;
	text-align: center;
	font-weight: 400;
	opacity: 0.4;
}
.pane-content > button {
	min-width: 200px;
	background-color: transparent;
	color: #424242;
	border: 1px solid white;
	border-radius: 25px;
	background-color: white;
}
.outlined-text-shadow {
	color: #424242;
	text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
		1px 1px 0 white;
}
</style>
