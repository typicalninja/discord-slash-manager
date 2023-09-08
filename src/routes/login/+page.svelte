<script lang="ts">
    import { authStore, applicationInfo } from '$lib/localStore'
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { fetchUser } from '$lib/user';
    import { discordIdRegex } from '$lib/constants';
	import { getAccessToken } from '$lib/api';

    let auth = get(authStore);

    // these are not stored anywhere only on the client memory
    let clientId = auth.clientId;
    let clientSecret = auth.clientSecret;
    $: loginBlocked = clientId === '' || clientSecret === ''

    let loggingIn = false;

    async function login() {
        if(loginBlocked) return;
        if(!discordIdRegex.test(clientId)) return alert(`Id is invalid.`)
        loggingIn = true;
        authStore.update((p) => ({ ...p, clientId, clientSecret }))
        try {
            const accessToken = await getAccessToken(clientId, clientSecret);
            // set the access token for future uses
            authStore.update((prev) => ({ ...prev, accessToken }))
            const { username, discriminator, id } = await fetchUser();
            if(typeof username !== 'string' || typeof id !== 'string') throw new TypeError(`API Returned non string values`)
            
            applicationInfo.set({
                username,
                discriminator,
                id
            });

            goto('/dashboard')
        }
        catch(err) {
            console.log('Error while verifying', err)
            authStore.update((p) => ({ ...p, accessToken: '' }))
            alert('Verification failed, try again (check your credentials)')
        }

        loggingIn = false;
    }

    onMount(() => {
        // if token is present immediately redirect to the dashboard
        if(auth.accessToken !== '') goto('/dashboard')
    });

</script>

<div class="flex justify-center">
    <div class="bg-primary-800 shadow-lg shadow-primary-900 border border-primary-700 opacity-90 rounded-lg p-3 w-1/2 flex flex-col gap-2 mt-9">
        <h1 class="font-bold font-mono text-3xl">Login</h1>
        <p class="text-lg">Enter your client id and client secret</p>
        <p class="text-sm font-bold">NOT your client token</p>
        <p class="text-sm font-medium text-primary-300">
            Data is not sent to any 3rd party servers,
            everything you do is only recorded to the <span class="font-bold">localStorage</span> and can be deleted if you need to.
        </p>
        <p>Get your application credentials from here <a href="https://discord.com/developers/applications" class="text-blurple-200 hover:underline">discord.com/developers/applications</a></p>
        <input type="text" readonly={loggingIn} bind:value={clientId} placeholder="Client Id" class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none" />
        <input type="password" readonly={loggingIn} bind:value={clientSecret} placeholder="Client Secret" class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none" />
        <button on:click={login} disabled={loginBlocked || loggingIn} class="{loggingIn|| loginBlocked ? 'bg-primary-600 cursor-not-allowed' : 'bg-blurple-600 hover:bg-blurple-700'} p-2 rounded-lg">Login with token 🚀</button>
        {#if loggingIn}<p>Please wait..., verifying credentials</p> {/if}
    </div>
</div>