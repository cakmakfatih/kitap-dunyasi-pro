<script lang="ts" setup>
import type { Book } from "@/services/external.api.service";

interface Props {
	isLoading?: boolean;
	subject?: string;
	books?: Book[];
}

const props = withDefaults(defineProps<Props>(), {
	isLoading: () => false,
	subject: () => "",
	books: () => [],
});
</script>
<template>
	<section class="book-section">
		<h1 class="section-title">{{ subject }}</h1>
		<div class="section-content">
			<div class="book" v-for="(book, index) in props.books" :key="index">
				<div
					class="book-cover"
					:style="{ backgroundImage: `url('${book.img_url}')` }"
				/>
				<h3 class="book-title">{{ book.title }}</h3>
				<div class="book-info">
					<span><b>İlk Yayın Yılı:</b> {{ book.first_publish_year }}</span>
					<span><b>Baskı No:</b> {{ book.edition_count }}</span>
				</div>
			</div>
		</div>
	</section>
</template>
<style lang="css" scoped>
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
	overflow: hidden; /* Hide the overflowing text */
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
</style>
