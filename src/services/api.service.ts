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

async function mockAuthCheck(): Promise<AxiosResponse<boolean>> {
	const axiosResponse: AxiosResponse<boolean> = {
		data: false,
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

	const isAuthenticated = async (): Promise<boolean> => {
		loading.value = true;
		error.value = null;

		try {
			const authenticated = await mockAuthCheck();
			return authenticated.data;
		} catch (err) {
			error.value = (err as Error).message;
			return false;
		} finally {
			loading.value = false;
		}
	};

	return {
		data,
		error,
		loading,
		isAuthenticated,
		get,
		post,
	};
}
