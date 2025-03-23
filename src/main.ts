import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import storage from "./lib/storage";
import { vClickRotateInnerIcon, vExpandable } from "./lib/directives";

const pinia = createPinia();

pinia.use(
	createPersistedState({
		storage: {
			getItem: (key: string) => storage.get(key),
			setItem: (key, value) => storage.set(key, value),
		},
	})
);

const app = createApp(App);

app.directive("click-rotate-inner-icon", vClickRotateInnerIcon);
app.directive("expandable", vExpandable);

app.use(pinia);
app.use(router);

app.mount("#app");
