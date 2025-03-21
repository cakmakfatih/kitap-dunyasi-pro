import { useApiService } from "@/services/api.service";
import { useAuthStore } from "@/stores/auth.store";
import { createRouter, createWebHistory } from "vue-router";
import RedirectIfAuth from "@/components/route-guards/RedirectIfAuth.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/sign-in",
			name: "sign-in",
			component: RedirectIfAuth,
			children: [
				{
					name: "sign-in-child",
					path: "",
					component: () => import("@/views/LoginView.vue"),
				},
			],
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: RedirectIfAuth,
			children: [
				{
					name: "sign-up-child",
					path: "",
					component: () => import("@/views/SignUpView.vue"),
				},
			],
		},
		{
			path: "/",
			name: "home",
			component: () => import("@/views/HomeView.vue"),
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const api = useApiService();
	const { accessToken, setUser } = useAuthStore();

	if (to.meta.requiresAuth) {
		const { user, isLoggedIn } = await api.getSession(accessToken);
		setUser(user, isLoggedIn);

		if (isLoggedIn) {
			next();
		} else {
			next({ name: "sign-up", replace: true });
		}
	} else {
		next();
	}
});

export default router;
