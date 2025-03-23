import axios from "axios";

interface Book {
	author_key: string[];
	author_name: string[];
	edition_count: number;
	first_publish_year: number;
	has_fulltext: boolean;
	key: string;
	language: string[];
	public_scan_b: boolean;
	title: string;
}

export interface OpenApiSearchResponse {
	numFound: number;
	start: number;
	numFoundExact: boolean;
	num_found: number;
	documentation_url: string;
	q: string;
	offset: number;
	books: Book[];
}

interface ExternalApiService {
	search: () => OpenApiSearchResponse;
}

const client = axios.create({
	baseURL: "https://openlibrary.org/",
	timeout: 10000,
});

export const useExternalApiService = () => {};
