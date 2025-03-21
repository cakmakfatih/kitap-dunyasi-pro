<script lang="ts" setup>
interface Props {
	fontSizePt?: number;
}

const props = withDefaults(defineProps<Props>(), {
	fontSizePt: 24,
});

const logoFontSize = props.fontSizePt.toString() + "pt";
const supFontSize = (props.fontSizePt / 2).toString() + "pt";
</script>
<template>
	<h1 class="logo" :style="{ fontSize: logoFontSize }">
		<span>kitap</span>
		<span>dunyasi</span>
		<sup :style="{ fontSize: supFontSize }">pro</sup>
	</h1>
</template>
<style lang="css" scoped>
.logo {
	font-size: 24pt;
}

sup {
	font-weight: 500;
	color: var(--color-primary);
}

.logo > span:first-child {
	font-weight: 600;
	color: var(--color-primary);
}

.logo > span:nth-child(2) {
	font-weight: 300;
}
</style>
