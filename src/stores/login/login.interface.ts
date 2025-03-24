import type { FormError } from "@/services/api.service";
import type { ComputedRef, Reactive, Ref } from "vue";

export interface LoginState {
	email: Ref<string>;
	password: Ref<string>;
	error: Reactive<FormError>;
	rememberMe: Ref<boolean>;
	isLoading: Ref<boolean>;
}

interface LoginActions {
	setIsLoading: (l: boolean) => void;
	setError: (e: FormError) => void;
	resetError: () => void;
	resetForm: () => void;
	setRememberMe: (r: boolean) => void;
	setEmail: (e: string) => void;
	setPassword: (p: string) => void;
}

interface LoginGetters {
	isFormValid: ComputedRef<boolean>;
}

export type LoginStore = LoginState & LoginActions & LoginGetters;
