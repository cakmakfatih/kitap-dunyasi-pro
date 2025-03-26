<script lang="ts" setup>
import type { Book } from "@/services/external.api.service";
import type { SubjectState } from "@/stores/book/book.interface";

// const asideRef = inject<Readonly<ShallowRef>>("aside");
// const asideRect =
// 	(asideRef?.value.$el as HTMLElement).getBoundingClientRect() ?? 0;

interface Props {
	state?: SubjectState | undefined;
	books?: Book[];
}

const props = withDefaults(defineProps<Props>(), {
	books: () => [],
});
</script>
<template>
	<section class="book-section">
		<header class="section-header">
			<h1 class="section-title">{{ state?.title }}</h1>
			<h3 v-if="state?.totalNum !== 0" class="book-count"
				>{{ state?.totalNum }} Kitap</h3
			>
		</header>
		<div class="section-content">
			<div
				v-if="state?.isFetching === false"
				class="book"
				v-for="(book, index) in props.books"
				:key="index"
				:title="book.title"
			>
				<div
					class="book-cover"
					:style="{ backgroundImage: `url('${book.img_url}')` }"
				/>
				<h3 class="book-title">{{ book.title }}</h3>
				<div class="book-info">
					<span :title="book.author_name.join(', ')"
						><b>Yazar:</b> {{ book.author_name.join(", ") }}</span
					>
					<span><b>İlk Yayın Yılı:</b> {{ book.first_publish_year }}</span>
					<span><b>Baskı No:</b> {{ book.edition_count }}</span>
				</div>
			</div>
			<template v-else>
				<div class="skeleton-loader" v-for="index in 15" :key="index">
					<div class="skeleton-image"></div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
				</div>
			</template>
		</div>
	</section>
</template>
<style lang="css" scoped>
.section-header {
	display: flex;
	align-items: center;
}
.book-count {
	font-weight: 500;
	margin-left: 15px;
}
.book-section {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 20px 15px;
	border-bottom: 1px solid #d9d9d9;
}
.section-title {
	font-size: 27pt;
	margin-left: 20px;
	font-weight: 500;
}
.section-content {
	margin-top: 15px;
	display: flex;
}
.book-cover {
	min-width: 180px;
	max-width: 180px;
	background-size: cover;
	height: 245px;
	border: 1px solid #424242;
}

.book {
	max-width: 210px;
	width: 210px;
	display: flex;
	flex-direction: column;
	padding: 15px;
	margin: 0px 7.5px;
	background-color: #fff;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	border: 2px solid transparent;
	cursor: pointer;
	transition: border-color 0.175s;
}
.book:hover {
	border-color: #303030;
}
.book-title {
	padding: 0px 5px;
	margin-top: 5px;
	font-weight: 500;
	white-space: nowrap;
	max-width: 160px;
	overflow: hidden;
	text-overflow: ellipsis;
}

span {
	white-space: nowrap;
	max-width: 160px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.book-info {
	display: flex;
	flex-direction: column;
}
.book-info > span {
	font-size: 11pt;
	padding: 0px 5px;
}
.book-info > span > b {
	font-weight: 500;
}

.skeleton-loader {
	max-width: 210px;
	width: 210px;
	display: flex;
	flex-direction: column;
	padding: 15px;
	margin: 0px 7.5px;
	background-color: #fff;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	border: 2px solid transparent;
	transition: border-color 0.175s;
	min-width: 210px;
}

.skeleton-text {
	height: 10px;
	margin: 3px 0px;
	background-color: #e0e0e0;
	border-radius: 4px;
	animation: shimmer 4s infinite linear;
}

/* Skeleton image */
.skeleton-image {
	min-width: 180px;
	max-width: 180px;
	height: 245px;
	background-color: #e0e0e0;
	border-radius: 8px;
	margin: 0px;
	margin-bottom: 5px;
	animation: shimmer 4s infinite linear;
}

/* Shimmer effect animation */
@keyframes shimmer {
	0% {
		background-position: -1000px 0;
	}
	100% {
		background-position: 1000px 0;
	}
}

.skeleton-text,
.skeleton-image {
	background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
	background-size: 200% 100%;
}
</style>
