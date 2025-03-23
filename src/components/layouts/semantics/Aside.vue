<script lang="ts" setup>
import {
	OPEN_LIBRARY_CATEGORIES,
	type OpenLibraryCategory,
} from "@/lib/constants";

interface Props {
	categories?: OpenLibraryCategory[];
}

const props = withDefaults(defineProps<Props>(), {
	categories: () => Object.assign([], OPEN_LIBRARY_CATEGORIES),
});
</script>
<template>
	<aside>
		<nav>
			<ul>
				<li class="category-link active">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						width="26px"
						height="26px"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>

					<span>Genel</span>
				</li>
				<li
					v-click-rotate-inner-icon="90"
					class="category-link"
					v-for="(item, index) in props.categories"
					:key="index"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						width="26"
						height="26"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
						/>
					</svg>
					<span>{{ item.category }}</span>
					<div></div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						width="26"
						height="26"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m8.25 4.5 7.5 7.5-7.5 7.5"
						/>
					</svg>
				</li>
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
}
nav {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: stretch;
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
.category-link {
	border-bottom: 1px solid #d9d9d9;
	user-select: none;
	padding: 10px 20px;
	display: flex;
	align-items: center;
	transition: background-color 0.175s;
	cursor: pointer;
}
.category-link > span {
	margin-left: 10px;
}
.category-link:not(.active):hover {
	background-color: #eee;
}
.category-link:not(.active):active {
	background-color: #ddd;
}
.category-link:last-child {
	border: none;
}
.category-link > span {
	font-weight: 600;
}
.category-link.active {
	background-color: #23202a;
	color: #fff;
	cursor: default;
}
.category-link > div {
	flex: 1;
}
</style>
