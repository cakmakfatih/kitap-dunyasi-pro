import { defineStore } from "pinia";
import type { HomeActions, HomeGetters, HomeState } from "./home.interface";

export const useHomeStore = defineStore<"home", HomeState, HomeGetters, HomeActions>("home", {
    state: () => ({

    })
});