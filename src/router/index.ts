import { useApiService } from "@/services/api.service";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/LoginView.vue"),
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: () => import("@/views/SignUpView.vue"),
		},
		{
			path: "/",
			name: "home",
			component: () => import("@/views/LoginView.vue"),
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const { isAuthenticated } = useApiService();

	if (to.meta.requiresAuth) {
		const auth = await isAuthenticated();
		if (auth) {
			next();
		} else {
			next({ name: "sign-up", replace: true });
		}
	} else {
		next();
	}
});

export default router;
