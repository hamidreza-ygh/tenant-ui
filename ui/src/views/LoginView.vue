<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="FH Burgenland logo" src="../assets/FH_Burgenland_Logo.jpg" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label
            for="username"
            class="block text-sm text-left font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="username"
            />
            <span class="text-sm text-left text-red-600">
              {{ error?.username }}
            </span>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <!-- <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div> -->
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="password"
            />
            <span class="text-sm text-left text-red-600">
              {{ error?.password }}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            @click.prevent="login"
          >
            Sign in
          </button>
          <div
            v-if="errorMessage"
            class="text-md text-center text-white uppercase bg-red-500 mt-4 p-2 rounded-md"
          >
            {{ errorMessage }}
          </div>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}
        <router-link
          :to="{ name: 'register' }"
          class="font-semibold leading-6 text-teal-600 hover:text-teal-500"
        >
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import service from "../services/index.js";
export default {
  data: () => {
    return {
      username: "",
      password: "",
      error: null,
      errorMessage: null,
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken", "setUserId"]),
    login() {
      service
        .login(
          {
            url: this.$userApiService,
          },
          {
            username: this.username,
            password: this.password,
          }
        )
        .then((response) => {
          const status = response.status;

          const { username, token, error, id } = response.data;
          this.setUser(username);
          this.setToken(token);
          this.setUserId(id);
          if (error) {
            this.error = error;
          } else if (status == 429) {
            this.errorMessage = response.data;
          } else {
            this.$router.push("/");
          }
        });
    },
  },
};
</script>
