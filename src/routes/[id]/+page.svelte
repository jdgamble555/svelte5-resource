<script lang="ts">
	import { page } from '$app/state';
	import { resource } from '$lib/resource.svelte';

	type Todo = {
		id: string;
		title: string;
		completed: boolean;
	};

	const id = $derived(page.params.id);

	const idNumber = $derived(Number(id));

	const todo = resource<Todo>(() => `https://jsonplaceholder.typicode.com/todos/${id}`);

	const prevId = $derived(Math.max(idNumber - 1, 1));
	const nextId = $derived(idNumber + 1);
</script>

<div class="flex flex-col items-center gap-3">
	<h1>{todo.value?.title}</h1>

	<div class="flex items-center gap-3">
		<a class="rounded-lg border p-2" href={prevId.toString()}>Prev</a>
		<a class="rounded-lg border p-2" href={nextId.toString()}>Next</a>
	</div>
</div>
