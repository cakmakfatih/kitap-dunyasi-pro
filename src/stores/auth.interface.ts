import type { Ref } from "vue";

export interface User {
	name: string;
	email: string;
	password: string;
}

export interface AuthState {
	user: Ref<User | null>;
	isLoading: Ref<boolean>;
	accessToken: Ref<string>;
	isAuthenticated: Ref<boolean>;
	setSession: () => void;
	setUser: (u: User | null, isLoggedIn: boolean) => void;
	setToken: (token: string) => void;
	logout: () => void;
}
