import { defineStore } from "pinia";
import { type User, type AuthState } from "./auth.interface";
import { ref } from "vue";
import { useApiService } from "@/services/api.service";

export const useAuthStore = defineStore("auth", (): AuthState => {
	const apiService = useApiService();
	const accessToken = ref<string>(localStorage.getItem("accessToken") || "");
	const isLoading = ref<boolean>(true);
	const isAuthenticated = ref<boolean>(false);
	const user = ref<User | null>(null);

	function setToken(token: string) {
		accessToken.value = token;
		localStorage.setItem("accessToken", token);
	}
	function setUser(u: User | null, isLoggedIn: boolean) {
		isLoading.value = true;

		if (!isLoggedIn) {
			accessToken.value = "";
			localStorage.removeItem("accessToken");
			isAuthenticated.value = false;
		} else {
			user.value = u;
			isAuthenticated.value = true;
		}
		isLoading.value = false;
	}
	function setSession() {
		isLoading.value = true;
		apiService
			.getSession(accessToken.value)
			.then((res) => {
				setUser(res.user, res.isLoggedIn);
			})
			.catch(() => {
				setUser(null, false);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}
	function logout() {
		isLoading.value = true;
		setUser(null, false);
		isLoading.value = false;
	}

	return {
		isLoading,
		accessToken,
		user,
		setSession,
		setUser,
		setToken,
		logout,
		isAuthenticated,
	};
});
