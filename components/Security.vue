<template>
  <div
    class="
      md:py-12
      px-4
      sm:px-6
      lg:px-8
      relative
      flex
      items-center
      justify-center
    "
  >
  <div class="text-center flex flex-col justify-center items-center">
    <h1 class="text-2xl font-semibold">Insecure context detected!</h1>
    <p v-if="browserCheck">
      Encryption may not be supported by your browser, please try using another
      modern browser.
    </p>
    <p v-else>
      This web app needs either HTTPS or being hosted on localhost for
      encryption to work.
    </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      browserCheck: false,
    }
  },
  mounted() {
    this.browserCheck =
      window.location.protocol == 'https:' ||
      window.location.hostname.endsWith('.localhost') ||
      window.location.hostname == 'localhost'
  },
}
</script>