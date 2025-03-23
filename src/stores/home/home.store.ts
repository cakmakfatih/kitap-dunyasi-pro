import { defineStore } from "pinia";
import type { HomeStore } from "./home.interface";

export const useHomeStore = defineStore<"home", HomeStore>("home", () => {
	return {};
});
