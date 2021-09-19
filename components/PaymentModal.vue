<template>
  <div
    class="
      modal
      h-screen
      w-full
      fixed
      left-0
      top-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-50
      z-1000
    "
  >
    <!-- modal -->
    <div
      class="
        bg-white
        rounded
        shadow-lg
        w-10/12
        md:w-1/3
        flex flex-col
        justify-center
        items-center
      "
    >
      <!-- modal body -->
      <div class="px-10 py-5 cursor-pointer" ref="canvas" :id="`canvas-${currency}`" @click="qrCode.download({ name: 'qr', extension: 'png' });"></div>
      <div class="text-center select-all break-all px-10 text-sm">{{ address }}</div>
      <div class="flex justify-center items-center w-100 p-10">
        <!-- <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">Cancel</button> -->
        <button
          class="
            bg-blue-600
            hover:bg-blue-700
            px-3
            py-1
            px-2
            rounded
            text-white
          "
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: '',
    currency: '',
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  data() {
    return {
      qrCode: null,
    }
  },
  async mounted() {
    const QRCodeStyling = require('qr-code-styling')
    this.qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      margin: 10,
      type: 'svg',
      data: this.address,
      image: require(`@/assets/img/${this.currency}.svg`),
      dotsOptions: {
        color: '#000000',
        type: 'square',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      // imageOptions: {
      //     crossOrigin: "anonymous",
      //     margin: 0
      // }
    })

    this.qrCode.append(this.$refs.canvas)
    // qrCode.download({ name: "qr", extension: "svg" });
  },
}
</script>

<style>
</style>