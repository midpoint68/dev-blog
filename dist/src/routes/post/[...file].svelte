<script type="ts">
  import { marked } from 'marked';
  import axios from "axios";
  import config from '$lib/config';
  import hljs from "highlight.js";
  import { tick } from "svelte";

  export let file: string;

  // Define vars
  let html: string = "";
  let category: string = "";
  let title: string = "";

  const updateContent = async () => {
    try{
      const parts = file.split("/");
      category = parts.length > 1 ? parts[0] : 'Root';
      title = `${parts[1]}`;
      const url = encodeURI(`/posts/${file}.md`);
      const md = (await axios.get(url)).data;
      marked(md, (err: any, res: string) => {
        if(err) {
          console.error(err);
        } else {
          // Set new page content
          html = res;

          // Highlight code blocks
          tick().then(hljs.highlightAll);
        }
      });
    } catch (err) {
      console.error(err);
      html = "There was issue while loading this content...";
    }
  };
  
  // Update content
  $: if(file) {
    updateContent();
  } else {
    location.assign("/");
  }
</script>

<!-- Page Title -->
<svelte:head>
  <title>{config.name} - {title}</title>
</svelte:head>

<a href="/">&lt;- Home</a>
<div id="category">{category}</div>
<div id="content">{@html html}</div>

<style>
  #category {
    margin: 1rem 0;
    color: #aaa;
  }
</style>