import { defineStore } from "pinia";
import {
	type User,
	type AuthState,
	type AuthGetters,
	type AuthActions,
} from "./auth.interface";
import { useApiService } from "@/services/api.service";

export const useAuthStore = defineStore<
	"auth",
	AuthState,
	AuthGetters,
	AuthActions
>("auth", {
	state: (): AuthState => {
		const token = localStorage.getItem("accessToken") ?? "";
		return {
			user: null,
			isLoading: false,
			accessToken: token,
			isAuthenticated: false,
		};
	},
	actions: {
		setToken(token: string) {
			this.accessToken = token;
		},
		setUser(u: User | null, isLoggedIn: boolean) {
			this.isLoading = true;

			if (!isLoggedIn) {
				this.accessToken = "";
				localStorage.removeItem("accessToken");
				this.isAuthenticated = false;
			} else {
				localStorage.setItem("accesToken", this.accessToken);
				this.user = u;
				this.isAuthenticated = true;
			}
			this.isLoading = false;
		},
		setSession() {
			const apiService = useApiService();
			this.isLoading = true;
			apiService
				.getSession(this.accessToken)
				.then((res) => {
					this.setUser(res.user, res.isLoggedIn);
				})
				.catch(() => {
					this.setUser(null, false);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		logout() {
			this.isLoading = true;
			this.setUser(null, false);
			this.isLoading = false;
		},
	},
});
