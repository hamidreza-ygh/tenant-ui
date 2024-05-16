<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900"
                        >Shopping cart</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="close"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                            v-for="(product, index) in products"
                            :key="product._id"
                            class="flex py-6"
                          >
                            <div
                              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <img
                                :src="product.imageSrc"
                                :alt="product.imageAlt"
                                class="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <a :href="product.href">{{
                                      product.name
                                    }}</a>
                                  </h3>
                                  <p class="ml-4">€{{ product.price }}</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  {{ product.description }}
                                </p>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <!-- <p class="text-gray-500">
                                  Qty {{ product.quantity }}
                                </p> -->

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-teal-600 hover:text-teal-500"
                                    @click.prevent="removeFromBag(index)"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Subtotal</p>
                      <p>€{{ subTotalPrice }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes are included.
                    </p>
                    <div class="mt-4 relative flex gap-x-3">
                      <div class="flex h-6 items-center">
                        <input
                          id="payment"
                          name="payment"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          v-model="payment"
                        />
                      </div>
                      <div class="text-sm leading-6">
                        <label for="payment" class="font-medium text-gray-900">
                          Already Paid
                        </label>
                        <p class="text-gray-500">Determine the order status.</p>
                      </div>
                    </div>
                    <div class="mt-6">
                      <button
                        @click.prevent="placeOrder"
                        class="w-full flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                      >
                        Order
                      </button>
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        or
                        <button
                          type="button"
                          class="font-medium text-teal-600 hover:text-teal-500"
                          @click="close"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];
</script>

<script>
import { mapGetters, mapMutations } from "vuex";
import services from "@/services/index.js";
export default {
  name: "ShoppingCart",
  emits: ["closeCart", "placeOrder"],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    products: Array,
  },
  data() {
    return {
      open: this.isOpen,
      payment: false,
    };
  },
  watch: {
    isOpen(newValue) {
      this.open = newValue;
    },
  },
  methods: {
    ...mapMutations(["removeFromBag", "emptyBag"]),
    close() {
      this.open = false;
      this.$emit("closeCart");
    },
    placeOrder() {
      services
        .placeOrder(
          {
            authorization: this.token,
          },
          {
            ids: this.products.map((item) => item._id),
            payment: this.payment,
          }
        )
        .then((response) => {
          console.log(response);
          this.close();
          this.$emit("placeOrder", response.data);
          this.emptyBag();
        });
    },
  },
  computed: {
    ...mapGetters(["token"]),
    subTotalPrice() {
      let totalPrice = 0;
      this.products.forEach((item) => {
        totalPrice += item.price;
      });
      return totalPrice;
    },
  },
};
</script>
