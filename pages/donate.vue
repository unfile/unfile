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
        Thank you for supporting this project. These are the currently accepted
        payment methods:
      </h1>
      <div class="flex flex-wrap justify-center items-center mt-5">
        <BitcoinButton address="bc1qmu6yj6e49wjvf6qgdcf98tmm48f4dxxajxqjga" />
        <LightningInvoiceButton />
        <MoneroButton
          address="898swoLtFZ3NqPAAVUpFwf9MVtnyy17MASvyhLstFYDmZ5C4rvSyGSiXvRny5uic2jRsFqWsdfmHGPmapVMhHizL2pWhyEb"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `UnFile - Donation`,
    }
  },
}
</script>