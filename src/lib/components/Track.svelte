<script>
  import { FastAverageColor } from 'fast-average-color';
  import { onMount } from 'svelte';

  export let data;
  const { imageURL, artists, title, previewURL, href } = data;

  const fac = new FastAverageColor();
  let imgEl, containerEl;
  onMount(async () => {
    fac
      .getColorAsync(imgEl)
      .then((color) => {
        containerEl.style.backgroundColor = color.rgba;
        if (color.isDark) containerEl.classList.add('text-white');
      })
      .catch((e) => {
        console.log('Error computing average color:', e);
      });
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
  <div class="flex w-full flex-col self-end">
    <span class="text-2xl font-extrabold">{title}</span>
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
</a>
