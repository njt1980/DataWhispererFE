<!-- <script>
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte'
    import Sidebar from '$lib/components/Sidebar.svelte'

    $: user = $page.data.user;
   
</script>

{#if user}
    <Header {user} />

    <div class='layout'>
        <Sidebar {user} />
        <slot />
    </div>
{:else}
    <p>Loading..</p>
{/if}

<style>
    .layout {
        display : flex;
        height : 100vh;
    }
</style> -->

<script>
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';

    $: user = $page.data.user;
</script>

{#if user}
    <Header {user} />

    <div class="layout">
        <Sidebar {user} />
        <div class="content">
            <slot />
        </div>
    </div>
{:else}
    <p>Loading..</p>
{/if}

<style>
    .layout {
        display: flex;
        min-height: 100vh; /* Full height of the viewport */
        width: 100vw;      /* Full width of the viewport */
    }

    .content {
        flex-grow: 1;       /* Allows content area to take remaining space */
        padding: 20px;      /* Optional padding for content */
        background-color: #f4f6f8; /* Optional background for content */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Ensuring the slot content takes the full available space */
    .content > * {
        width: 100%;
        height: 100%;
    }
</style>


