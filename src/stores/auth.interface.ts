export interface User {
	name: string;
	email: string;
	password: string;
}

export interface AuthState {
	user: User | null;
	isLoading: boolean;
	accessToken: string;
	isAuthenticated: boolean;
}

export interface AuthGetters {
	[key: string]: (state: AuthState) => any;
}

export interface AuthActions {
	setSession: () => void;
	setUser: (u: User | null, isLoggedIn: boolean) => void;
	setToken: (token: string) => void;
	logout: () => void;
}
