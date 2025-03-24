import type { Book } from "@/services/external.api.service";
import type { ComputedRef, Reactive } from "vue";

export interface SubjectState {
	currentPage: number;
	lastPage?: number;
	isFetching: boolean;
	totalNum: number;
}

export interface Subject {
	state: SubjectState;
	books: Book[];
}

interface BookState {
	subjects: Reactive<Map<string, Subject>>;
}

interface BookGetters {
	isFetchingAnything: ComputedRef<boolean>;
}

interface BookActions {
	fetchBooksBySubject: (subjectName: string, count?: number) => void;
}

export type BookStore = BookState & BookGetters & BookActions;
