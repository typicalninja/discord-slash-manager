<script lang="ts">
	import Add from "./icons/Add.svelte";

    interface Option {
        type: number
    }

    let options = [] as Option[];

    const addOption = () => {
        options = options.concat([{ type: 1 }])
    }
</script>

<div class="flex flex-col gap-2">
    <div class="bg-primary-800 rounded-lg w-full p-2 h-12 flex items-center justify-between">
        <span>Options</span>
        <button on:click={addOption} type="button" class="bg-primary-800 h-10 hover:bg-primary-700 px-2">
                <Add class="text-green-400" />
        </button>
    </div>
    {#each options as option}
        <div class="bg-primary-800 rounded-lg w-full p-2 h-12 flex items-center justify-between">
            {option.type}
        </div>
    {/each}
</div>