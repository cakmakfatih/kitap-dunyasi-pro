import type { User } from "@/stores/auth/auth.interface";
import type { AxiosRequestHeaders, AxiosResponse } from "axios";

export interface FormError {
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
	error: FormError;
}

export interface LoginUserResponse {
	success: boolean;
	token: string | null;
	error: FormError;
}

export const emptyErrors: FormError = {
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

	const errors = Object.assign({}, emptyErrors);
	errors.hasErrors = false;
	errors.generalError = "";
	errors.fieldErrors.name = [];
	errors.fieldErrors.email = [];
	errors.fieldErrors.password = [];

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
	localStorage.setItem("accessToken", token);

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
	const register = async ({
		name,
		email,
		password,
	}: User): Promise<RegisterUserResponse> => {
		const mockLoadingTime = 1000;

		return new Promise((resolve, reject) => {
			return setTimeout(async () => {
				try {
					const result: AxiosResponse<RegisterUserResponse> =
						await registerUser({
							name,
							email,
							password,
						});

					resolve(result.data);
				} catch (err) {
					reject((err as AxiosResponse<RegisterUserResponse>).data);
				}
			}, mockLoadingTime);
		});
	};

	const login = async (
		email: string,
		password: string
	): Promise<LoginUserResponse> => {
		const mockLoadingTime = 1000;
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				const errors = Object.assign({}, emptyErrors);
				errors.hasErrors = false;
				errors.generalError = "";
				errors.fieldErrors.name = [];
				errors.fieldErrors.email = [];
				errors.fieldErrors.password = [];
				const users: { [key: string]: User } = JSON.parse(
					localStorage.getItem("users") ?? "[]"
				);
				const userKeys = Object.keys(users);
				const userValues = Object.values(users);

				const userIdx = userValues.findIndex(
					(u) => u.email === email && u.password === password
				);
				if (userIdx !== -1) {
					localStorage.setItem("accessToken", userKeys[userIdx]);
					resolve({
						success: true,
						token: userKeys[userIdx],
						error: errors,
					});
				}

				const userDoesntExist =
					userValues.findIndex((u) => u.email === email) === -1;
				if (userDoesntExist) {
					errors.generalError = "Kullanıcı mevcut değil.";
					reject({
						success: false,
						token: null,
						error: errors,
					});
				}

				const userExistsCredentialsWrong =
					userValues.findIndex(
						(u) => u.email === email && u.password !== password
					) === -1;
				if (userExistsCredentialsWrong) {
					errors.generalError = "Şifre hatalı.";
					reject({
						success: false,
						token: null,
						error: errors,
					});
				}

				errors.generalError = "Beklenmedik bir hata meydana geldi.";
				reject({
					success: false,
					token: null,
					error: errors,
				});
			}, mockLoadingTime);
		});
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
				const user = decodeToken(token);
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
		} catch (err) {
			return {
				user: null,
				isLoggedIn: false,
			};
		}
	};

	return {
		getSession,
		register,
		login,
	};
}
