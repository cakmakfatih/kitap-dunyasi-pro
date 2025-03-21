import { defineStore } from "pinia";
import type {
	SignUpActions,
	SignUpGetters,
	SignUpState,
} from "./sign-up.interface";
import { type RegisterError } from "@/services/api.service";

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

export const useSignUpStore = defineStore<
	"sign-up",
	SignUpState,
	SignUpGetters,
	SignUpActions
>("sign-up", {
	state: (): SignUpState => ({
		name: "",
		email: "",
		password: "",
		isAgreementAccepted: false,
		isLoading: false,
		error: {
			hasErrors: false,
			generalError: "",
			fieldErrors: {
				name: [],
				email: [],
				password: [],
			},
		},
	}),
	getters: {
		isFormValid: (state: SignUpState): boolean => {
			return validateForm(
				state.name,
				state.email,
				state.password,
				state.isAgreementAccepted
			);
		},
	},
	actions: {
		setIsLoading(l: boolean) {
			this.isLoading = l;
		},
		setError(e: RegisterError) {
			this.error.generalError = e.generalError;
			this.error.hasErrors = e.hasErrors;
			this.error.fieldErrors = {
				name: [...e.fieldErrors.name],
				email: [...e.fieldErrors.email],
				password: [...e.fieldErrors.password],
			};
		},
		resetError() {
			this.error.generalError = "";
			this.error.hasErrors = false;
			this.error.fieldErrors = {
				name: [],
				email: [],
				password: [],
			};
		},
		resetForm() {
			this.name = "";
			this.email = "";
			this.password = "";
			this.isAgreementAccepted = false;
		},
	},
});
