<script lang="ts" setup></script>
<template>
	<main><slot></slot></main>
</template>
<style lang="css" scoped>
main {
	align-self: stretch;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>
