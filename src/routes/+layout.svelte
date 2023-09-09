<script lang="ts">
    import "../app.css";
    import Header from '$components/header.svelte'
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
    import { Toaster } from 'svelte-sonner'

	import { Urls } from "$lib/constants";

    const queryClient = new QueryClient()
</script>
 

<QueryClientProvider client={queryClient}>
    <div class="lg:flex bg-primary-500 text-white min-h-screen flex-col gap-2 overflow-x-hidden">
        <Toaster richColors closeButton position="bottom-right" theme="dark" visibleToasts={5} />
        <Header />
        <slot />
    </div>
</QueryClientProvider>