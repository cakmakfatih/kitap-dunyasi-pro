<script lang="ts" setup></script>
<template>
	<main><slot></slot></main>
</template>
<style lang="css" scoped>
main {
	flex: 1;
	align-self: stretch;
	background-color: #fff;
	display: flex;
	flex-direction: column;
}
</style>
