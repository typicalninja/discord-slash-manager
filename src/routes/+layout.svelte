<script lang="ts">
    import "../app.css";
    import Header from '$components/header.svelte'
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { Toaster } from 'svelte-sonner'

	import { Urls } from "$lib/constants";

    const queryClient = new QueryClient()
</script>
 

<QueryClientProvider client={queryClient}>
    <div class="hidden lg:flex bg-primary-500 text-white min-h-screen flex-col gap-2 overflow-x-hidden">
        <Toaster richColors closeButton position="bottom-right" theme="dark" visibleToasts={5} />
        <Header />
        <slot />
    </div>
    <div class="lg:hidden p-2 bg-primary-500 text-white min-h-screen flex-col flex justify-center items-center">
        <h1>Site unsupported!</h1>
        <p>
            You appear to be using a mobile device or browser with a minimized screen size
            unfortunately we do not support this screen size.

            Please use a desktop to access this site.
        </p>
        <a href={Urls.Github} class="text-blurple-500 underline">Github for issues</a>
    </div>
</QueryClientProvider>