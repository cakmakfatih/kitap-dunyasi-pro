<script lang="ts" setup>
import Icon from "./Icon.vue";
import type { OpenLibraryCategory } from "@/lib/constants";
import { computed } from "vue";
import { type IconName } from "@/lib/types";

interface Props {
	category: OpenLibraryCategory;
}

const props = defineProps<Props>();

const hasValues = computed(() => props.category.values.length > 0);
const rotateVal = computed(() => (hasValues.value ? 90 : 0));
const iconName = computed<IconName>(() =>
	hasValues.value ? "chevron-right" : "home"
);
const categoryRoute = computed(() =>
	props.category.to === undefined
		? "categories/" + props.category.name.toLowerCase() + "/all"
		: props.category.to
);
</script>
<template>
	<RouterLink
		exactActiveClass="active"
		:to="categoryRoute"
		class="category-link"
		v-expandable
	>
		<div class="category-title" v-click-rotate-inner-icon="rotateVal">
			<Icon :iconName="iconName" />
			<span>{{ props.category.name }}</span>
		</div>
		<ul
			:class="{ 'category-values': true, 'no-margin-vertical': !hasValues }"
			expandable
		>
			<RouterLink :to="categoryRoute" class="category-value" v-if="hasValues"
				>Hepsi</RouterLink
			>
			<RouterLink
				class="category-value"
				v-for="(value, index) in props.category.translations"
				:to="categoryRoute + '/' + props.category.values[index]"
				:key="index"
				>{{ value }}</RouterLink
			>
		</ul>
	</RouterLink>
</template>
<style lang="css" scoped>
.category-link {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	border-bottom: 1px solid #d9d9d9;
	text-decoration: none;
	color: #424242;
	transition: background-color 0.175s;
}
.category-title {
	user-select: none;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	cursor: pointer;
}
.category-title > span {
	margin-left: 10px;
}
.category-link:not(.active):hover {
	background-color: #eee;
}
.category-link:not(.active):active {
	background-color: #ddd;
}
.category-title:last-child {
	border: none;
}
.category-title > span {
	font-weight: 600;
}
.category-title.active {
	background-color: #23202a;
	color: #fff;
	cursor: default;
}
.category-title > div {
	flex: 1;
}
.category-values {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.category-value {
	user-select: none;
	padding: 5px 7px;
	list-style: none;
	font-size: 14px;
	margin-left: 10px;
	margin-right: 15px;
	transition: background-color 0.175s;
	cursor: pointer;
	text-decoration: none;
	color: #424242;
}
.category-value:last-child {
	margin-bottom: 10px;
}
.category-value:hover {
	background-color: #f5f5f5;
}
.category-value:active {
	background-color: #d5d5d5;
}
.category-link.active {
	background-color: #23202a;
	color: white;
}
.category-link.active > .category-title {
	cursor: default !important;
}
</style>
