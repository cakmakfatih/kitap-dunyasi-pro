<template>
	<RouterView v-slot="{ Component, route }">
		<template v-if="route.path === 'sign-in' || route.path === 'sign-up'">
			<Component :is="Component" />
		</template>
		<template v-else>
			<Transition name="fade" mode="out-in">
				<Component :is="Component" />
			</Transition>
		</template>
	</RouterView>
</template>
