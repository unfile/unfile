<template>
  <div
    class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50 dark:bg-gray-500 dark:bg-opacity-70"
  >
    <!-- modal -->
    <div
      class="bg-white rounded shadow-lg w-10/12 lg:w-1/3 flex flex-col justify-center items-center dark:bg-gray-800"
    >
      <!-- modal body -->
      <div class="flex justify-center items-center flex-col" v-if="success">
        <h1
          class="text-lg font-semibold text-center text-green-600 mt-5 dark:text-green-400"
        >Payment received, thank you.</h1>
        <CheckIcon class="w-64 h-64 text-green-500 dark:text-green-300" />
      </div>
      <div class="flex justify-center items-center flex-col" v-else>
        <div
          class="px-10 py-5 cursor-pointer"
          ref="canvas"
          :id="`canvas-${currency}`"
          @click="qrCode.download({ name: 'qr', extension: 'png' })"
        ></div>
        <div class="text-center select-all break-all px-10 text-xs dark:text-white">{{ address }}</div>
      </div>
      <div class="flex justify-center items-center w-100 p-10">
        <button
          class="bg-blue-600 hover:bg-blue-700 px-3 py-1 px-2 rounded text-white"
          @click="close"
        >Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: '',
    currency: '',
    paymentHash: '',
  },
  methods: {
    close() {
      this.$emit('close')
    },

    checkLightningPayment() {
      var myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'd97307f305d24dc2944fa397a21c6421')

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      }

      fetch(
        `https://legend.lnbits.com/api/v1/payments/${this.paymentHash}`,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then((result) => {
                console.log(result)
                if (result.paid) {
                  this.success = true
                  clearInterval(this.checkLightningPayment)
                }
              })
              .catch((error) => {
                console.log('error', error)
              })
          } else {
            console.log(response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  data() {
    return {
      qrCode: null,
      success: false,
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
    if (this.paymentHash) {
      setInterval(this.checkLightningPayment, 5000)
    }
  },
}
</script>

<style>
</style>