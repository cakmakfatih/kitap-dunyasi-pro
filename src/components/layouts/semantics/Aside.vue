<script lang="ts" setup>
import {
	OPEN_LIBRARY_CATEGORIES,
	type OpenLibraryCategory,
} from "@/lib/constants";
import CategoryLink from "@/components/shared/CategoryLink.vue";

interface Props {
	categories?: OpenLibraryCategory[];
}

const { categories } = withDefaults(defineProps<Props>(), {
	categories: () => Object.assign([], OPEN_LIBRARY_CATEGORIES),
});
</script>
<template>
	<aside>
		<nav>
			<ul>
				<CategoryLink
					v-for="(item, index) in categories"
					:category="item"
					:key="index"
				/>
			</ul>
		</nav>
	</aside>
</template>
<style lang="css" scoped>
aside {
	background-color: white;
	border-right: 1px solid #d9d9d9;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 350px;
}
nav {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	overflow-y: auto;
}
ul {
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: stretch;
	margin: 0px;
	list-style-type: none;
	padding: 0px;
}
</style>
