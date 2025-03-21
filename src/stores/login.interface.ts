import type { FormError } from "@/services/api.service";

export interface LoginState {
	email: string;
	password: string;
	error: FormError;
	rememberMe: boolean;
	isLoading: boolean;
}
export interface LoginGetters {
	isFormValid: (state: LoginState) => boolean;
	[key: string]: (
		state: LoginState
	) => boolean | string | number | object | undefined;
}
export interface LoginActions {
	setIsLoading: (l: boolean) => void;
	setError: (e: FormError) => void;
	resetError: () => void;
	resetForm: () => void;
	setRememberMe: (r: boolean) => void;
	setEmail: (e: string) => void;
	setPassword: (p: string) => void;
}
