<script>
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import { authStore, applicationInfo } from '$lib/localStore'
</script>

<nav class="flex items-center justify-between flex-wrap shadow-primary-900 shadow-sm w-screen h-max p-4">
    <a href="{base}/" class="flex items-center flex-shrink-0 text-white gap-1 mr-6">
        <img height={20} width={20} src="{base}/slash.png" alt="Project Logo (Slash command @ Discord)" />
        <h2 class="font-bold font-mono">Slash Manager</h2>
    </a>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a href="#responsive-header" class="block mt-4 lg:inline-block font-semibold lg:mt-0 text-blurple-200 hover:underline mr-4">
            Add command
          </a>
          <a href="/dashboard" class="block mt-4 lg:inline-block lg:mt-0 font-semibold text-blurple-200 hover:underline mr-4">
            Dashboard
          </a>
        </div>
        <div>
        {#if $authStore.accessToken !== ''}
                <a href="{base}/logout" class="text-md px-3 py-2 font-semibold rounded text-secondary-200 bg-red-600 mt-4 invisible lg:visible">
                Logout {$applicationInfo.username}
                </a>
        {:else}
            <a href="{base}/login" class="text-md px-3 py-2 font-semibold rounded text-secondary-200 bg-green-500 mt-4 invisible lg:visible">
                Login
            </a>
        {/if}
        </div>
    </div>
</nav>