<script lang="ts">
    import "../app.css";
    import Header from '$components/header.svelte'
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

    const queryClient = new QueryClient()
</script>
 

<QueryClientProvider client={queryClient}>
    <div class="bg-primary-500 text-white min-h-screen flex flex-col gap-2 overflow-x-hidden">
        <Header />
        <slot />
    </div>
</QueryClientProvider>