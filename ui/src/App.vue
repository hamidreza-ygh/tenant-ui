<template class="h-full bg-white">
  <nav class="text-center">
    <div v-if="isAuthenticated" class="flex justify-between gap-2">
      <div class="basis-2/3 flex justify-start gap-4">
        <router-link to="/">Home</router-link>
        <!-- <router-link :to="{ name: 'shop' }">Shop</router-link> -->
      </div>
      <div class="basis-1/3 flex flex-row justify-end items-center gap-6">
        <!-- <button
          class="flex font-semibold items-center gap-2"
          @click="isOpenCart = !isOpenCart"
        >
          <span></span>
          <img :src="shoppingCartIcon" />
        </button> -->
        <a href="" @click="logOut">Logout</a>
      </div>
    </div>
    <span v-else>
      <router-link to="/login">Log-in</router-link>
    </span>
  </nav>
  <!-- <shoppingCart
    :is-open="isOpenCart"
    :products="bagProducts"
    @place-order="
      (message) => {
        isOpenModal = true;
        modalMessage = message;
      }
    "
    @close-cart="
      {
        isOpenCart = false;
      }
    "
  >
  </shoppingCart>
  <modal
    :is-open="isOpenModal"
    :message="modalMessage"
    @close-modal="
      {
        isOpenModal = false;
      }
    "
  >
  </modal> -->
  <router-view
    class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
  />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import shoppingCart from "@/components/ShoppingCart.vue";
// import shoppingCartIcon from "@/assets/icons/cart-shopping-solid.svg";
// import modal from "@/components/ModalComponent.vue";

export default {
  name: "App",
  data() {
    return {
      // shoppingCartIcon: shoppingCartIcon,
      // isOpenCart: false,
      // isOpenModal: false,
      // modalMessage: {},
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    logOut() {
      this.setToken = null;
      this.setUser = null;
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "bagProducts"]),
  },
  // components: { shoppingCart, modal },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
