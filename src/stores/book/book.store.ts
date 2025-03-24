import { defineStore } from "pinia";
import { type BookStore, type Subject } from "./book.interface";
import { computed, reactive } from "vue";
import {
	useExternalApiService,
	type BookSearchParams,
} from "@/services/external.api.service";

const DEFAULT_COUNT = 20;

export const useBookStore = defineStore<"book", BookStore>("book", () => {
	const externalApi = useExternalApiService();

	const [subjects] = [reactive(new Map<string, Subject>())];
	const [isFetchingAnything] = [
		computed(() =>
			Array.from(subjects.values()).some((i) => i.state.isFetching)
		),
	];

	async function fetchBooksBySubject(
		subjectName: string,
		count: number = DEFAULT_COUNT
	) {
		if (!subjects.has(subjectName)) {
			subjects.set(subjectName, {
				state: {
					currentPage: 0,
					lastPage: undefined,
					isFetching: false,
				},
				books: [],
			});
		}

		const subject = subjects.get(subjectName)!;
		if (
			subject.state.lastPage !== undefined &&
			subject.state.currentPage >= subject.state.lastPage
		) {
			return;
		}

		subject.state = { ...subject.state, isFetching: true };
		const searchParams: BookSearchParams = {
			language: "tur",
			limit: count,
			offset: subject.state.currentPage * count,
			sort: "new",
			subject: subjectName === "new" ? undefined : subjectName,
		};
		const response = await externalApi.search(searchParams);
		subject.state = { ...subject.state, isFetching: false };

		if (response.status !== 200) {
			return;
		}

		subject.books = [...subject.books, ...response.data.docs];
	}

	return {
		subjects,
		fetchBooksBySubject,
		isFetchingAnything,
	};
});
