<script setup lang="ts">
import SplitLayout from "@/components/layouts/SplitLayout.vue";
import Button from "@/components/shared/Button.vue";
import TextInput from "@/components/shared/TextInput.vue";
import Checkbox from "@/components/shared/Checkbox.vue";
import Logo from "@/components/shared/Logo.vue";

import BgLogin from "@/assets/bg-login.jpg";

import { useLoginStore } from "@/stores/login/login.store";
import { storeToRefs } from "pinia";
import { useApiService, type LoginUserResponse } from "@/services/api.service";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

const apiService = useApiService();
const store = useLoginStore();
const authStore = useAuthStore();

const { rememberMe } = storeToRefs(store);

if (!rememberMe.value) {
	store.setEmail("");
	store.setPassword("");
}

const login = async (e: Event) => {
	e.preventDefault();

	store.setIsLoading(true);
	store.resetError();

	try {
		const result = await apiService.login(store.email, store.password);

		if (result.success && !result.error.hasErrors) {
			authStore.setToken(result.token ?? "");
			authStore.setSession();

			if (!rememberMe.value) {
				store.resetForm();
			}

			router.replace({ path: "/" });
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
</script>

<template>
	<SplitLayout>
		<template #left>
			<section class="left-pane" :style="bgStyle">
				<div class="pane-content">
					<Logo :font-size-pt="44" />
					<span class="form-subtitle logo-subtitle"
						>İstediğin kitabı bul, ekle, takip et, arkadaşlarınla paylaş!</span
					>
					<div style="height: 25px"></div>
					<Button :is-rounded="true" :is-outline="true">Daha Fazla</Button>
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
.logo-subtitle {
	font-size: 20pt;
	text-align: center;
	font-weight: 400;
	opacity: 0.8;
	color: #424242;
}
@media (max-width: 1350px) {
	.logo-title {
		font-size: 34pt;
	}
	.logo-subtitle {
		font-size: 14pt;
	}
}
</style>
