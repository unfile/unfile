<template>
  <div
    class="flex items-center p-2 rounded-lg outline-none dark:bg-gray-800 dark:text-white dark:border-gray-500"
    :class="
      !address
        ? 'border border-gray-300'
        : validAddress == false
          ? 'border-2 border-red-300'
          : 'border border-green-300'
    "
  >
    <input
      class="flex-1 text-base focus:outline-none outline-none pr-2 dark:bg-gray-800 dark:text-white dark:border-gray-500"
      :class="{ 'border-r-2': validAddress }"
      type="text"
      placeholder="BTC or XMR or LNUrlp address.."
      v-model="address"
    />
    <img
      :src="require(`@/assets/img/${validAddress}.svg`)"
      :alt="validAddress"
      :title="validAddress"
      class="h-6 ml-2"
      v-if="Boolean(validAddress)"
    />
    <span v-else-if="address && validAddress == false" class="h-6 ml-2" title="Invalid address">❌</span>
  </div>
</template>

<script>
import WAValidator from '~/utils/validator/wallet_address_validator'
import { getParams } from 'js-lnurl'
export default {
  data() {
    return {
      validAddress: null,
      address: '',
    }
  },
  watch: {
    address(val) {
      this.validateAddress(val)
    },
  },
  methods: {
    async validateAddress(address) {
      if (!address) {
        this.validAddress = null
        this.$emit('validated', '', this.validAddress)
        return
      }
      try {
        const params = await getParams(address)
        // console.log(params)
        if (params.tag && params.tag == 'payRequest') {
          this.validAddress = 'Lightning'
          this.$emit('validated', address, this.validAddress)
          return
        }
      } catch (e) {
        console.log(e)
      }
      let currencies = ['BTC', 'XMR']
      for (const c of currencies) {
        const valid = await WAValidator.validate(address, c)
        if (valid) {
          this.validAddress = c
          this.$emit('validated', address, this.validAddress)
          return
        }
      }
      this.validAddress = false
      this.$emit('validated', address, this.validAddress)
    },
  },
}
</script>

<style>
</style>