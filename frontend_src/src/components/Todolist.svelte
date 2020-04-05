<script>
  import { onMount } from "svelte";

  import Todoitem from "./Todoitem.svelte";

  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;
  let beforeEditCache = "";
  let currentFilter = "all";
  let newTodo = "";
  let tempId = 4;
  let todos = [];
  function addTodo(event) {
    if (event.key === "Enter") {
      todos.push({
        id: tempId,
        completed: false,
        task: newTodo,
        editing: false,
        time_created: Date.now()
      });
      todos = todos;
      tempId = tempId + 1;
      url = `https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_add?task=${newTodo}`;
      newTodo = "";

      console.log("url", url);
      fetch(url)
        .then(resp => {
          resp.json().then(data => {
            console.log("adding", data);
          });
        }) // Transform the data into json
        .catch(err => {
          console.log(err);
        });
    }
  }
  function editTodo(todo) {
    beforeEditCache = todo.title;
    todo.editing = true;
    todos = todos;
  }
  function doneEdit(todo) {
    if (todo.title.trim() === "") {
      todo.title = beforeEditCache;
    }
    todo.editing = false;
    todos = todos;
  }
  function doneEditKeydown(todo, event) {
    if (event.key === "Enter") {
      doneEdit(todo);
    }
    if (event.key === "Escape") {
      todo.title = beforeEditCache;
      todo.editing = false;
      todos = todos;
    }
  }
  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    url = `https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_delete?task_id=${id}`;
    fetch(url)
      .then(resp => {
        resp.json().then(data => {
          console.log("sdsdsds", data);
          todos = [...data];
        });
      }) // Transform the data into json
      .catch(err => {
        console.log(err);
      });
  }
  function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
  }
  function checkAllTodos(event) {
    todos.forEach(todo => (todo.completed = event.target.checked));
    todos = todos;
  }
  function updateFilter(filter) {
    currentFilter = filter;
  }

  onMount(async () => {
    const res = await fetch(
      "https://172.17.0.2/mybot/todolistpackage/actors/todolistpackage/task_list"
    );
    const response = await res.json();
    todos = [...response];
    console.log(response);

    // packageGedisClient.mybot.todolistpackage.actors.todolistpackage.todolistpackage().then(resp => {
    //   if (resp.ok) {
    //     resp.json().then(json => {
    //       console.log(json.data);
    //     });
    //   } else {
    //     let err = new Error(resp);
    //     throw err;
    //   }
    // });
  });

  $: todosRemaining = filteredTodos.filter(todo => !todo.completed).length;
  $: filteredTodos =
    currentFilter === "all"
      ? todos
      : currentFilter === "completed"
      ? todos.filter(todo => todo.completed)
      : todos.filter(todo => !todo.completed);
</script>

<style>
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
  }
  .active {
    background: salmon;
  }
</style>

<input
  type="text"
  class="todo-input"
  placeholder="What needs to be done"
  bind:value={newTodo}
  on:keydown={addTodo} />

{#each filteredTodos as todo}
  <Todoitem
    {todo}
    deleteTodo={() => deleteTodo(todo.id)}
    doneEditKeydown={event => doneEditKeydown(todo, event)}
    doneEdit={() => doneEdit(todo)}
    editTodo={() => editTodo(todo)} />
{/each}

<div class="extra-container">
  <div>
    <label>
      <input type="checkbox" on:change={checkAllTodos} />
      Check All
    </label>
  </div>
  <div>{todosRemaining} items left</div>
</div>

<div class="extra-container">
  <div>
    <button
      on:click={() => updateFilter('all')}
      class:active={currentFilter === 'all'}>
      All
    </button>
    <button
      on:click={() => updateFilter('active')}
      class:active={currentFilter === 'active'}>
      Active
    </button>
    <button
      on:click={() => updateFilter('completed')}
      class:active={currentFilter === 'completed'}>
      Completed
    </button>
  </div>

  <div>
    <button on:click={clearCompleted}>Clear Completed</button>
  </div>
</div>
