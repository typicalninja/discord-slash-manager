<script lang="ts">
	import { base } from '$app/paths';
	import { fetchAPI } from '$lib/api';
	import { typeToName, type DiscordInteraction } from '$lib/constants';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	// custom icons
	import RefreshCw from './icons/RefreshCW.svelte';
	import Check from './icons/Check.svelte';
	import Trash from './icons/Trash.svelte';
	import Pen from './icons/Pen.svelte';
	import { browser } from '$app/environment';

	import { fade } from 'svelte/transition';
	import { sineIn } from 'svelte/easing'

	// get basePath since same component can be used to get guild commands
	export let basePath = '';
	export let id = 'global';

	const queryClient = useQueryClient();

	$: queryKey = ['app.commands', id];
	$: refreshing = false;

	$: commandList = createQuery({
		queryKey,
		queryFn: async () => (await fetchAPI(basePath)).data,
		// disable automatic fetching in when not in browser (messes up dev and static builds)
		enabled: browser,
		onError: (err) => {
			toast.error(`Error occurred while fetching commands, ${err}`)
		}
	});


	$: data = ($commandList.data || []) as DiscordInteraction[];
	$: deletionConfirmPending = [] as string[]

	/** Functions */
	const addLink = () => goto(`${base}/editor${id === 'global' ? '' : `?guildId=${id}`}`)

	// delete a interaction
	async function deleteInteraction(interaction: DiscordInteraction) {
		if(deletionConfirmPending.includes(interaction.id)) return toast.error(`Previous deletion confirmation is active.`)
		deletionConfirmPending = deletionConfirmPending.concat([interaction.id])
		
		const removeFromPending = () => { deletionConfirmPending = deletionConfirmPending.filter((id) => id !== interaction.id) }
		// uses toast for confirmation
		toast.warning(
			`Are you sure you want to delete "${interaction.name}" ${typeToName(
				interaction.type
			)} Interaction?`,
			{
				action: {
					label: 'Delete',
					onClick: () => {
						toast.promise(
							fetchAPI(`${basePath}/${interaction.id}`, { method: 'DELETE' }).then(() => { refreshList(); removeFromPending();}),
							{
								success: `${typeToName(interaction.type)} (${
									interaction.name
								}) successfully deleted`,
								error: 'Error occurred, try again',
								loading: 'Deletion pending...'
							} as any
						);
					}
				},
				onAutoClose: removeFromPending,
				onDismiss: removeFromPending,
				duration: 20000
			}
		);
	}

	async function refreshList() {
		refreshing = true;
		await queryClient.invalidateQueries({ queryKey });
		refreshing = false;
	}
</script>
	
<style>
	@keyframes shake {
    0% { transform: rotate(0deg);  }
    10% { transform: rotate(-1deg);  }
    25% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
    75% { transform: rotate(0deg); }
    90%, 100% { transform: rotate(0deg); }
}

.animate-shake {
  animation: shake 1s ease-in-out infinite; /* Adjust duration as needed */
}
</style>

<div class="flex flex-col gap-2">
	<!-- control panel -->
	<div class="bg-primary-800 w-full rounded-md flex items-center justify-between h-12 gap-1">
		<!-- current counts -->
		<span class="flex items-center flex-shrink-0 ml-2">{data.length} Interaction</span>
		<div>
			<!-- Status -->
			{#if $commandList.isLoading}
				<img src="{base}/slash.png" alt="loading..." class="animate-spin w-5 h-5 mx-auto" />
			{:else if $commandList.isFetching}
				<RefreshCw class="animate-spin text-yellow-300" />
			{:else if $commandList.isError}
				<p class="font-bold text-red-300">(╯°□°）╯︵ ┻━┻ | Error!!</p>
			{:else}
				<Check class="text-green-300" />
			{/if}
		</div>
		<div class="flex">
			<!-- control Buttons -->
			<button class="bg-primary-800 h-10 hover:bg-primary-700 px-2" on:click={addLink}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-green-500"><path d="M5 12h14" /><path d="M12 5v14" /></svg
				>
			</button>
			<button
				on:click={refreshList}
				disabled={refreshing || $commandList.isLoading}
				class="bg-primary-800 h-10 hover:bg-primary-700 px-2"
			>
				<RefreshCw class="{refreshing && 'animate-spin cursor-not-allowed'} text-yellow-300" />
			</button>
		</div>
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-4 my-3 gap-2">
		<!-- control Buttons -->
		<a href={`${base}/editor${id === 'global' ? '' : `?guildId=${id}`}`} class="bg-blurple-500 shadow-primary-900 shadow-lg hover:scale-105 p-5 m-1 rounded-lg">
			<h1 class="text-lg font-bold">Create a new interaction</h1>
			<p class="text-sm font-semibold text-primary-100">Click here to create a new {id === 'global' ? '' : `guild (${id})`} interaction!</p>
		</a>
		{#if $commandList.isLoading}
			{#each Array.from({ length: 3 }, (_, index) => index) as cardId (cardId)}
				<div in:fade={{ duration: 1000, delay: 500 }} out:fade={{ duration: 500 }} class="relative bg-primary-700  m-1 p-5 rounded-lg">
					<div class="flex flex-col gap-2 animate-pulse">
						<div class="h-2 w-20 mt-4 bg-slate-700 rounded"></div>
						<div class="h-2 w-24 bg-slate-700 rounded"></div>
						<div class="h-2 w-36 bg-slate-700 rounded"></div>
					</div>
					<div class="absolute top-1 right-1 p-1 border-l border-b border-primary-600 hover:bg-primary-800">
						<Trash class="animate-pulse opacity-80" />
					</div>
					<div class="absolute bottom-1 right-1 p-1 border-l border-t border-primary-600 hover:bg-primary-800">
						<Pen class="animate-pulse opacity-80" />
					</div>
				</div>
			{/each}
		{:else}
			{#each data as interaction (interaction.id)}
				<div in:fade={{ duration: 1000, delay: 700, easing: sineIn }} out:fade={{ duration: 500 }} class="relative {deletionConfirmPending.includes(interaction.id) && 'bg-red-800 hover:bg-red-900 animate-shake'} bg-primary-700 shadow-primary-900 shadow-lg m-1 p-5 rounded-lg hover:bg-primary-800">
					<h1 class="text-lg font-bold">{interaction.name}</h1>
					<span class="text-sm font-semibold text-primary-200">{typeToName(interaction.type)}</span>
					<p class="text-sm text-primary-200">{interaction.description}</p>
					{#if !deletionConfirmPending.includes(interaction.id)}
						<button on:click={() => deleteInteraction(interaction)} class="absolute top-1 right-1 p-1 border-l border-b border-primary-600 hover:bg-primary-700">
							<Trash class="text-red-300" />
						</button>
						<a href="{base}/editor?commandId={interaction.id}{id === 'global' ? '' : `&guildId=${id}`}" class="absolute bottom-1 right-1 p-1 border-l border-t border-primary-600 hover:bg-primary-700">
							<Pen class="text-blurple-300" />
						</a>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>
