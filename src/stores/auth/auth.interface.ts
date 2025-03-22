import type { Ref } from "vue";

export interface User {
	name: string;
	email: string;
	password: string;
}

interface AuthState {
	user: Ref<User | null>;
	isLoading: Ref<boolean>;
	accessToken: Ref<string>;
	isAuthenticated: Ref<boolean>;
}

interface AuthGetters {}

interface AuthActions {
	setSession: () => void;
	setUser: (u: User | null, isLoggedIn: boolean) => void;
	setToken: (token: string) => void;
	logout: () => void;
}

export type AuthStore = AuthState & AuthGetters & AuthActions;
