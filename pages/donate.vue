<template>
  <div
    class="
      md:py-12
      px-4
      sm:px-6
      lg:px-8
      relative
      flex flex-col
      items-center
      justify-center
      flex-1
    "
  >
    <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 shadow-xl">
      <h1 class="text-lg text-center">
        Thank you for supporting this project. These are the currently accepted payment methods:
      </h1>
      <div class="flex flex-wrap justify-center items-center mt-5">
        <button
          @click="btcQR = true"
          class="
            m-3
            border-2 border-yellow-500
            text-yellow-500
            px-3
            py-2
            rounded-lg
            font-semibold
            text-lg
            focus:outline-none
            focus:shadow-outline
            hover:bg-yellow-500
            hover:border-yellow-500
            hover:text-white
            shadow-lg
            cursor-pointer
            transition
            ease-in
            duration-300
            flex
            justify-center
            items-center
          "
        >
          Bitcoin&nbsp;<span
            class="bg-white w-8 h-8 rounded-full border-2 border-white"
            ><img src="@/assets/img/BTC.svg"
          /></span>
        </button>
        <button
          @click="xmrQR = true"
          class="
            m-3
            border-2
            px-3
            py-2
            rounded-lg
            font-semibold
            text-lg
            focus:outline-none
            focus:shadow-outline
            hover:text-white
            shadow-lg
            cursor-pointer
            transition
            ease-in
            duration-300
            flex
            justify-center
            items-center
            xmrbtn
          "
        >
          Monero&nbsp;<span
            class="bg-white w-8 h-8 rounded-full border-2 border-white"
            ><img src="@/assets/img/XMR.svg"
          /></span>
        </button>
        <PaymentModal
          :address="'bc1qmu6yj6e49wjvf6qgdcf98tmm48f4dxxajxqjga'"
          :currency="'BTC'"
          @close="btcQR = false"
          v-if="btcQR"
          key="btc"
        />
        <PaymentModal
          :address="'898swoLtFZ3NqPAAVUpFwf9MVtnyy17MASvyhLstFYDmZ5C4rvSyGSiXvRny5uic2jRsFqWsdfmHGPmapVMhHizL2pWhyEb'"
          :currency="'XMR'"
          @close="xmrQR = false"
          v-if="xmrQR"
          key="xmr"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btcQR: false,
      xmrQR: false,
    }
  },
}
</script>