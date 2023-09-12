<script lang="ts">
	import { OptionTypes, type AccordionOption, } from '$lib/constants';
	import { OptionTypeToName, generateRandomAlphaNumeric } from '$lib/helpers';
	import { onMount } from 'svelte';
	import Add from './icons/Add.svelte';
	import Minus from './icons/Minus.svelte';
	import Trash from './icons/Trash.svelte';
	import { slide, fly } from 'svelte/transition';
	import { browser } from '$app/environment';

    export let value = [] as AccordionOption[];

	export let options = [] as AccordionOption[];

	const addOption = () => {
		options = options.concat([
			{
				type: 1,
				open: false,
				name: '',
				id: 0,
				itemId: generateRandomAlphaNumeric(10),
				description: '',
                autocomplete: false,
                required: true,
                min_value: null,
                max_value: null,
                max_length: null,
                min_length: null
			}
		]);
	};

	const removeOption = (itemId: string) => {
		options = options.filter((item) => item.itemId !== itemId);
	};


    let preAdd = false;

   $: {
    // check if values are predefined and add them
    if(browser && value.length && !options.length && !preAdd) {
        const newItemsToAdd = value.filter(val => !options.find(opt => opt.id === val.id))
        if(newItemsToAdd.length) options = options.concat(newItemsToAdd)
        preAdd = true;
    }
   }
</script>

<div class="flex flex-col gap-2">
	<div class="bg-primary-800 rounded-lg w-full p-2 h-12 flex items-center justify-between">
		<span>Options</span>
		<button
			on:click={addOption}
			type="button"
			class="bg-primary-800 h-10 hover:bg-primary-700 px-2"
		>
			<Add class="text-green-400" />
		</button>
	</div>
	{#each options as option (option.itemId)}
		<div in:fly={{ x: -200 }} out:fly={{ x: 200 }} class="flex flex-col">
			<div
				class="bg-primary-900 rounded-t-lg {option.open && 'border-b'} border-primary-600 w-full p-2 h-12 flex items-center justify-between"
			>
				<span>{option.name} {OptionTypeToName(option.type)} option</span>
				<div class="flex gap-1">
					<button
                        type="button"
						class="bg-primary-800 h-10 hover:bg-primary-700 px-2"
						on:click={() => (option.open = !option.open)}
					>
						{#if option.open}
							<Minus class="text-yellow-300" />
						{:else}
							<Add class="text-blurple-300" />
						{/if}
					</button>
					<button
                        type="button"
						class="bg-primary-800 h-10 hover:bg-primary-700 px-2"
						on:click={() => removeOption(option.itemId)}
					>
						<Trash class="text-red-300" />
					</button>
				</div>
			</div>
			{#if option.open}
				<div
					in:slide={{ axis: 'y' }}
					out:slide={{}}
					class="bg-primary-800 rounded-b-lg w-full p-2 h-max flex flex-col gap-1"
				>
					<label for={`option-${option.itemId}-name`}>Name</label>
					<input
						name={`option-${option.itemId}-name`}
						id={`option-${option.itemId}-name`}
						bind:value={option.name}
						class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
					/>

					<label for={`option-${option.itemId}-description`}>Description</label>
					<textarea
						name={`option-${option.itemId}-description`}
						id={`option-${option.itemId}-description`}
						bind:value={option.description}
						class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
					/>

                    <label for={`option-${option.itemId}-type`}>Option type</label>
                    <select
                        id={`option-${option.itemId}-type`}
                        name={`option-${option.itemId}-type`}
                        bind:value={option.type}
                        class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    >
                        <option value={OptionTypes.SubCommand}>Sub command</option>
                        <option value={OptionTypes.SubCommandGroup}>Sub command group</option>
                        <option value={OptionTypes.String}>String</option>
                        <option value={OptionTypes.Integer}>Integer</option>
                        <option value={OptionTypes.Boolean}>Boolean</option>
                        <option value={OptionTypes.User}>User</option>
                        <option value={OptionTypes.Channel}>Channel</option>
                        <option value={OptionTypes.Role}>Role</option>
                        <option value={OptionTypes.Mentionable}>Mentionable</option>
                        <option value={OptionTypes.Number}>Number</option>
                        <option value={OptionTypes.Attachment}>Attachment</option>
                    </select>

                    {#if [OptionTypes.Integer, OptionTypes.Number].includes(option.type)}
                        <label for={`option-${option.itemId}-minValue`}>Min Value</label>
                        <input
                            type="number"
                            name={`option-${option.itemId}-minValue`}
                            id={`option-${option.itemId}-minValue`}
                            bind:value={option.min_value}
                            class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        />

                        <label for={`option-${option.itemId}-minValue`}>Max Value</label>
                        <input
                            type="number"
                            name={`option-${option.itemId}-maxValue`}
                            id={`option-${option.itemId}-maxValue`}
                            bind:value={option.max_value}
                            class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        />
                    {/if}

                    {#if option.type === OptionTypes.String}
                        <label for={`option-${option.itemId}-minLength`}>Min Length</label>
                        <input
                            type="number"
                            name={`option-${option.itemId}-minValue`}
                            id={`option-${option.itemId}-minValue`}
                            bind:value={option.min_length}
                            class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        />

                        <label for={`option-${option.itemId}-minValue`}>Max Length</label>
                        <input
                            type="number"
                            name={`option-${option.itemId}-maxValue`}
                            id={`option-${option.itemId}-maxValue`}
                            bind:value={option.max_length}
                            class="bg-primary-500 p-1 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        />
                    {/if}

                    <div class="w-full h-1 bg-primary-700 rounded-lg"></div>
					<div class="flex gap-3">
						<label for="required">
							<span>Required</span>
							<input
								name="required"
								id="required"
								class="h-5 w-5 bg-primary-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
								type="checkbox"
                                bind:checked={option.required}
							/>
						</label>
                       {#if [OptionTypes.String, OptionTypes.Number, OptionTypes.Integer].includes(option.type)} 
                        <label for="autocomplete" class="ml-1">
                                <span>Autocompleted</span>
                                <input
                                    name="autocomplete"
                                    id="autocomplete"
                                    class="h-5 w-5 bg-primary-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                    type="checkbox"
                                    bind:checked={option.autocomplete}
                                />
                            </label>
                       {/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
