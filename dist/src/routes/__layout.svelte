<script type="ts">
  import config from "$lib/config";
</script>

<header>
  <div class="left">
    <a href="https://github.com/midpoint68/dev-blog">
      <img class="icon" src="/icon.svg" alt="Dev Blog" name="Dev Blog">
    </a>
    <h1>{config.name}</h1>
  </div>
  <span class="anchor" on:click={() => {toggleTheme(undefined);}}>
    <span id="light-theme-name">light</span>
    <span id="dark-theme-name">dark</span>
  </span>
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