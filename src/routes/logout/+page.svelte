<script>
    import { authStore, applicationInfo } from '$lib/localStore'
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
    import { goto } from '$app/navigation'
	import { base } from '$app/paths';

    let auth = get(authStore);

    function logout() {
        authStore.update((p) => ({ ...p, accessToken: '' }))
        applicationInfo.set({ username: '', discriminator: '', id: '' });
        // redirect to login
        goto(`${base}/login`);
    }

    onMount(() => {
        if(auth.accessToken === '') goto(`${base}/login`)
    });
    
</script>

<div class="flex justify-center">
    <div class="bg-primary-800 shadow-lg shadow-primary-900 border border-primary-700 opacity-90 rounded-lg p-3 w-1/2 flex flex-col gap-2 mt-9">
        <h1 class="font-bold font-mono text-3xl">Logout</h1>
        <p>Everything done here? 😅</p>
        <p>If you liked it please star us on github 🌟</p>
        <p class="text-sm font-medium text-primary-300">
            Data is not sent to any 3rd party servers,
            everything you do is only recorded to the <span class="font-bold">localStorage</span> and can be deleted if you need to.
            Logout does not delete any cached data!!
        </p>
        <button on:click={logout} disabled={auth.accessToken === ''} class="bg-red-500 hover:bg-red-600 p-2 rounded-lg">Logout 💔</button>
    </div>
</div>