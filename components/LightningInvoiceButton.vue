<template>
  <div>
    <button
      @click="lightning = true"
      class="
        m-3
        border-2 border-purple-600
        text-purple-600
        px-3
        py-2
        rounded-lg
        font-semibold
        text-lg
        focus:outline-none
        focus:shadow-outline
        hover:bg-purple-600
        hover:border-purple-600
        hover:text-white
        shadow-lg
        cursor-pointer
        transition
        ease-in
        duration-300
        flex flex-wrap
        justify-center
        items-center
      "
    >
      Bitcoin Lightning Network&nbsp;<span
        class="
          bg-white
          w-14
          h-8
          rounded-full
          border-2 border-white
          flex
          items-center
          justify-center
        "
        ><img src="@/assets/img/Lightning.svg"
      /></span>
    </button>
    <LightningCheckout
      v-if="lightning"
      @ok="initInvoice"
      @close="lightning = false"
    />
    <PaymentModal
      :address="lightningQr"
      :currency="'Lightning'"
      :paymentHash="payment_hash"
      @close="lightningQr = false"
      v-if="lightningQr"
      key="lightning"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightning: false,
      lightningQr: false,
      payment_hash: null,
    }
  },
  methods: {
    initInvoice(data) {
      this.lightning = false
      this.lightningQr = data.payment_request
      this.payment_hash = data.payment_hash
    },
  },
}
</script>

<style>
</style>