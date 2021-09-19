<template>
  <div
    class="sm:max-w-lg w-full py-10 px-10 bg-white rounded-xl z-10 shadow-xl"
  >
    <transition
      enter-active-class="transition-all delay-500 duration-300 ease-out"
      leave-active-class="transition-all duration-500 ease-in"
      enter-class="opacity-0 transform scale-0"
      enter-to-class="opacity-100 transform scale-100"
      leave-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-0"
    >
      <div v-if="!cid" key="progress">
        <div class="text-center mb-5">
          <h4 class="text-sm font-bold text-gray-400 tracking-wide">
            Upload in progress..
          </h4>
        </div>
        <ProgressBar class="my-10 max-w-sm mx-auto" :pct="pct" />
      </div>
      <div v-else key="result">
        <h4 class="text-md font-bold text-gray-500 tracking-wide mb-3">
          Your Link:
        </h4>
        <div
          class="
            flex
            items-center
            p-4
            space-x-4
            border-2 border-gray-300
            rounded-lg
          "
        >
          <div
            :value="combinedLink"
            class="w-full text-base border-r-2 pr-3 select-all break-all"
          >
            {{ link }}<span class="text-red-500">?key={{ password }}</span>
          </div>
          <div class="flex-shrink-0">
            <button
              @click="copyToClipboard"
              class="
                p-2
                bg-blue-500
                text-gray-100
                rounded-md
                focus:shadow-outline
                hover:bg-blue-600
                shadow-lg
                cursor-pointer
                transition
                ease-in
                duration-300
              "
            >
              {{ copyBtnText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyBtnText: 'Copy',
    }
  },
  props: {
    password: {
      type: String,
    },
    pct: {
      type: Number,
    },
    cid: {
      type: String,
    },
  },
  computed: {
    link() {
      let url = window.location.href
      if (!url.endsWith('/')) {
        url += '/'
      }
      return url + `d/${this.cid}`
    },
    combinedLink() {
      return this.link + `?key=${this.password}`
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.combinedLink)
      this.copyBtnText = 'Copied!'
      setTimeout(() => {
        this.copyBtnText = 'Copy'
      }, 1000)
    },
  },
}
</script>

<style>
</style>