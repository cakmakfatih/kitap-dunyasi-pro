import { type Directive } from "vue";

const disallowBubbling = (e: Event) => {
	e.stopPropagation();
};

const rotate = (
	rotateNum: number,
	el: HTMLElement,
	direct: boolean = false,
	isFromClick: boolean = false
) => {
	const rotatedEls = Array.from(
		document.querySelectorAll("[is-rotated='true']")
	).filter((element) => element !== el);
	if (isFromClick) {
		rotatedEls.forEach((rotatedEl) =>
			rotate(rotateNum, rotatedEl as HTMLElement, false, false)
		);
	}
	let isRotated = JSON.parse(el.getAttribute("is-rotated") ?? "false");
	if (direct) {
		isRotated = false;
	}
	if (isRotated) {
		rotateNum = 0;
	}

	el.style.transform = "rotate(" + rotateNum + "deg)";
	if (!direct) {
		el.setAttribute("is-rotated", JSON.stringify(!isRotated));
	}
};

const expand = (
	el: HTMLElement,
	isDirect: boolean = false,
	isFromClick: boolean = false
) => {
	const expandedEls = Array.from(
		document.querySelectorAll("[is-expanded='true']")
	).filter((element) => element !== el);
	if (isFromClick) {
		expandedEls.forEach((expandedEl) =>
			expand(expandedEl as HTMLElement, false, true)
		);
	}

	let isExpanded = JSON.parse(el.getAttribute("is-expanded") || "false");
	if (isDirect) {
		isExpanded = false;
	}

	if (!isExpanded) {
		const childrenElements = Array.from(el.children);
		let totalHeight = childrenElements.reduce((total, child) => {
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
		const isRotated = JSON.parse(el.getAttribute("is-rotated") ?? "false");
		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		svgEl.classList.add("v-rotator");
		svgEl.setAttribute("is-rotated", JSON.stringify(isRotated));

		if (isRotated) {
			rotate(binding.value, svgEl, false, true);
		}

		el.addEventListener("click", () =>
			rotate(binding.value, svgEl, false, true)
		);
	},
	beforeUnmount(el, binding) {
		if (binding.value === 0) {
			return;
		}

		const svgEl = el.querySelector("svg")! as unknown as HTMLElement;
		el.removeEventListener("click", () => rotate(binding.value, svgEl));
	},
};

export const vExpandable: Directive<HTMLElement, void> = {
	mounted(el) {
		const expandable = el.querySelector("[expandable]") as HTMLElement;
		const isExpandedNow = JSON.parse(
			expandable.getAttribute("is-expanded") ?? "false"
		);

		expandable.setAttribute("is-expanded", JSON.stringify(isExpandedNow));
		if (isExpandedNow) {
			expand(expandable, true, false);
		} else {
			expandable.style.maxHeight = "0px";
		}

		el.addEventListener("click", () => expand(expandable, false, true));
		expandable.addEventListener("click", (e) => disallowBubbling(e));
		expandable.classList.add("expandable");
	},
	beforeUnmount(el) {
		const expandable = el.querySelector("[is-expanded]") as HTMLElement;
		expandable.classList.add("expandable");
		expandable.removeEventListener("click", (e) => disallowBubbling(e));
		el.removeEventListener("click", () => expand(expandable));
	},
};
