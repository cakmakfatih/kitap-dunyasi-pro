import type { RegisterError } from "@/services/api.service";
import type { ComputedRef, Reactive, Ref } from "vue";

export interface SignUpState {
	name: Ref<string>;
	email: Ref<string>;
	password: Ref<string>;
	isAgreementAccepted: Ref<boolean>;
	isFormValid: ComputedRef<boolean>;
	isLoading: Ref<boolean>;
	error: Reactive<RegisterError>;
	setIsLoading: (l: boolean) => void;
	setError: (e: RegisterError) => void;
	resetError: () => void;
	resetForm: () => void;
}
