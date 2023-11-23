<script>
  export let data;
</script>

<div class="prose w-full max-w-2xl">
  {#if !data.auth}
    <a href="/auth/login" class="btn">Log in</a>
  {:else}
    <a href="/auth/logout" class="btn">Log out</a>
  {/if}

  <pre>Profile: {JSON.stringify(data, null, 2)}</pre>
</div>
