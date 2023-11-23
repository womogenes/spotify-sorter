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
        console.log(e);
      });
  });
</script>

<a
  class="flex gap-4 rounded-lg border p-3 no-underline transition-shadow hover:shadow-lg"
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
  <div class="flex flex-col self-end">
    <span class="-mb-1 text-2xl font-extrabold">{title}</span>
    <span class="opacity-80">{@html artists.join(' &bull; ')}</span>
  </div>
</a>
