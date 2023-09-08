<script lang="ts">
	import { applicationInfo } from '$lib/localStore';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import CommandList from '$components/commandList.svelte';
	import { discordIdRegex } from '$lib/constants';
	import { goto } from '$app/navigation';

	const appInfo = get(applicationInfo);

	$: guildId = $page.url.searchParams.get('guildId') || '';
	$: basePath =
		guildId && discordIdRegex.test(guildId)
			? `/applications/${appInfo.id}/guilds/${guildId}/commands`
			: `applications/${appInfo.id}/commands`;

	let guildInput = '';

	function viewGuildCommands() {
		if (!discordIdRegex.test(guildInput)) return alert(`Invalid guild id`);
        guildId = guildInput
		goto(`?guildId=${guildInput}`);
	}
</script>

<div class="m-5 flex flex-col gap-2">
	<span>
		<h1 class="font-bold font-mono text-3xl text-pink-300">
			Logged in for {$applicationInfo.username}#{$applicationInfo.discriminator}
		</h1>
		<p class="text-sm font-medium text-primary-100">
			{guildId && discordIdRegex.test(guildId) ? `In guild view for guild ${guildId}` : 'In global view'}
		</p>
	</span>
	<CommandList bind:id={guildId} {basePath} />
	<div class="bg-blurple-900 flex flex-col p-2 rounded-lg gap-2">
		{#if guildId && discordIdRegex.test(guildId)}
			<h1>View Global List</h1>
            <p>
                You are currently viewing the list for specific guild with id "{guildId}"
                Click the below button to view the global list
            </p>
			<a href="/dashboard" class="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg"
				>View global commands</a
			>
		{:else}
			<h1>View Guild commands</h1>
            <p>
                You are currently viewing the global list.
                Enter a guild id (you bot must be invited to it)
                and click the button to manage guild specific interactions
            </p>
			<input
				bind:value={guildInput}
				class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
			/>
			<button
				on:click={viewGuildCommands}
				disabled={guildInput === ''}
				class="{guildInput === ''
					? 'bg-primary-600 cursor-not-allowed'
					: 'bg-emerald-500 hover:bg-emerald-600'} p-2 rounded-lg">View guild commands</button
			>
		{/if}
	</div>
</div>
