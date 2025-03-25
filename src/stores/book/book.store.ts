import { defineStore } from "pinia";
import { type BookStore, type Subject } from "./book.interface";
import { computed, reactive } from "vue";
import {
	useExternalApiService,
	type Book,
	type BookSearchParams,
} from "@/services/external.api.service";

const DEFAULT_COUNT = 20;

function mapBooksToCoveredBooks(books: Book[], size: "S" | "M" | "L") {
	const booksWithImages: Book[] = [];

	for (let i = 0; i < books.length; i++) {
		const book: Book = Object.assign({}, books[i]);
		if (book.cover_edition_key !== undefined) {
			book.img_url = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-${size}.jpg`;
			booksWithImages.push(book);
			continue;
		}
		if (book.cover_i !== undefined) {
			book.img_url = `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`;
			booksWithImages.push(book);
			continue;
		}
		book.img_url = "";
	}

	return booksWithImages;
}

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
		title: string,
		count: number = DEFAULT_COUNT
	) {
		if (!subjects.has(subjectName)) {
			subjects.set(subjectName, {
				state: {
					title: title,
					currentPage: 0,
					lastPage: undefined,
					isFetching: false,
					totalNum: 0,
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
			subject: subjectName === "home" ? "" : subjectName,
		};
		const response = await externalApi.search(searchParams);
		subject.state = { ...subject.state, isFetching: false };

		if (response.status !== 200) {
			return;
		}

		subject.state = {
			...subject.state,
			currentPage: subject.state.currentPage + 1,
			lastPage: Math.ceil(response.data.numFound / count),
			totalNum: response.data.numFound,
		};
		const coveredBooks = mapBooksToCoveredBooks(response.data.docs, "M");
		subject.books = [...subject.books, ...coveredBooks];
	}

	return {
		subjects,
		fetchBooksBySubject,
		isFetchingAnything,
	};
});
