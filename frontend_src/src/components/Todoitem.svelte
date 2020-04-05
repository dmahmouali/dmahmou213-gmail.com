<script>
  import { fly } from "svelte/transition";

  export let todo;
  export let deleteTodo
  export let editTodo
  export let doneEdit
  export let doneEditKeydown

</script>

<style>
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; 
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>

<div class="todo-item">
  <div class="todo-item-left" transition:fly={{ y: 20, duration: 300 }}>
    <input type="checkbox" bind:checked={todo.completed} />
    {#if !todo.editing}
      <div
        class="todo-item-label"
        class:completed={todo.completed}
        on:dblclick={editTodo}>
        {todo.task}
      </div>
    {:else}
      <input
        class="todo-item-edit"
        bind:value={todo.title}
        type="text"
        on:blur={doneEdit}
        on:keydown={doneEditKeydown}
        />
    {/if}
    <div class="todo-item-label">{todo.time_created}</div>
  </div>
  <div class="remove-item" on:click={deleteTodo}>&times;</div>
</div>
