<script lang="ts">
  let abortController = new AbortController();
  let result = "";

  async function makeRequest() {
    abortController.abort();
    result = "";

    abortController = new AbortController();
    const response = await fetch('/api', { signal: abortController.signal });
    const reader = response.body!.getReader();

    const decoder = new TextDecoder();
    while (!reader?.cancel) {
      result += decoder.decode((await reader?.read())?.value);
    }
  }

  function abortRequest() {
    abortController.abort();
  }
</script>

<button on:click={makeRequest}>Make request</button>
<button on:click={abortRequest}>Abort request</button>
Result: {result}
