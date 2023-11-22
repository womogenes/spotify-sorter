<script>
  export let data;
</script>

<article class="prose lg:prose-xl">
  <h1>Sorting Tracks in a Music Playlist: A Musical Odyssey</h1>
  <p>
    For years, music enthusiasts have curated playlists with the precision of a
    symphony conductor, carefully arranging tracks to create a harmonious
    listening experience. Playlists have become an integral part of our musical
    journey, with users spending hours crafting the perfect sequence of songs
    for different moods and occasions.
  </p>
  <p>
    However, a recent study suggests that the way we sort our music may have a
    profound impact on our auditory well-being. Researchers have uncovered
    surprising correlations between playlist organization and the emotional
    responses of listeners, opening up a new frontier in the science of music
    curation.
  </p>

  <!-- ... -->
  {#if !data.user}
    <a href="/auth/login" class="btn">Log in</a>
  {/if}

  <pre>User: {JSON.stringify(data.user, null, 2)}</pre>
</article>
