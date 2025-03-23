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
const rotateVal = computed(() => (hasValues ? 90 : 0));
const iconName = computed<IconName>(() =>
	hasValues ? "chevron-right" : "home"
);
</script>
<template>
	<li class="category-link">
		<div class="category-title" v-click-rotate-inner-icon="rotateVal">
			<Icon :iconName="iconName" />
			<span>{{ props.category.name }}</span>
		</div>
	</li>
</template>
<style lang="css" scoped>
.category-title {
	border-bottom: 1px solid #d9d9d9;
	user-select: none;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	transition: background-color 0.175s;
	cursor: pointer;
}
.category-title > span {
	margin-left: 10px;
}
.category-title:not(.active):hover {
	background-color: #eee;
}
.category-title:not(.active):active {
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
</style>
