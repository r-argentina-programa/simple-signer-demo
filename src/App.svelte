<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/home/Home.svelte';
    import TailwindCSS from './TailwindCSS.svelte';
</script>

<TailwindCSS />
<Router>
    <main>
        <Route path="/" component="{Home}" />
    </main>
</Router>
