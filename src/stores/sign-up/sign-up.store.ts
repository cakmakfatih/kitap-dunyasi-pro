import { defineStore } from "pinia";
import type { SignUpStore } from "./sign-up.interface";
import { emptyErrors, type FormError } from "@/services/api.service";
import { computed, reactive, ref } from "vue";

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

export const useSignUpStore = defineStore<"sign-up", SignUpStore>(
	"sign-up",
	() => {
		const [name, email, password, isAgreementAccepted, isLoading, error] = [
			ref(""),
			ref(""),
			ref(""),
			ref(false),
			ref(false),
			reactive(Object.assign({}, emptyErrors)),
		];

		const isFormValid = computed(() =>
			validateForm(
				name.value,
				email.value,
				password.value,
				isAgreementAccepted.value
			)
		);

		function setError(e: FormError) {
			error.generalError = e.generalError;
			error.hasErrors = e.hasErrors;
			error.fieldErrors = {
				name: [...e.fieldErrors.name],
				email: [...e.fieldErrors.email],
				password: [...e.fieldErrors.password],
			};
		}
		function setIsLoading(l: boolean) {
			isLoading.value = l;
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
			isAgreementAccepted,
			isLoading,
			error,
			isFormValid,
			setError,
			setIsLoading,
			resetError,
			resetForm,
		};
	}
);
