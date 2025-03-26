<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import SlidableHorizontalList from "@/components/shared/SlidableHorizontalList.vue";
import { OPEN_LIBRARY_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { useBookStore } from "@/stores/book/book.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useBookStore();
const { subjects, isFetchingAnything } = storeToRefs(store);

const subjectKeys = computed(() => Array.from(subjects.value.keys()));
const subjectValues = computed(() => Array.from(subjects.value.values()));

const fetchCategoryCount = 3;

if (subjectValues.value.length === 0) {
	fetchHomeSubjects();
}

function fetchHomeSubjects() {
	const fetchCategories = [];
	let subjectsToFetch: number = 0;
	if (subjectKeys.value.length < OPEN_LIBRARY_CATEGORIES.length) {
		const lengthDiff =
			OPEN_LIBRARY_CATEGORIES.length - subjectKeys.value.length;
		subjectsToFetch =
			lengthDiff > fetchCategoryCount ? fetchCategoryCount : lengthDiff;
	}

	if (subjectsToFetch == 0) {
		return;
	}

	const startIdx = subjectValues.value.length;
	const endIdx = startIdx + subjectsToFetch;
	if (startIdx === 0) {
		const initialCategories = [...OPEN_LIBRARY_CATEGORIES].slice(
			startIdx + 1,
			endIdx
		);
		const mappedVals = initialCategories.map((i) => ({
			subjectName: slugify(i.value),
			title: i.name,
		}));
		fetchCategories.push(
			{
				subjectName: "home",
				title: "Karışık",
			},
			...mappedVals
		);
	} else {
		const initialCategories = [...OPEN_LIBRARY_CATEGORIES].slice(
			startIdx,
			endIdx
		);
		const mappedVals = initialCategories.map((i) => ({
			subjectName: slugify(i.value),
			title: i.name,
		}));
		fetchCategories.push(...mappedVals);
	}

	Promise.all(
		fetchCategories.map((i) =>
			store.fetchBooksBySubject(i.subjectName, i.title)
		)
	);
}

function onScroll(e: Event) {
	if (isFetchingAnything.value) {
		return;
	}
	const element = e.target as HTMLElement;
	if (!element) return;

	const isScrolledToBottom =
		element.scrollHeight - element.scrollTop <= element.clientHeight + 10;

	if (isScrolledToBottom) {
		fetchHomeSubjects();
	}
}
</script>
<template>
	<MainLayout @scroll="onScroll">
		<SlidableHorizontalList
			v-for="(subject, index) in subjectValues"
			:key="index"
			:is-loading="subject.state.isFetching"
			:state="subject.state"
			:books="subject.books"
		/>
	</MainLayout>
</template>
