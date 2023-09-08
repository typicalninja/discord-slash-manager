<script lang="ts">
    import { base } from '$app/paths';
	import { Urls } from '$lib/constants';
</script>

<div class="m-4 flex flex-col gap-2">
    <h1 class="text-blue-200 text-3xl font-bold">Discord slash command Manager</h1>
    <p class="font-semibold">
        Simple tool to manage and view Discord slash command
        for any application.
    </p>  
    <p>
        Discord does not include a ui to view and manage 
        slash command globally for your application. 😕
    </p>  
    <p>
        This tool aims to provide those missing features for you. ✨
    </p>
    <div class="flex justify-center items-center gap-2 mt-10">
          <a href="{base}/login" class="text-md px-3 py-2 font-semibold rounded bg-green-500 mt-4">
            Login 🚀
          </a>
          <a href={Urls.Github} class="text-md px-3 py-2 font-semibold rounded bg-primary-400 mt-4">
            Github 🐙
          </a>
          <a href={Urls.DiscordInvite} class="text-md px-3 py-2 font-semibold rounded bg-blurple-500 mt-4">
            Discord server 👥
          </a>
    </div>
</div>