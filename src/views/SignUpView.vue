<script setup lang="ts">
import SplitLayout from "@/components/layouts/SplitLayout.vue";
import Button from "@/components/shared/Button.vue";
import TextInput from "@/components/shared/TextInput.vue";
import Checkbox from "@/components/shared/Checkbox.vue";

import Logo from "@/assets/logo.png";

import { useSignUpStore } from "@/stores/sign-up.store";

const store = useSignUpStore();

const onSubmit = (e: Event) => {
	e.preventDefault();
};
</script>

<template>
	<SplitLayout>
		<template #left>
			<section class="left-pane">
				<img :src="Logo" width="196px" alt="" />
				<h1 class="logo-title">Kitap Dünyası Pro</h1>
				<span class="form-subtitle"
					>İstediğin kitabı bul, ekle, takip et, arkadaşlarınla paylaş!</span
				>
			</section>
		</template>
		<template #right>
			<form @submit="onSubmit" class="form-wrapper">
				<div class="form">
					<header class="form-header">
						<h1 class="form-title">Kayıt Ol</h1>
						<span class="form-subtitle"
							>İstediğin kitabı bul, ekle, takip et, arkadaşlarınla
							paylaş!</span
						>
					</header>
					<TextInput v-model="store.name" type="text" label="İsim" required />
					<TextInput
						v-model="store.email"
						type="email"
						label="E-posta"
						required
					/>
					<TextInput
						v-model="store.password"
						type="password"
						label="Şifre"
						required
					/>
					<Checkbox v-model="store.isAgreementAccepted"
						>Üyelik sözleşmesini kabul ediyorum</Checkbox
					>
					<Button :disabled="!store.isFormValid" type="submit">Kayıt Ol</Button>
					<span class="already-a-member">Zaten üye misin? Giriş yap.</span>
				</div>
			</form>
		</template>
	</SplitLayout>
</template>
<style lang="css" scoped>
.already-a-member {
	text-align: center;
	padding: 10px 10px;
	text-decoration: underline;
	cursor: pointer;
	opacity: 0.4;
	transition: opacity 0.15s;
}
.already-a-member:hover {
	opacity: 0.8;
}
.already-a-member:active {
	opacity: 0.4;
}
.left-pane {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.logo-title {
	font-size: 38px;
	font-weight: bold;
	color: var(--color-primary);
}
</style>
