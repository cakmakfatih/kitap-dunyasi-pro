import type { ComputedRef, Ref } from "vue";

export interface SignUpState {
	name: Ref<string>;
	email: Ref<string>;
	password: Ref<string>;
	isAgreementAccepted: Ref<boolean>;
	isFormValid: ComputedRef<boolean>;
	isLoading: Ref<boolean>;
	setIsLoading: (l: boolean) => void;
}
