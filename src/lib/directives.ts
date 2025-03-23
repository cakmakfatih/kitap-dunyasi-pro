import { type Directive } from "vue";

const rotate = (rotateNum: number, el: HTMLElement) => {
	const isRotated = JSON.parse(el.getAttribute("is-rotated") ?? "false");
	if (isRotated) {
		rotateNum = 0;
	}

	el.style.transform = "rotate(" + rotateNum + "deg)";
	el.setAttribute("is-rotated", JSON.stringify(!isRotated));
};

export const vClickRotateInnerIcon: Directive<HTMLElement, number> = {
	mounted(el, binding) {
		if (binding.value === 0) {
			return;
		}

		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		svgEl.setAttribute("is-rotated", JSON.stringify(false));
		svgEl.classList.add("v-rotator");

		el.addEventListener("click", () => rotate(binding.value, svgEl));
	},
	beforeUnmount(el, binding) {
		if (binding.value === 0) {
			return;
		}

		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		el.removeEventListener("click", () => rotate(binding.value, svgEl));
	},
};
