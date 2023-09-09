<script lang="ts">
	import { base } from '$app/paths';
	import { fetchAPI } from '$lib/api';
	import { typeToName, type DiscordInteraction } from '$lib/constants';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { DataHandler, Th, Datatable, ThFilter }  from '@vincjo/datatables'

	// headers for the table
	let headers: string[] = ['Name', 'Type', 'Description'];
	// get basePath since same component can be used to get guild commands
	export let basePath = '';
	export let id = 'global';

	const queryClient = useQueryClient()

	$: queryKey = ['app.commands', id];
	$: refreshing = false;

	$: commandList = createQuery({
		queryKey,
		queryFn: async () => (await fetchAPI(basePath)).data
	});

	$: loading = $commandList.isLoading;
	$: error = $commandList.isError;
	$: fetching = $commandList.isFetching;

	$: data = $commandList.data || [];

	$: handler = new DataHandler(data, { rowsPerPage: 10 })
    $: rows = handler.getRows()

	// delete a interaction
	async function deleteInteraction(interaction: DiscordInteraction) {
		// uses toast for confirmation
		toast.warning(
			`Are you sure you want to delete "${interaction.name}" ${typeToName(interaction.type)} Interaction?`,
			{
				action: {
					label: 'Delete',
					onClick: () => {
						toast.promise(
							fetchAPI(`${basePath}/${interaction.id}`, { method: 'DELETE' }).then(refreshList),
							{
								success: `${typeToName(interaction.type)} (${interaction.name}) successfully deleted`,
								error: 'Error occurred, try again',
								loading: 'Deletion pending...'
							} as any
						);

					}
				}
			}
		);
	}
	
	async function refreshList() {
		if(refreshing) return;
		refreshing = true;
		queryClient.invalidateQueries({ queryKey })
		setTimeout(() => {
			// cooldown
			refreshing = false
		}, 2000);

	}
</script>

<Datatable {handler} class="bg-primary-800 text-white rounded-t-lg rounded-b-lg  min-w-full divide-y divide-primary-600">
<table>
	<thead>
		<tr class="shadow-md shadow-primary-700">
			{#each headers as header (header)}
				<Th
					orderBy={header.toLowerCase()}
					{handler}
					scope="col"
					class="px-6 py-3 text-left text-xs font-bold text-stone-400 uppercase tracking-wider"
					>{header}</Th
				>
			{/each}
			<Th {handler} orderBy="" class="px-6 py-3 flex gap-2 text-xs font-bold text-stone-400 tracking-wider">
				<button
					on:click={() => goto(`${base}/add${id === 'global' ? '' : `?guildId=${id}`}`)}
					class="bg-primary-600 hover:bg-primary-500 rounded-full p-2"
				>
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
					disabled={refreshing}
					class="bg-primary-600 hover:bg-primary-500 rounded-full p-2"
				>
					<svg class="{refreshing && 'animate-spin cursor-not-allowed'} text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
				</button>
			</Th>
		</tr>
		<tr>
			{#each headers as header (header)}
				<ThFilter
					filterBy={header.toLowerCase()}
					{handler}
					scope="col"
					class="px-6 py-3 text-left text-xs font-bold text-stone-400 uppercase tracking-wider"
					>{header}</ThFilter
				>
			{/each}
			<Th {handler} orderBy="" class="px-6 py-3 text-xs font-bold text-stone-400 tracking-wider">
				<!-- EMPTY -->
			</Th>
		</tr>
	</thead>
	<tbody>
		<!-- Status stuff -->
		{#if loading}
			<tr>
				<td colspan={headers.length + 1} class="p-4">
					<img src="{base}/slash.png" alt="loading..." class="animate-spin w-11 h-11 mx-auto" />
				</td>
			</tr>
		{:else if error}
			<tr>
				<td colspan={headers.length + 1} class="p-4">
					<div class="w-max h-11 mx-auto flex flex-col justify-center items-center">
						<p class="font-bold text-lg">(╯°□°）╯︵ ┻━┻</p>
						<span class="text-red-400 font-bold">Oops! Something went wrong.</span>
					</div>
				</td>
			</tr>
		{:else if $rows.length == 0}
			<tr>
				<td colspan={headers.length + 1} class="p-4">
					<div class="w-max h-11 mx-auto flex flex-col justify-center items-center">
						<p class="font-bold text-lg">¯\_(ツ)_/¯</p>
						<span class="text-yellow-200 font-bold">Nothing to display here.</span>
					</div>
				</td>
			</tr>
		{:else}
			<!-- Table content -->
			{#each $rows as row (row.id)}
				<tr>
					<td class="border-b-2 border-primary-400 px-4 py-4 whitespace-nowrap font-bold font-mono">{row.name}</td>
					<td class="border-b-2 border-primary-400 px-4 py-4 whitespace-nowrap font-semibold">{typeToName(row.type)}</td>
					<td class="border-b-2 border-primary-400 px-4 py-4 whitespace-nowrap">{row.description}</td>
					<td class="border-b-2 border-primary-400 px-4 py-4 whitespace-nowrap flex justify-center items-center gap-2">
						<button class="bg-primary-600 hover:bg-primary-500 rounded-full p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-blurple-500 w-6 h-6"
							>
								<path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /><path
									d="m15 5 3 3"
								/>
							</svg>
						</button>
						<button
							on:click={() => deleteInteraction(row)}
							class="bg-primary-600 hover:bg-primary-500 rounded-full p-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-red-600 w-6 h-6"
							>
								<path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
									d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
								/><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		{/if}

		<!-- Table bottom, status bar -->
		<tr class="opacity-75">
			<td colspan={headers.length + 1} class="p-4 bg-primary-700 border-primary-400">
				{#if fetching && !loading}
					<svg class="animate-spin text-yellow-300 h-7 w-7 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
				{:else if !loading && !error}
					<svg class="animate-bounce text-green-300 h-7 w-7 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
				{/if}
			</td>
		</tr>
	</tbody>
</table>
</Datatable>
