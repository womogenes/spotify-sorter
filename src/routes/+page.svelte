<script>
  import Track from '../lib/components/Track.svelte';

  export let data;
</script>

<div class="w-full max-w-2xl">
  <div class="mb-10 flex flex-col items-start gap-4">
    {#if !data.profile}
      <a href="/auth/login" class="btn">Log in</a>
    {:else}
      <h1>Welcome, {data.profile.display_name}</h1>
      <a href="/auth/logout" class="btn">Log out</a>
    {/if}
  </div>

  <h1 class="mb-4">Your top tracks (all time)</h1>

  <div class="flex flex-col gap-4">
    {#each data.topTracks as track}
      <Track data={track} />
    {/each}
  </div>
</div>
