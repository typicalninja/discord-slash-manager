<script lang="ts">
	import { fetchAPI } from '$lib/api';
	import { typeToName, type DiscordInteraction } from '$lib/constants';
  import { fetchCommands } from '$lib/user';
  import { createQuery } from '@tanstack/svelte-query'
  // headers for the table
	let headers: string[] = ['Name', 'Type', 'Description'];
  // get basePath since same component can be used to get guild commands
  export let basePath = '';
  export let id = 'global';


  $: commandList = createQuery({
        queryKey: ['app.commands', id],
        queryFn: async () => (await fetchAPI(basePath)).data,
  });

  $: loading = $commandList.isLoading;
	$: error = $commandList.isError;
	$: fetching = $commandList.isFetching;

  $: rows = $commandList.data || []


  async function deleteCommand(cmd: DiscordInteraction) {
    if(confirm(`Do you want to delete command "${cmd.name}"?"`)) {
      try {
        await fetchAPI(`${basePath}/${cmd.id}`, { method: 'DELETE'});

      }
      catch(err) {
        alert(`Error deleting command "${cmd.name}" [${err}]`);
        console.log(`#DeleteCommandError`, err)
      }
    }
  }

</script>

<table class="bg-primary-400 rounded-t-lg min-w-full divide-y divide-primary-600">
	<thead>
		<tr class="shadow-md shadow-primary-700">
			{#each headers as header (header)}
				<th
					scope="col"
					class="px-6 py-3 text-left text-xs font-bold text-stone-400 uppercase tracking-wider"
					>{header}</th
				>
			{/each}
			<th
				scope="col"
				class="px-6 py-3 text-left text-xs font-bold text-stone-400 uppercase tracking-wider"
			>
				<button class="bg-primary-600 hover:bg-primary-500 rounded-full p-2">
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
			</th>
		</tr>
	</thead>
	<tbody class="rounded-b-lg divide-y divide-primary-100">
		<!-- Status stuff -->
		{#if loading}
			<tr>
				<td colspan={headers.length} class="p-4">
					<img src="/slash.png" alt="loading..." class="animate-spin w-11 h-11 mx-auto" />
				</td>
			</tr>
		{:else if error}
			<tr>
				<td colspan={headers.length} class="p-4">
					<div class="w-max h-11 text-center mx-auto">
						<p>(╯°□°）╯︵ ┻━┻</p>
						<span class="text-red-400 font-bold">Oops! Something went wrong.</span>
					</div>
				</td>
			</tr>
		{:else}
			<!-- Table content -->
			{#each rows as row (row.id)}
				<tr>
					<td class="px-4 py-4 whitespace-nowrap font-bold font-mono">{row.name}</td>
					<td class="px-4 py-4 whitespace-nowrap font-semibold">{typeToName(row.type)}</td>
					<td class="px-4 py-4 whitespace-nowrap">{row.description}</td>
					<td class="px-4 py-4 whitespace-nowrap flex justify-center items-center gap-2">
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
						<button class="bg-primary-600 hover:bg-primary-500 rounded-full p-2">
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
			<td colspan={headers.length} class="p-2">
				{#if fetching && !loading}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-yellow-500 h-7 w-7 mx-auto animate-spin"
						><path d="M5 22h14" /><path d="M5 2h14" /><path
							d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"
						/><path
							d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
						/></svg
					>
				{:else if !loading}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-green-500 h-7 w-7 mx-auto"
						><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline
							points="22 4 12 14.01 9 11.01"
						/></svg
					>
				{/if}
			</td>
		</tr>
	</tbody>
</table>
