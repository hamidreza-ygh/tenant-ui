import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";

// import axios from "axios";

// axios.defaults.withCredentials = true;
// // axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.baseURL = "http://localhost:3003";

const app = createApp(App);
const config = window.config || {};
app.config.globalProperties.$userApiService = config.VUE_APP_USER_API_URL;
// app.config.globalProperties.$http = axios;
app.use(store).use(router).mount("#app");
