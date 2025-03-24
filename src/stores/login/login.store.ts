import { defineStore } from "pinia";
import type { LoginStore } from "./login.interface";
import { emptyErrors, type FormError } from "@/services/api.service";
import { computed, reactive, ref, watch } from "vue";
import storage from "@/lib/storage";

const validateForm = (email: string, password: string): boolean => {
	return email !== "" && password !== "";
};

export const useLoginStore = defineStore<"login", LoginStore>(
	"login",
	() => {
		const loginStorage = storage.get("login");
		const [email, password, error, rememberMe, isLoading] = [
			ref(loginStorage.rememberMe ? loginStorage.email : ""),
			ref(loginStorage.rememberMe ? loginStorage.password : ""),
			reactive(Object.assign({}, emptyErrors)),
			ref(false),
			ref(false),
		];

		const isFormValid = computed(() =>
			validateForm(email.value, password.value)
		);

		function setIsLoading(l: boolean) {
			isLoading.value = l;
		}
		function setError(e: FormError) {
			error.generalError = e.generalError;
			error.hasErrors = e.hasErrors;
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
			email.value = "";
			password.value = "";
		}
		function setRememberMe(r: boolean) {
			rememberMe.value = r;
		}
		function setEmail(e: string) {
			email.value = e;
		}
		function setPassword(p: string) {
			password.value = p;
		}
		watch(email, (state) => {
			if (!rememberMe.value) {
				storage.set("login", { ...storage.get("login"), email: "" });
			}
		});
		watch(password, (state) => {
			if (!rememberMe.value) {
				storage.set("login", { ...storage.get("login"), password: "" });
			}
		});

		return {
			email,
			password,
			error,
			rememberMe,
			isLoading,
			isFormValid,
			setIsLoading,
			setError,
			resetError,
			resetForm,
			setRememberMe,
			setEmail,
			setPassword,
		};
	},
	{
		persist: [
			{
				pick: ["rememberMe", "email", "password"],
			},
		],
	}
);
