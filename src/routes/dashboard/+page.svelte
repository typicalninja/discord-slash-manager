<script lang="ts">
	import { applicationInfo } from '$lib/localStore';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import CommandList from '$components/commandList.svelte';
	import { discordIdRegex } from '$lib/constants';
	import { goto } from '$app/navigation';
	import {browser} from "$app/environment";
	import { base } from '$app/paths';
	import { toast } from 'svelte-sonner';

	const appInfo = get(applicationInfo);
	$: searchParams = browser && $page.url.searchParams

	$: guildId = searchParams && searchParams.get('guildId') || "global";
	$: basePath =
		guildId && discordIdRegex.test(guildId)
			? `/applications/${appInfo.id}/guilds/${guildId}/commands`
			: `applications/${appInfo.id}/commands`;

	let guildInput = '';

	function viewGuildCommands() {
		if (!discordIdRegex.test(guildInput)) return toast.error(`The guild id is invalid, try again`)
		toast.info(`Viewing guild "${guildInput}"`)
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
	<div class="bg-primary-900 flex flex-col p-2 rounded-lg gap-2">
		{#if guildId && discordIdRegex.test(guildId)}
			<h1>View Global List</h1>
            <p>
                You are currently viewing the list for specific guild with id "{guildId}"
                Click the below button to view the global list
            </p>
			<a href="{base}/dashboard" class="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg"
				>View global commands</a
			>
		{:else}
			<h1>View Guild commands</h1>
            <p>
                You are currently viewing the global list.
                Enter a guild id (your bot must be invited to it)
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
					: 'bg-blurple-500 hover:bg-blurple-600'} p-2 rounded-lg">View Guild Interaction</button
			>
		{/if}
	</div>
</div>
