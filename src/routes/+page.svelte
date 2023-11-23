<script>
  import Track from '../lib/components/Track.svelte';

  export let data;
</script>

<div class="w-full max-w-2xl">
  <div class="mb-10 flex flex-col items-start gap-4">
    {#if !data.profile}
      <div class="prose mb-4">
        <h1>Harmony in Every Note: The Power of Music Sorting</h1>
        <p>
          Unleash the full potential of your Spotify playlists with our app's
          intuitive sorting. It's not just about tidying up your tunes; it's
          about crafting a musical journey that resonates with your soul. Let
          the guiding algorithm be your maestro, curating playlists that
          seamlessly adapt to your changing moods and moments.
        </p>
        <p>
          Experience the joy of music made personal. From energetic beats to
          calming melodies, our app transforms playlist management into an art
          form. Elevate your music experience – where each note finds its
          perfect place, creating a soundtrack uniquely yours.
        </p>
        <p>(The above was authored by ChatGPT)</p>
      </div>
      <a href="/auth/login" class="btn">Log in</a>
    {:else}
      <h1>Welcome, {data.profile.display_name}</h1>
      <a href="/auth/logout" class="btn">Log out</a>
    {/if}
  </div>

  {#if data.topTracks}
    <h1 class="mb-4">Your top tracks (all time)</h1>

    <div class="flex flex-col gap-4">
      {#each data.topTracks as track}
        <Track data={track} />
      {/each}
    </div>
  {/if}
</div>
