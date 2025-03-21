<script lang="ts" setup>
interface Props {
	isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	isLoading: false,
});
</script>
<template>
	<button v-bind="$attrs">
		<span v-if="props.isLoading" class="loader"></span>
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
	display: flex;
	align-items: center;
	justify-content: center;
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
.loader {
	width: 24px;
	height: 24px;
	border: 5px solid #fff;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	margin-right: 10px;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
