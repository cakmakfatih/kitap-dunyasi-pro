import { defineStore } from "pinia";
import type { SignUpState } from "./sign-up.interface";
import { computed, ref } from "vue";

const validateForm = (
	name: string,
	email: string,
	password: string,
	isAgreementAccepted: boolean
) => {
	return (
		name.length > 0 &&
		email.length > 0 &&
		password.length > 0 &&
		isAgreementAccepted
	);
};

export const useSignUpStore = defineStore("sign-up", (): SignUpState => {
	const name = ref<string>("");
	const email = ref<string>("");
	const password = ref<string>("");
	const isAgreementAccepted = ref<boolean>(false);

	const isFormValid = computed(() =>
		validateForm(
			name.value,
			email.value,
			password.value,
			isAgreementAccepted.value
		)
	);

	return {
		name,
		email,
		password,
		isAgreementAccepted,
		isFormValid,
	};
});
