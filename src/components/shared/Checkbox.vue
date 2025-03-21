<script lang="ts" setup>
import { useId, defineComponent } from "vue";

interface Props {
	modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
	modelValue: () => false,
});

const inpId = useId();
const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	emit("update:modelValue", input.checked);
};
</script>
<template>
	<div>
		<input
			@input="onInput"
			:id="inpId"
			:checked="modelValue"
			type="checkbox"
			style="align-self: flex-start"
		/>
		<label :for="inpId"><slot></slot></label>
	</div>
</template>
<style lang="css" scoped>
div {
	display: flex;
	margin: 0px 10px;
	align-self: flex-start;
	justify-content: flex-start;
	align-items: center;
	align-self: stretch;
}

input {
	width: 25px;
	height: 25px;
	margin-right: 5px;
}

label {
	flex: 1;
	user-select: none;
}
</style>
<script lang="ts">
export default defineComponent({
	inheritAttrs: false,
});
</script>
