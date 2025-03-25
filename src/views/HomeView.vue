<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import SlidableHorizontalList from "@/components/shared/SlidableHorizontalList.vue";
import { OPEN_LIBRARY_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { useBookStore } from "@/stores/book/book.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useBookStore();
const { subjects } = storeToRefs(store);

if (!store.subjects.has("home")) {
	const initialFetchCategories = [...OPEN_LIBRARY_CATEGORIES]
		.map((i) => ({
			subjectName: slugify(i.value),
			title: i.name,
		}))
		.slice(1);

	Promise.all([
		store.fetchBooksBySubject("", "Karışık"),
		initialFetchCategories.map((i) =>
			store.fetchBooksBySubject(i.subjectName, i.title)
		),
	]);
}

const subjectValues = computed(() => Array.from(subjects.value.values()));
</script>
<template>
	<MainLayout>
		<SlidableHorizontalList
			v-for="(subject, index) in subjectValues"
			:key="index"
			:is-loading="subject.state.isFetching"
			:state="subject.state"
			:books="subject.books"
		/>
	</MainLayout>
</template>
