import { defineStore } from "pinia";
import type { LoginActions, LoginGetters, LoginState } from "./login.interface";
import type { FormError } from "@/services/api.service";

const validateForm = (email: string, password: string): boolean => {
	return email !== "" && password !== "";
};

export const useLoginStore = defineStore<
	"login",
	LoginState,
	LoginGetters,
	LoginActions
>("login", {
	state: (): LoginState => ({
		email: "",
		password: "",
		rememberMe: JSON.parse(localStorage.getItem("rememberMe") ?? "false"),
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
		isFormValid: (state: LoginState): boolean => {
			return validateForm(state.email, state.password);
		},
	},
	actions: {
		setIsLoading(l: boolean) {
			this.isLoading = l;
		},
		setError(e: FormError) {
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
			this.email = "";
			this.password = "";
			this.rememberMe = false;
		},
		setRememberMe(r: boolean) {
			this.rememberMe = r;
		},
		setEmail(e: string) {
			this.email = e;
		},
		setPassword(p: string) {
			this.password = p;
		},
	},
});
