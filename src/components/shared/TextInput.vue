<script lang="ts" setup>
import { computed, defineComponent, ref, useId } from "vue";

interface Props {
	label: string;
	modelValue: string;
}
const props = defineProps<Props>();

const inputId = useId();
const isFocused = ref<boolean>(false);

const onFocus = () => {
	isFocused.value = true;
};
const onBlur = () => {
	isFocused.value = false;
};
const emit = defineEmits(["update:modelValue"]);

const isFilledOrFocused = computed<boolean>(
	() => isFocused.value || props.modelValue.length > 0
);

const onInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	emit("update:modelValue", input.value);
};
</script>
<template>
	<div class="wrapper">
		<label
			:for="inputId"
			:class="[
				{
					focused: isFilledOrFocused,
				},
			]"
			>{{ label }}</label
		>
		<input
			@focus="onFocus"
			@blur="onBlur"
			@input="onInput"
			:id="inputId"
			v-bind="$attrs"
		/>
	</div>
</template>
<style lang="css" scoped>
.wrapper {
	padding: 10px 2px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	color: #424242;
}
label {
	font-weight: 400;
	padding: 4px;
	position: absolute;
	font-size: 15pt;
	transition: all 0.175s;
	cursor: text;
}
label.focused {
	transform: translateY(-20px);
	font-size: 11pt;
}
input {
	padding: 10px 4px;
	font-size: 15pt;
	border: none;
	border-bottom: 1px solid #909090;
	outline: none;
	color: #424242;
}
</style>
<script lang="ts">
export default defineComponent({
	inheritAttrs: false,
});
</script>
