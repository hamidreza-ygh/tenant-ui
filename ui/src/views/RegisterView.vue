<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt="FH Burgenland logo" src="../assets/FH_Burgenland_Logo.jpg" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Create Account
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
          <div class="flex items-center justify-between">
            <label
              for="retypePassword"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Re-type Password
            </label>
          </div>
          <div class="mt-2">
            <input
              id="retypePassword"
              name="retypePassword"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="retypePassword"
            />
            <span class="text-sm text-left text-red-600">
              {{ error?.retypePassword }}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            @click.prevent="signUp"
          >
            Sign up
          </button>
          <div
            v-if="message"
            class="text-md text-center text-white uppercase bg-green-500 mt-4 p-2 rounded-md"
          >
            {{ message }}
          </div>
          <div
            v-if="errorMessage"
            class="text-md text-center text-white uppercase bg-red-500 mt-4 p-2 rounded-md"
          >
            {{ errorMessage }}
          </div>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have already an account?
        {{ " " }}
        <router-link
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-teal-600 hover:text-teal-500"
        >
          Login
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
      retypePassword: "",
      error: {},
      message: "",
      errorMessage: null,
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    passwordValidation() {
      if (this.password.length < 8) {
        this.error.password = "Password must be at least 8 characters";
      } else if (this.password != this.retypePassword) {
        this.error.retypePassword = "Password mismatch";
      } else if (!/[A-Z]/.test(this.password)) {
        this.error.password =
          "Password must include at least one uppercase letter";
      } else if (!/[0-9]/.test(this.password)) {
        this.error.password = "Password must include at least one number";
      } else if (/[!@#$%^&*]/.test(this.password)) {
        this.error.password =
          "Password does not have to include special characters";
      } else {
        this.error = {};
        return true;
      }
    },
    usernameValidation() {
      if (this.username.length > 7) {
        this.error.username = "Username must be at most 8 characters";
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    signUp() {
      if (this.usernameValidation() && this.passwordValidation()) {
        service
          .register({
            username: this.username.toLowerCase(),
            password: this.password,
          })
          .then((response) => {
            const status = response.status;
            console.log("Status", status);
            const { message, error, id } = response.data;

            if (status == 200) {
              service
                .tenantProvision({
                  username: this.username.toLowerCase() + "-" + id,
                  password: this.password,
                  appName: "tenant-" + id + "-todo-app",
                  appNamespace: "tenant-" + id,
                })
                .then((response) => {
                  console.log("Tenant Provision", response);
                })
                .catch((error) => {
                  console.log("Tenant Provision Error", error);
                });
              this.message = message;
              setTimeout(() => {
                this.$router.push("/");
              }, 3000);
            } else {
              this.errorMessage = status == 429 ? response.data : null;
              this.error = error;
            }
          });
      }
    },
  },
};
</script>
