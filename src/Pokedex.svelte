<script lang="ts">
  import { onMount } from "svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { mainCss, screenCss } from "./styles";
  import { fetchPoke } from "./helpers";

  let started = false;
  let pokeID: number;

  $: query = createQuery({
    queryKey: [pokeID],
    queryFn: () => fetchPoke(pokeID),
    enabled: started,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.key !== " ") {
      return;
    }

    updateStates();
  };

  onMount(() => {
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  });

  function updateStates() {
    started = true;
    pokeID = Math.floor(Math.random() * 700 + 1);
  }
</script>

<main class={mainCss} on:click={() => updateStates()}>
  <section class={screenCss}>
    {#if !started}
      press SPACE or click anywhere to fetch a random pokemon
    {:else if $query.isLoading}
      <p>Loading...</p>
    {:else if $query.isError}
      <p>Error: {$query.error}</p>
    {:else if $query.isSuccess}
      <img
        src={$query.data.sprites.front_default}
        alt="img"
        height="300"
        width="300"
      />
    {/if}
  </section>
</main>
