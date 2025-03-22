import { defineStore } from "pinia";
import { type User, type AuthStore } from "./auth.interface";
import { useApiService } from "@/services/api.service";
import { ref } from "vue";

export const useAuthStore = defineStore<"auth", AuthStore>("auth", () => {
	const apiService = useApiService();
	const [user, isLoading, accessToken, isAuthenticated] = [
		ref<User | null>(null),
		ref(false),
		ref(""),
		ref(false),
	];
	function setToken(token: string) {
		accessToken.value = token;
	}
	function setUser(u: User | null, isLoggedIn: boolean) {
		isLoading.value = true;

		if (!isLoggedIn) {
			user.value = null;
			accessToken.value = "";
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
		user,
		isLoading,
		accessToken,
		isAuthenticated,
		setToken,
		setUser,
		setSession,
		logout,
	};
}, {
	persist: [
		{
			pick: ["accessToken"],
		},
		{
			pick: ["user"],
			storage: sessionStorage,
		},
	],
});
