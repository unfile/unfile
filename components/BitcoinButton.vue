<template>
  <div>
    <button
      @click="showModal = true"
      class="m-3 border-2 border-yellow-500 text-yellow-500 px-3 py-2 rounded-lg font-semibold text-lg focus:outline-none focus:shadow-outline hover:bg-yellow-500 hover:border-yellow-500 hover:text-white shadow-lg cursor-pointer transition ease-in duration-300 flex justify-center items-center"
    >
      {{ text }}&nbsp;
      <span class="bg-white w-8 h-8 rounded-full border-2 border-white">
        <img src="@/assets/img/BTC.svg" />
      </span>
    </button>
    <transition
      enter-active-class="transition-all duration-500 ease"
      leave-active-class="transition-all duration-500 ease"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PaymentModal
        :address="address"
        :currency="'BTC'"
        @close="showModal = false"
        v-if="showModal"
        key="btc"
      />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
    },
    text: {
      type: String,
      default: 'Bitcoin'
    }
  },
  data() {
    return {
      showModal: false,
    }
  },
}
</script>

<style>
</style>