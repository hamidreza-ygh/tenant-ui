<template>
  <div class="container mx-auto px-10 md:px-0">
    <div class="grid grid-cols-1 gap-4">
      <div>
        <h2 class="text-5xl font-semibold leading-7 text-gray-900">
          Welcome {{ user }}
        </h2>
      </div>
      <div>
        <div class="mt-10">
          <h1 class="text-3xl font-semibold text-gray-600">Todo List</h1>
          <div class="mt-6">
            <form @submit.prevent="addTodos()">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <input
                    class="border-2 outline-none py-2 px-2 shadow-md font-medium w-full rounded border-blue-400 hover:border-blue-600 focus:border-blue-600 focus:shadow-blue-200"
                    v-model="newTodo"
                  />
                </div>
                <div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <button
                        class="text-white py-2 px-4 shadow-md w-full rounded bg-red-400 hover:bg-red-600 font-semibold"
                        v-if="todos.length !== 0"
                        @click="removeAllTodos"
                      >
                        Remove All Todos
                      </button>
                    </div>
                    <div>
                      <button
                        class="text-white py-2 px-4 shadow-md w-full rounded bg-emerald-400 hover:bg-emerald-600 font-semibold"
                      >
                        Add Todo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="mt-8 text-center">
            <div class="grid grid-cols-1 gap-3">
              <div>
                <div class="h-full" v-if="todos.length === 0">
                  <p class="text-gray-400">
                    It appears you didn't added any To-Do.
                  </p>
                </div>
              </div>
              <div
                class="rounded shadow-md p-3 h-full hover:shadow-gray-400 text-gray-600 text-lg font-semibold"
                :class="{ completed: todo.complete }"
                v-for="(todo, index) in todos"
                :key="index"
                @click="completedTodo(todo)"
              >
                <span class="text-gray-600 text-lg font-semibold">{{
                  todo.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
            v-if="error"
            class="text-md text-center text-white uppercase bg-red-500 mt-4 p-2 rounded-md"
          >
            {{ error }}
          </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
// const newTodo = ref("");
// const todos = ref([]);
// function addTodo() {
//   if (newTodo.value !== "") {
//     todos.value.push({
//       complete: false,
//       text: newTodo.value,
//     });
//     newTodo.value = "";
//   }
// }
// function removeAllTodos() {
//   todos.value.splice(0, todos.value.length);
// }
// function completedTodo(todo) {
//   todo.complete = !todo.complete;
// }
</script>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";
import service from "@/services/index";
export default {
  name: "HomeView",
  data() {
    return {
      trackingId: null,
      order: null,
      error: null,
      todos: [],
      newTodo: "",
    };
  },
  mounted() {
    this.getTodos();
  },
  components: {
    // HelloWorld,
  },
  methods: {
    getTodos() {
      service
        .getTodosList({
          url: "http://tenant-" + this.userId + ".tenantodo.life",
          authorization: this.token,
        })
        .then((response) => {
          console.log("TodoResponse", response);
          this.todos = response;
        });
    },

    addTodos() {
      service
        .addTodo(
          {
            url: "http://tenant-" + this.userId + ".tenantodo.life",
            authorization: this.token,
          },
          {
            name: this.newTodo,
            complete: false,
          }
        )
        .then((response) => {
          console.log("TodoResponse", response.data);
          const { status, message } = response.data;
          if (status == true) {
            this.getTodos();
          } else {
            this.error = message;
          }
        });
    },
    removeAllTodos() {
      this.todos.forEach((todo) => {
        service
          .deleteTodo(
            {
              url: "http://tenant-" + this.userId + ".tenantodo.life",
              authorization: this.token,
            },
            {
              id: todo.id,
            }
          )
          .then((response) => {
            const { status, message } = response.data;
            if (status == true) {
              this.getTodos();
            } else {
              this.error = message;
            }
          });
      });
    },
    completedTodo(todo) {
      todo.complete = !todo.complete;
    },
  },
  computed: {
    ...mapGetters(["token", "user", "userId"]),
  },
};
</script>
<style>
.completed {
  text-decoration: line-through;
}
</style>
