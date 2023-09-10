<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { fetchAPI } from '$lib/api';
	import { typeToName } from '$lib/constants';
	import { applicationInfo } from '$lib/localStore';
	import { createForm } from 'svelte-forms-lib';
	import { toast } from 'svelte-sonner';
	import { get } from 'svelte/store';

    // creates a dummy searchParams if not in browser
    $: searchParams = (browser ?  $page.url.searchParams : new URLSearchParams())
    const appInfo = get(applicationInfo);

    $: id = searchParams.get('guildId') || 'global'
    $: basePath = id !== 'global' ? `applications/${appInfo.id}/guilds/${id}/commands` : `applications/${appInfo.id}/commands`;

	const { form, errors, handleChange, handleSubmit,  } = createForm({
		initialValues: {
			type: 1,
            name: '',
            description: '',
            dm_permission: true,
		},
        validate: values => {
            let errs = {} as Record<string, string>;
            console.log(values)
            if (values.name === "") {
                errs["name"] = `${typeToName(values.type || 1)} interaction must have a name`;
            }
            else if(values?.name?.length < 3) {
                errs["name"] = `Interaction name length must be greater than 3`
            }

            if (values.description === "" && values.type == 1) {
                errs["description"] = "Description is required for chat input interactions";
            }
            return errs;
        },
		onSubmit: (values) => {
            const body = {
                type: values.type,
                name: values.name
            } as Record<string, unknown>

            if(values.type === 1) {
                body["description"] = values.description;
            }


            toast.promise(fetchAPI(basePath, { 
                method: 'POST',
                data: body
                }), {
                loading: `Adding ${typeToName(values.type)} ${values.name}`,
                success: `Added ${typeToName(values.type)} ${values.name}, you can continue adding commands`,
                error: `Error occurred while adding "${values.name}"`
            } as any)
			//alert(JSON.stringify(values));
		}
	});
</script>

<div class="m-2">
	<form on:submit={handleSubmit}>
		<div class="bg-primary-700 p-2 flex flex-col gap-3 rounded-lg">
			<h1 class="text-xl font-bold">Add new {typeToName($form.type)} Interaction to {id === 'global' ? 'global' : `guild (${id})`} scope</h1>
			<label for="name">Command Name</label>
			<input
				type="text"
				name="name"
				id="name"
                on:keyup={handleChange}
                bind:value={$form.name}
				placeholder="Command name"
				class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
			/>
            {#if $errors.name}
                <span class="text-red-300 text-xs">{$errors.name}</span>
            {/if}

			<label for="type">Interaction type</label>
			<select
                id="type"
                name="type"
                on:keyup={handleChange}
                bind:value={$form.type}
				class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
			>
				<option value={1}>Chat input (Slash command)</option>
				<option value={2}>User</option>
				<option value={3}>Message</option>
			</select>

            <label for="dm_permission" class="inline-flex items-center">
                <span class="mr-2">Allow in Dm</span>
                <input 
                    name="dm_permission" 
                    id="dm_permission"
                    on:keyup={handleChange}
                    bind:value={$form.dm_permission}
                    class="h-5 w-5 bg-primary-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none" 
                    type="checkbox" 
                />
            </label>

            <div class="w-full h-1 bg-primary-800 rounded-lg"></div>
             <!-- Special properties -->
            {#if $form.type === 1}
                <!-- Description form chat input interactions -->
                <label for="description">Slash command Description</label>
                <textarea
                    name="description"
                    id="description"
                    on:keyup={handleChange}
                    bind:value={$form.description}
                    placeholder="Command description"
                    class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                />
                {#if $errors.description}
                <span class="text-red-300 text-xs">{$errors.description}</span>
                {/if}
            {/if}

            <button type="submit" class="bg-blurple-600 hover:bg-blurple-700 p-2 rounded-lg">Create {typeToName($form.type)} interaction</button>
		</div>
	</form>
</div>
