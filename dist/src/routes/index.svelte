<script type="ts">
  import config from "$lib/config";
  import axios from "axios";
  import { onMount } from "svelte";

  // Define vars
  let searchStr = "";
  let catalog: [string, string[]][] = [];

  // Helper function to filter through the catalog
  const filterCatalog = (cat: typeof catalog, searchStr: string) => {
    const filtered: typeof cat = [];
    for(const category of cat) {
      if(category[0].toLowerCase().includes(searchStr)) {
        // Add entire category
        filtered.push(category);
      } else {
        const filteredPosts = category[1].filter(name => name.toLowerCase().includes(searchStr));
        if(filteredPosts.length > 0) {
          filtered.push([category[0], filteredPosts]);
        }
      }
    }
    return filtered;
  };

  // Filter posts based on search string
  $: lowerCaseSearchStr = searchStr.toLocaleLowerCase();
  $: filteredCatalog = filterCatalog(catalog, lowerCaseSearchStr);
  $: searchResults = filteredCatalog.length == 0 ? 0 : (filteredCatalog.length == 1 ? filteredCatalog[0][1].length : filteredCatalog.map(x => x[1].length).reduce((a,b) => a + b));

  // Load catalog on page load
  onMount(async ()=>{
    const data: Record<string, string[]> = (await axios.get("/postCatalog.json")).data;
    catalog = Object.entries(data);
  });

</script>

<!-- Title -->
<svelte:head>
  <title>{config.name}</title>
</svelte:head>

<!-- Header -->
<h2>Entries</h2>

<!-- Search Bar and New Post Button-->
<div>
  <input type="text" placeholder="Search..." bind:value={searchStr}>
  <span id="result-count">({searchResults} post{searchResults != 1 ? 's' : ''})</span>
</div>

<!-- Posts -->
{#each filteredCatalog as [category, posts] }
  <h3>{category.length == 0 ? 'Root' : category}</h3>
  <ol>
    {#each posts as post}
      <li><a href="/post/{category.length > 0 ? `${category}/` : ''}{post}">{post}</a></li>
    {/each}
  </ol>
{/each}

<style>
  #result-count {
    color: #aaa;
    font-size: small;
  }
</style>