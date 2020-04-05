<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";

  import Todolist from "./components/Todolist.svelte";

</script>

<style lang="scss">
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
</style>

<div class="container">

  <Todolist />

</div>
