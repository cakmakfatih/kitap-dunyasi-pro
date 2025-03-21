import { defineStore } from "pinia";
import type { SignUpState } from "./sign-up.interface";
import { computed, reactive, ref } from "vue";
import {
	emptyRegisterErrors,
	type RegisterError,
} from "@/services/api.service";

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
	const isLoading = ref<boolean>(false);
	const error = reactive<RegisterError>(Object.assign({}, emptyRegisterErrors));

	const isFormValid = computed(() =>
		validateForm(
			name.value,
			email.value,
			password.value,
			isAgreementAccepted.value
		)
	);

	function setIsLoading(l: boolean) {
		isLoading.value = l;
	}

	function setError(e: RegisterError) {
		error.hasErrors = e.hasErrors;
		error.generalError = e.generalError;

		error.fieldErrors = {
			name: [...e.fieldErrors.name],
			email: [...e.fieldErrors.email],
			password: [...e.fieldErrors.password],
		};
	}

	function resetError() {
		error.generalError = "";
		error.hasErrors = false;
		error.fieldErrors = {
			name: [],
			email: [],
			password: [],
		};
	}

	function resetForm() {
		name.value = "";
		email.value = "";
		password.value = "";
		isAgreementAccepted.value = false;
	}

	return {
		name,
		email,
		password,
		error,
		isAgreementAccepted,
		isFormValid,
		isLoading,
		setIsLoading,
		setError,
		resetError,
		resetForm,
	};
});
