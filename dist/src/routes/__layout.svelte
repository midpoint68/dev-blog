<script type="ts">
import config from "$lib/config";

  import { onMount } from "svelte";

  let night = false;
  onMount(() => {
    night = !!localStorage.getItem("night-theme");
  });

  const toggleNight = () => {
    night = !night;
    if(night) localStorage.setItem("night-theme", "true");
    else localStorage.removeItem("night-theme");
  };
</script>

<svelte:head>
  {#if night}
    <style>
      body {
        background-color: #333;
        color: #eee;
      }
    </style>
  {/if}
</svelte:head>

<header>
  <div class="left">
    <img class="icon" src="/icon.svg" alt="Dev Blog">
    <h1>{config.name}</h1>
  </div>
  <span class="anchor" on:click={toggleNight}>{night ? 'day' : 'night'}</span>
</header>

<slot></slot>

<style>
  header {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .icon {
    margin-right: 1rem;
  }
</style>