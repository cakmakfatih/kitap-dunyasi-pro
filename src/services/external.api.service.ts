import axios, { type AxiosResponse, type ParamEncoder } from "axios";

export interface Book {
	author_key: string[];
	author_name: string[];
	edition_count: number;
	first_publish_year: number;
	has_fulltext: boolean;
	key: string;
	language: string[];
	public_scan_b: boolean;
	title: string;
	cover_i?: string;
	cover_edition_key?: string;
	img_url: string;
}

export interface OpenLibrarySearchResponse {
	numFound: number;
	start: number;
	numFoundExact: boolean;
	num_found: number;
	documentation_url: string;
	q: string;
	offset: number;
	docs: Book[];
}

interface ExternalApiService {
	search: (
		params: BookSearchParams
	) => Promise<AxiosResponse<OpenLibrarySearchResponse>>;
}

export interface BookSearchParams {
	sort: "new";
	offset: number;
	limit: number;
	language: "tur" | "eng";
	subject?: string;
}

const openLibParamEncoder: ParamEncoder = (value: string) => {
	return encodeURIComponent(value).replace(/%20/g, "+").replace(/%2B/g, "+");
};

const client = axios.create({
	baseURL: "https://openlibrary.org/",
	timeout: 30000,
	headers: { "Content-Type": "application/json" },
	paramsSerializer: {
		encode: openLibParamEncoder,
	},
	validateStatus: () => true,
});

function search(
	params: BookSearchParams
): Promise<AxiosResponse<OpenLibrarySearchResponse>> {
	const { subject, limit, offset } = params;
	let q = "*";
	if (subject !== undefined) {
		q += "+subject:" + subject;
	}

	return client.get<OpenLibrarySearchResponse>("search.json", {
		method: "get",
		params: {
			q,
			limit,
			offset,
		},
	});
}

export const useExternalApiService = (): ExternalApiService => {
	return {
		search,
	};
};
