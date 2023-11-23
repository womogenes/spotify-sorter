<script>
  import Track from '../lib/components/Track.svelte';

  export let data;
</script>

<div class="prose w-full max-w-2xl">
  <div class="mb-10">
    {#if !data.auth}
      <a href="/auth/login" class="btn">Log in</a>
    {:else}
      <a href="/auth/logout" class="btn">Log out</a>
    {/if}
  </div>

  <h1>Your top tracks (all time)</h1>

  <div class="flex flex-col gap-4">
    {#each data.topTracks as track}
      <Track data={track} />
    {/each}
  </div>
</div>
