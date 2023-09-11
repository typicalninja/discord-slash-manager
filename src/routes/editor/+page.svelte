<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Back from '$components/icons/Back.svelte';
	import { fetchAPI } from '$lib/api';
	import { discordIdRegex, typeToName, type DiscordInteraction } from '$lib/constants';
	import { applicationInfo } from '$lib/localStore';
	import { createQuery } from '@tanstack/svelte-query';
	import { createForm } from 'felte';
	import { toast } from 'svelte-sonner';
	import { get } from 'svelte/store';

	// creates a dummy searchParams if not in browser
	$: searchParams = browser ? $page.url.searchParams : new URLSearchParams();
	const appInfo = get(applicationInfo);

	// guildId if editor is to be loaded to a guild context
	$: id = searchParams.get('guildId') || 'global';
	$: commandId = searchParams.get('commandId');
	$: basePath =
		id !== 'global'
			? `applications/${appInfo.id}/guilds/${id}/commands`
			: `applications/${appInfo.id}/commands`;

	$: editing = browser && typeof commandId === 'string';

	const { form, errors, data, setFields } = createForm({
		initialValues: {
			type: "1",
			name: '',
			description: '',
			dm_permission: true
		},
		validate: (values) => {
			let errs = {} as Record<string, string>;
			if (values.name === '') {
				errs['name'] = `${typeToName(values.type || 1)} interaction must have a name`;
			} else if (values?.name?.length < 3) {
				errs['name'] = `Interaction name length must be greater than 3`;
			}

			if (values.description === '' && values.type == "1") {
				errs['description'] = 'Description is required for chat input interactions';
			}
			return errs;
		},
		onSubmit: (values) => {
			const body = {
				type: Number(values.type),
				name: values.name
			} as Record<string, unknown>;

			if (values.type === "1") {
				body['description'] = values.description;
			}
        

            if(id === 'global') {
                body["dm_permission"] = values.dm_permission;
            }


			toast.promise(
				fetchAPI(basePath, {
					method: 'POST',
					data: body
				}),
				{
					loading: `${editing ? 'Editing' : 'Adding'} ${typeToName(values.type)} ${values.name}`,
					success: `${editing ? 'Edited' : 'Added'} ${typeToName(values.type)} ${
						values.name
					}, you can continue adding commands`,
					error: `Error occurred while ${editing ? 'editing' : 'adding'} "${values.name}"`
				} as any
			);
		}
	});

     // query if editing previous command
	$: queryKey = ['app.editor.command', id, commandId];
	$: commandQuery = createQuery({
		queryKey,
		queryFn: async () => (await fetchAPI(`${basePath}/${commandId}`)).data,
		// enable only if command id is provided (also only in browser)
		enabled: editing,
        onSuccess(data: DiscordInteraction) {
           setFields({
                name: data.name,
                type: String(data.type),
                description: data.description,
                dm_permission: data.dm_permission
           })
        },
	});
	$: commandData = ($commandQuery.data || {}) as DiscordInteraction;
</script>

<div class="m-2">
	<form use:form>
		<div class="bg-primary-700 p-2 flex flex-col gap-3 rounded-lg">
			<h1 class="text-xl font-bold flex items-center">
                <a class="text-blurple-200 hover:text-blurple-300" href="{base}/dashboard{id === 'global' ? '' : `?guildId=${id}`}"><Back /> </a>
				{#if editing}
					{#if $commandQuery.isLoading}
						<span>Please wait..</span>
                    {:else if $commandQuery.isError}
                        <span class="text-red-300">Oops Editor failed to fetch command (You wil not be able to edit command {commandId})</span>
					{:else}
						Editing {typeToName(commandData.type)}
						<span class="font-bold text-green-400">{commandData.name}</span> in {@html id === 'global' ? 'global' : `guild <span class="text-blurple-300">(${id})</span>`} scope
					{/if}
				{:else}
					<span>Adding new {typeToName($data.type)} Interaction 	in {@html id === 'global' ? 'global' : `guild <span class="text-blurple-300">(${id})</span>`} scope</span>
				{/if}
			</h1>

			<label for="name">Command Name</label>
			<input
				type="text"
				name="name"
				id="name"
                disabled={editing}
				placeholder="Command name"
				class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
			/>
            {#if editing}
                <span class="text-yellow-300 text-xs">Cannot edit a command name</span>
            {/if}
			{#if $errors.name}
				<span class="text-red-300 text-xs">{$errors.name}</span>
			{/if}

            <label for="type">Interaction type</label>
            <select
                id="type"
                name="type"
                disabled={editing}
                value={commandData?.type}
                class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
            >
                <option value={1}>Chat input (Slash command)</option>
                <option value={2}>User</option>
                <option value={3}>Message</option>
            </select>
			{#if editing}
                <span class="text-yellow-300 text-xs">Cannot edit command type</span>
             {/if}

			{#if id === 'global'}
				<label for="dm_permission" class="inline-flex items-center">
					<span class="mr-2">Allow in Dm</span>
					<input
						name="dm_permission"
						id="dm_permission"
						disabled={editing && $commandQuery.isLoading}
						class="h-5 w-5 bg-primary-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
						type="checkbox"
					/>
				</label>
			{/if}

			<div class="w-full h-1 bg-primary-800 rounded-lg" />
			<!-- Special properties -->
			{#if $data.type === "1"}
				<!-- Description form chat input interactions -->
				<label for="description">Slash command Description</label>
				<textarea
					name="description"
					id="description"
                    disabled={editing && $commandQuery.isLoading}
					placeholder="Command description"
					class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
				/>
				{#if $errors.description}
					<span class="text-red-300 text-xs">{$errors.description}</span>
				{/if}


			{/if}

			<button  disabled={editing && ($commandQuery.isLoading || $commandQuery.isError)} type="submit" class="bg-blurple-600 hover:bg-blurple-700 p-2 rounded-lg"
				>{editing ? 'Edit' : 'Create'} {typeToName($data.type)} interaction</button
			>
		</div>
	</form>
</div>
