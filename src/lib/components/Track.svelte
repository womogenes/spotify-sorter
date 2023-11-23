<script>
  import { FastAverageColor } from 'fast-average-color';
  import { onMount } from 'svelte';

  export let data;
  const { imageURL, artists, title, previewURL, href } = data;

  const fac = new FastAverageColor();
  let imgEl, containerEl;
  let audioEl, playingPreview;
  onMount(async () => {
    // Colorize background to match album cover image
    fac
      .getColorAsync(imgEl)
      .then((color) => {
        containerEl.style.backgroundColor = color.rgba;
        if (color.isDark) containerEl.classList.add('text-white');
      })
      .catch((e) => {
        console.log('Error computing average color:', e);
      });

    // Make volume softer
    if (audioEl) {
      audioEl.volume = 0.1;
      audioEl.onended = () => (playingPreview = false);
      audioEl.onplaying = () => (playingPreview = true);
      audioEl.onpause = () => (playingPreview = false);
    }
  });
</script>

<a
  class="flex gap-4 rounded-lg border bg-neutral-500 p-3 no-underline transition-shadow hover:shadow-lg"
  bind:this={containerEl}
  {href}
  target="_blank"
>
  <img
    class="m-0 h-20 w-20 rounded-lg object-cover shadow"
    src={imageURL}
    alt="Album cover for {title}"
    bind:this={imgEl}
    crossorigin="anonymous"
  />
  <div class="z-10 flex w-full flex-col self-end overflow-auto">
    <span class="text-lg font-extrabold leading-6 sm:text-2xl sm:leading-tight"
      >{title}</span
    >
    <span class="opacity-80">
      {#each artists as artist, i}
        {@html i > 0 ? ` &bull; ` : ''}
        <a
          href={artist.href}
          target="_blank"
          class="underline-offset-2 hover:underline">{artist.name}</a
        >
      {/each}
    </span>
  </div>

  {#if previewURL}
    <div class="flex items-end">
      <button
        class="rounded-full bg-white px-4 py-2 text-black transition-all hover:bg-neutral-200"
        on:click|stopPropagation|preventDefault={audioEl.paused
          ? audioEl.play()
          : audioEl.pause()}
      >
        {playingPreview ? 'Pause' : 'Play'}
      </button>
      <audio preload="all" bind:this={audioEl}>
        <source src={previewURL} />
      </audio>
    </div>
  {/if}
</a>
