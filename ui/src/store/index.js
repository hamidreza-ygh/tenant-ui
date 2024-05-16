import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    token: null,
    userId: null,
    bagProducts: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    userId(state) {
      return state.userId;
    },
    bagProducts(state) {
      return state.bagProducts;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    addToBag(state, newProduct) {
      state.bagProducts.push(newProduct);
    },
    removeFromBag(state, productIndex) {
      state.bagProducts.splice(productIndex, 1);
    },
    emptyBag(state) {
      state.bagProducts = [];
    },
  },
  actions: {},
  modules: {},
});
