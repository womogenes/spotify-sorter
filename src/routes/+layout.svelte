<script>
  import '../app.css';
</script>

<svelte:head>
  <link
    rel="icon"
    href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
  />
</svelte:head>

<main class="flex min-h-screen items-center justify-center p-6 py-12">
  <slot />
</main>

<style>
  :global(h1) {
    @apply text-3xl font-bold;
  }
</style>
