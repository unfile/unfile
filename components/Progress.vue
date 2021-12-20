<template>
  <div
    class="sm:max-w-lg w-full py-10 px-10 bg-white rounded-xl z-10 shadow-xl dark:bg-gray-800"
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
          <h4 class="text-sm font-bold text-gray-400 tracking-wide dark:text-gray-200">
            {{
              pct > 0
                ? 'Upload in progress..'
                : 'Preparing Web3.Storage please wait..'
            }}
          </h4>
        </div>
        <ProgressBar class="my-10 max-w-sm mx-auto" :pct="pct" />
      </div>
      <div v-else key="result">
        <h4 class="text-md font-bold text-gray-500 tracking-wide mb-3 dark:text-gray-300">
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
            dark:border-gray-600
          "
        >
          <div class="w-full text-base border-r-2 pr-3 select-all break-all dark:border-gray-400 dark:text-white">
            {{ baseUrl }}{{ link
            }}<span class="text-red-500 dark:text-red-400">?key={{ password }}</span>
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
        <div class="flex justify-center">
          <button
            class="
              mt-10
              flex
              justify-center
              py-2
              px-4
              tracking-wide
              font-semibold
              rounded-xl
              bg-blue-500
              text-gray-100
              focus:outline-none focus:shadow-outline
              hover:bg-blue-600
              shadow-lg
              cursor-pointer
              transition
              ease-in
              duration-300
            "
            @click="saveLink"
          >
            Save Link in Browser Storage
          </button>
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
    caption: {
      type: String,
    },
  },
  computed: {
    baseUrl() {
      return window.location.origin
    },
    link() {
      return `/d/${this.cid}`
    },
    combinedLink() {
      return this.baseUrl + this.link + `?key=${this.password}`
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
    saveLink() {
      let uploads = localStorage.getItem('unfile-uploads')
      if (uploads) {
        uploads = JSON.parse(uploads) || []
      } else {
        uploads = []
      }
      uploads.unshift({
        caption: this.caption || '',
        link: this.link + `?key=${this.password}`,
      })
      localStorage.setItem('unfile-uploads', JSON.stringify(uploads))
      this.$router.push('/myfiles')
    },
  },
}
</script>

<style>
</style>