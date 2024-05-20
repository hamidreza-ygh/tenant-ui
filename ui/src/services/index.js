import axios from "axios";

const options = {};
// options.baseURL = "http://localhost:3003";

//? Decide add token or not
// if (requiresAuth) {
//   options.headers.Authorization = 'JWT TOKEN'
// }
const instance = axios.create(options);
// const todoAppBaseUrl = process.env.VUE_APP_TODO_APP_BASE_URL;

export default {
  async login(body) {
    try {
      const response = await instance({
        method: "POST",
        url: process.env.VUE_APP_USER_API_URL + "/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async register(body) {
    console.log(
      "VUE_APP_USER_API_URL",
      window.__runtime_config__.VUE_APP_USER_API_URL
    );
    try {
      const response = await instance({
        method: "POST",
        url: window.__runtime_config__.VUE_APP_USER_API_URL + "/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async tenantProvision(body) {
    try {
      const response = await instance({
        method: "POST",
        url: process.env.VUE_APP_TENANT_PROVISION_URL,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "token " + process.env.VUE_APP_GH_TOKEN,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        data: JSON.stringify({
          ref: "main",
          inputs: {
            "db-user": body.username,
            "db-password": body.password,
            "app-name": body.appName,
            "app-namespace": body.appNamespace,
          },
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async getTodosList(header) {
    try {
      const response = await instance({
        method: "GET",
        url: header.url,
        // headers: {
        //   authorization: header.authorization,
        //   "Content-Type": "application/json",
        // },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async addTodo(header, body) {
    try {
      const response = await instance({
        method: "POST",
        url: header.url,
        // headers: {
        //   authorization: header.authorization,
        //   "Content-Type": "application/json",
        // },
        data: JSON.stringify({
          name: body.name,
        }),
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  async removeTodo(header, params) {
    try {
      const response = await instance({
        method: "DELETE",
        url: header.url + "/" + params.id,
        // headers: {
        //   authorization: header.authorization,
        //   "Content-Type": "application/json",
        // },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  },
};
