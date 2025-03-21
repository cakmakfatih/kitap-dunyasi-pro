import type { RegisterError } from "@/services/api.service";

export interface SignUpState {
	name: string;
	email: string;
	password: string;
	isAgreementAccepted: boolean;
	isLoading: boolean;
	error: RegisterError;
}

export interface SignUpGetters {
	isFormValid: (state: SignUpState) => boolean;
	[key: string]: (
		state: SignUpState
	) => boolean | string | number | object | undefined;
}

export interface SignUpActions {
	setIsLoading: (l: boolean) => void;
	setError: (e: RegisterError) => void;
	resetError: () => void;
	resetForm: () => void;
}
