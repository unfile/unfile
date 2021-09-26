<template>
  <div>
    <button
      @click="showModal = true"
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
      {{text}}&nbsp;<span
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
    <PaymentModal
      :address="address"
      :currency="'Lightning'"
      @close="showModal = false"
      v-if="showModal"
    />
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
    },
    text:{
        type: String,
        default: 'Bitcoin Lightning Network'
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