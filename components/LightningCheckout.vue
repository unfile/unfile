<template>
  <div
    class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50 dark:bg-gray-500 dark:bg-opacity-70"
  >
    <!-- modal -->
    <div
      class="bg-white rounded shadow-lg w-10/12 md:w-1/3 flex flex-col justify-center items-center py-5 dark:bg-gray-800 relative"
    >
      <!-- modal body -->
      <div class="px-10 py-5 flex flex-col justify-center items-start">
        <label for="amount" class="dark:text-gray-200">Amount (SAT)</label>
        <input
          type="number"
          name="amount"
          id="amount"
          class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 outline-none mb-5 dark:bg-gray-800 dark:border-gray-500 dark:text-white"
          min="10"
          placeholder="min 10 satoshis"
          v-model="amount"
        />
        <label for="memo" class="dark:text-gray-200">Memo</label>
        <input
          type="text"
          placeholder="optional note"
          id="memo"
          name="memo"
          class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 outline-none dark:bg-gray-800 dark:border-gray-500 dark:text-white"
          v-model="memo"
        />
      </div>
      <p class="text-red-600 p-4 text-center dark:text-red-500" v-if="error">{{ error }}</p>
      <p v-if="error" class="dark:text-white p-4 text-center">
        Could not generate invoice, please use this external link instead
        <br />
        <a
          href="https://legend.lnbits.com/tipjar/59"
          class="text-blue-500 dark:text-blue-300"
          target="_external"
        >https://legend.lnbits.com/tipjar/59</a>
      </p>
      <div class="flex justify-around items-center w-full p-5">
        <button
          class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white border-2 border-purple-600"
          v-if="!loading"
          @click="submit"
        >Generate Invoice</button>
        <Spinner class="h-1 w-1" v-else />
      </div>
      <div class="absolute top-0 right-0 justify-center items-center w-100">
        <button
          class="bg-transparent hover:bg-red-600 px-3 pb-1 hover:text-white dark:text-white text-2xl"
          @click="close"
        >&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      memo: '',
      amount: null,
      error: '',
    }
  },
  methods: {
    submit() {
      this.error = ''
      if (!Number(this.amount) || Number(this.amount) < 10) {
        this.error = 'Amount cannot be less than 10 satoshis'
        return
      }
      this.loading = true

      var myHeaders = new Headers()
      myHeaders.append('X-Api-Key', 'd97307f305d24dc2944fa397a21c6421')
      myHeaders.append('Content-Type', 'application/json')
      // myHeaders.append('mode', 'no-cors')

      var raw = JSON.stringify({
        out: false,
        amount: Number(this.amount),
        memo: this.memo || 'UnFile.io Donation',
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch('https://legend.lnbits.com/api/v1/payments', requestOptions)
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then((result) => {
                console.log(result)
                if (result) {
                  this.$emit('ok', result)
                }
              })
              .catch((error) => {
                console.log('error', error)
                this.error = `${error}`
              })
              .finally(() => {
                this.loading = false
              })
          } else {
            response.text().then((message) => {
              this.error = `${message}`
              this.loading = false
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.error = `${error}`
          this.loading = false
        })
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>