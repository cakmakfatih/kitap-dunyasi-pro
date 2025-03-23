import { type Directive } from "vue";

const disallowBubbling = (e: Event) => {
	e.stopPropagation();
};

const rotate = (e: Event, rotateNum: number, el: HTMLElement) => {
	e.preventDefault();
	const isRotated = JSON.parse(el.getAttribute("is-rotated") ?? "false");
	if (isRotated) {
		rotateNum = 0;
	}

	el.style.transform = "rotate(" + rotateNum + "deg)";
	el.setAttribute("is-rotated", JSON.stringify(!isRotated));
};

const expand = (e: Event, el: HTMLElement) => {
	e.preventDefault();
	const isExpanded = JSON.parse(el.getAttribute("is-expanded") || "false");

	if (!isExpanded) {
		const childrenElements = Array.from(el.children);
		const totalHeight = childrenElements.reduce((total, child) => {
			const rect = child.getBoundingClientRect();
			return total + rect.height;
		  }, 0);
		el.style.maxHeight = totalHeight + "px";
		el.classList.add("expanded");
	} else {
		el.style.maxHeight = "0px";
		el.classList.remove("expanded");
	}

	el.setAttribute("is-expanded", JSON.stringify(!isExpanded));
};

export const vClickRotateInnerIcon: Directive<HTMLElement, number> = {
	mounted(el, binding) {
		if (binding.value === 0) {
			return;
		}

		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		svgEl.setAttribute("is-rotated", JSON.stringify(false));
		svgEl.classList.add("v-rotator");

		el.addEventListener("click", (e) => rotate(e, binding.value, svgEl));
	},
	beforeUnmount(el, binding) {
		if (binding.value === 0) {
			return;
		}

		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		el.removeEventListener("click", (e) => rotate(e, binding.value, svgEl));
	},
};

export const vExpandable: Directive<HTMLElement, void> = {
	mounted(el) {
		const expandable = el.querySelector("[is-expanded]") as HTMLElement;
		el.addEventListener("click", (e) => expand(e, expandable));
		expandable.style.maxHeight = "0px";
		expandable.addEventListener("click", (e) => disallowBubbling(e));
		expandable.classList.add("expandable");
	},
	beforeUnmount(el) {
		const expandable = el.querySelector("[is-expanded]") as HTMLElement;
		expandable.classList.add("expandable");
		expandable.removeEventListener("click", (e) => disallowBubbling(e));
		el.removeEventListener("click", (e) => expand(e, expandable));
	},
};
