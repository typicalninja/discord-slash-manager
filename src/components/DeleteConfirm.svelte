<script lang="ts">
	import { fetchAPI } from '$lib/api';
	import { typeToName, type DiscordInteraction } from '$lib/constants';
	import { useQueryClient } from '@tanstack/svelte-query';
	import toast_, { type Toast } from 'svelte-french-toast';

	export let toast: Toast;
	const queryClient = useQueryClient();
	// @ts-ignore svelte-french-toast does not include props in latest version
	const props: { cmd: DiscordInteraction; basePath: string; queryKey: string[] } = toast.props;

	async function proceed() {
		toast_.dismiss(toast.id)
		try {
			await toast_.promise(fetchAPI(`${props.basePath}/${props.cmd.id}`, { method: 'DELETE' }), {
				success: `${typeToName(props.cmd.type)} successfully deleted`,
				error: 'Error occurred, try again',
				loading: 'Deletion pending...'
			});
			console.log('success');
			queryClient.invalidateQueries({ queryKey: props.queryKey });
		} catch (err) {
			console.log(`Error while deleting [FORWARDED]`);
			console.error(err);
		}
	}
</script>

<span>
	Are you sure you want to, Delete "{props.cmd.name}" {typeToName(props.cmd.type)} Interaction?

	<div class="flex gap-1 mt-1">
		<button
			class="p-2 rounded-lg bg-blurple-200 hover:bg-blurple-300"
			on:click={() => toast_.dismiss(toast.id)}
		>
			Never mind
		</button>
		<button class="p-2 rounded-lg bg-red-200 hover:bg-red-300" on:click={proceed}>
			Proceed with deletion
		</button>
	</div>
</span>
