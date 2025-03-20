<script lang="ts" setup></script>
<template>
	<button v-bind="$attrs">
		<slot></slot>
	</button>
</template>
<style lang="css" scoped>
button {
	margin-top: 25px;
	min-height: 50px;
	font-size: 14pt;
	border-radius: 5px;
	color: white;
	font-weight: normal;
	letter-spacing: 0.05em;
	background-color: var(--color-primary);
	border: none;
	transition: all 0.15s;
}
button:hover {
	opacity: 0.6;
	cursor: pointer;
}
button:active {
	opacity: 0.2;
}
button:disabled {
	opacity: 0.3;
	cursor: not-allowed;
}
</style>
