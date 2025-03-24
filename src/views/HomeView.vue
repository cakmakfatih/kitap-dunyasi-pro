<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import { OPEN_LIBRARY_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { useBookStore } from "@/stores/book/book.store";
import { storeToRefs } from "pinia";

const store = useBookStore();
const { isFetchingAnything } = storeToRefs(store);

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
	<MainLayout> {{ isFetchingAnything }} </MainLayout>
</template>
