<script lang="ts" setup></script>
<template>
	<div class="split-layout">
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>
<style lang="css" scoped>
.split-layout {
	display: flex;
	flex: 1;
	align-items: stretch;
}
.left,
.right {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.left {
	flex: 2;
	background-size: cover;
	background-color: var(--color-primary);
	color: #fff;
}
.right {
	flex: 1;
}
</style>
