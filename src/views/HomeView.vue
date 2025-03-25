<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import SlidableHorizontalList from "@/components/shared/SlidableHorizontalList.vue";
import { OPEN_LIBRARY_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { useBookStore } from "@/stores/book/book.store";
import { storeToRefs } from "pinia";

const store = useBookStore();
const { subjects, isFetchingAnything } = storeToRefs(store);

if (!store.subjects.has("home")) {
	const initialFetchCategories = [...OPEN_LIBRARY_CATEGORIES]
		.map((i) => slugify(i.value))
		.slice(1, 5);

	Promise.all([
		store.fetchBooksBySubject("new"),
		initialFetchCategories.map((i) => store.fetchBooksBySubject(i)),
	]);
}
</script>
<template>
	<MainLayout>
		<SlidableHorizontalList
			:subject="'Yeni'"
			:books="subjects.get('new')?.books"
		/>
		<SlidableHorizontalList
			:subject="'Sanat'"
			:books="subjects.get('art')?.books"
		/>
		<SlidableHorizontalList
			:subject="'Hayvanlar'"
			:books="subjects.get('animals')?.books"
		/>
		<SlidableHorizontalList
			:subject="'Kurgu'"
			:books="subjects.get('fiction')?.books"
		/>
		<SlidableHorizontalList
			:subject="'Bilim ve Matematik'"
			:books="subjects.get('science-mathematics')?.books"
		/>
	</MainLayout>
</template>
