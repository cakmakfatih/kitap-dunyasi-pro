import type { FormError } from "@/services/api.service";
import type { ComputedRef, Reactive, Ref } from "vue";

interface SignUpState {
	name: Ref<string>;
	email: Ref<string>;
	password: Ref<string>;
	isAgreementAccepted: Ref<boolean>;
	isLoading: Ref<boolean>;
	error: Reactive<FormError>;
}

interface SignUpActions {
	setIsLoading: (l: boolean) => void;
	setError: (e: FormError) => void;
	resetError: () => void;
	resetForm: () => void;
}

interface SignUpGetters {
	isFormValid: ComputedRef<boolean>;
}

export type SignUpStore = SignUpState & SignUpActions & SignUpGetters;
