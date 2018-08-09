<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ "¥" + product.price  }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ "¥" + total }}</p>

    <p><button :disabled="!products.length" @click.prevent="checkout(total)">Checkout</button></p>

    <form action="https://postman-echo.com/post" id="my-custom-checkout-form" method="POST">
      <input type="hidden" :value="total" name="total">
      <input type="hidden" value="" name="omiseToken">
      <input v-for="product in products" type="hidden" :value="product.quantity" :name="product.id">
    </form>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    })
  },
  methods: {
    checkout(total) {
      OmiseCard.open({
        frameLabel: "Merchant",
        submitLabel: "PAY RIGHT NOW !",
        amount: total
      })
    }
  },

  mounted() {
    OmiseCard.configure({
      publicKey: "pkey_test_??????",
      image: "https://cdn.omise.co/assets/dashboard/images/omise-logo.png",
      currency: "JPY",
      onCreateTokenSuccess: token => {
        const form = document.querySelector("#my-custom-checkout-form")
        form.omiseToken.value = token;
        form.submit()
      }
    })
    OmiseCard.attach()
  }
}
</script>
