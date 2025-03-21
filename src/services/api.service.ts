import type { User } from "@/stores/auth.interface";
import type {
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from "axios";
import axios from "axios";
import { ref } from "vue";

const client = axios.create({
	baseURL: "",
});

export interface RegisterError {
	hasErrors: boolean;
	generalError: string;
	fieldErrors: {
		name: string[];
		email: string[];
		password: string[];
	};
}

export interface RegisterUserResponse {
	success: boolean;
	token: string | null;
	error: RegisterError;
}

const emptyErrors: RegisterError = {
	hasErrors: false,
	generalError: "",
	fieldErrors: {
		name: [],
		email: [],
		password: [],
	},
};

async function registerUser({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}): Promise<AxiosResponse<RegisterUserResponse>> {
	const existingUsersStr = localStorage.getItem("users") ?? "[]";

	const users: { [key: string]: User } = JSON.parse(existingUsersStr);
	const emails: string[] = Object.values(users).map((i) => i.email);

	const errors = { ...emptyErrors };

	if (emails.find((e) => e === email)) {
		errors.hasErrors = true;
		errors.fieldErrors.email.push("Email is already in use by another user.");
	}

	if (errors.hasErrors) {
		const response: AxiosResponse<RegisterUserResponse> = {
			data: {
				success: false,
				token: null,
				error: errors,
			},
			status: 401,
			statusText: "OK",
			config: {
				url: "",
				method: "post",
				headers: {} as AxiosRequestHeaders,
			},
			headers: {},
		};

		return Promise.reject(response);
	}

	const user = {
		name,
		email,
		password,
	};

	const token = createMockToken();
	localStorage.setItem(
		"users",
		JSON.stringify({ ...users, [token]: { ...user } })
	);

	const response: AxiosResponse<RegisterUserResponse> = {
		data: {
			success: true,
			token,
			error: errors,
		},
		status: 200,
		statusText: "OK",
		config: {
			url: "",
			method: "post",
			headers: {} as AxiosRequestHeaders,
		},
		headers: {},
	};

	return Promise.resolve(response);
}

function createMockToken(): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
	let token = "";

	for (let i = 0; i < 32; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return token;
}

function decodeToken(token: string): User | null {
	const users: { [key: string]: User } = JSON.parse(
		localStorage.getItem("users") || "{}"
	);

	if (Object.keys(users).find((i) => i === token)) {
		return { ...users[token] };
	}

	return null;
}

async function mockAuthCheck(token: string): Promise<AxiosResponse<boolean>> {
	const tokenResult = decodeToken(token);

	if (tokenResult) {
		const axiosResponse: AxiosResponse<boolean> = {
			data: true,
			status: 200,
			statusText: "OK",
			config: {
				url: "",
				method: "get",
				headers: {} as AxiosRequestHeaders,
			},
			headers: {},
		};

		return Promise.resolve(axiosResponse);
	}

	return Promise.reject(false);
}

export function useApiService() {
	const data = ref<unknown>(null);
	const error = ref<string | null>(null);
	const loading = ref<boolean>(false);

	const get = async <T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<void> => {
		loading.value = true;
		error.value = null;

		try {
			const response: AxiosResponse<T> = await client.get(url, config);
			data.value = response.data;
		} catch (err) {
			error.value = (err as Error).message;
		} finally {
			loading.value = false;
		}
	};

	const post = async <T, P = any>(
		url: string,
		payload: P,
		config?: AxiosRequestConfig
	): Promise<void> => {
		loading.value = true;
		error.value = null;

		try {
			const response: AxiosResponse = await client.post(url, payload, config);
			data.value = response.data;
		} catch (err) {
			error.value = (err as Error).message;
		} finally {
			loading.value = false;
		}
	};

	const register = async ({
		name,
		email,
		password,
	}: User): Promise<RegisterUserResponse> => {
		const mockLoadingTime = 1000;

		return new Promise((resolve, reject) => {
			return setTimeout(async () => {
				try {
					loading.value = true;
					const result: AxiosResponse<RegisterUserResponse> =
						await registerUser({
							name,
							email,
							password,
						});

					resolve(result.data);
				} catch (err) {
					reject((err as AxiosResponse<RegisterUserResponse>).data);
				} finally {
					loading.value = false;
				}
			}, mockLoadingTime);
		});
	};

	const login = async (
		email: string,
		password: string
	): Promise<User | null> => {
		const user = decodeToken(localStorage.getItem("accessToken") ?? "");

		if (!user) {
			return null;
		}

		return user;
	};

	const getSession = async (
		token: string
	): Promise<{
		user: User | null;
		isLoggedIn: boolean;
	}> => {
		try {
			const authenticated = await mockAuthCheck(token);
			if (authenticated.data) {
				const user = decodeToken(token)!;
				return {
					user,
					isLoggedIn: true,
				};
			} else {
				return {
					user: null,
					isLoggedIn: false,
				};
			}
		} catch (_) {
			return {
				user: null,
				isLoggedIn: false,
			};
		} finally {
			loading.value = false;
		}
	};

	return {
		data,
		getSession,
		get,
		post,
		register,
	};
}
