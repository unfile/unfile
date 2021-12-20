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
      flex-1
    "
  >
    <div
      class="
        max-w-screen-lg
        w-full
        p-10
        bg-white
        rounded-xl
        z-10
        shadow-xl
        dark:bg-gray-800
      "
    >
      <div
        class="flex flex-col items-center justify-center"
        v-if="uploads.length < 1"
      >
        <h1
          class="
            text-center
            font-bold
            text-2xl text-gray-500
            dark:text-gray-200
          "
        >
          No links are saved in your browser
        </h1>
        <n-link
          class="
            mt-10
            md:w-1/2
            sm:w-full
            flex
            justify-center
            p-2
            tracking-wide
            font-semibold
            rounded-full
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
          to="/"
        >
          Upload Some Files
        </n-link>
      </div>
      <div class="flex flex-col items-center justify-center" v-else>
        <h1 class="mb-10 text-gray-500 dark:text-gray-200">
          These links are saved in your browser's local storage. Clearing
          application's cache will remove them.
        </h1>
        <div
          v-for="(f, i) in uploads"
          :key="i"
          class="
            flex
            justify-between
            items-center
            border
            p-3
            rounded
            mb-3
            w-full
            dark:border-gray-500
          "
        >
          <div class="flex flex-col mx-2">
            <div class="break-words font-bold text-gray-600 dark:text-gray-200">
              {{ f.caption }}
            </div>
            <div
              class="break-all text-sm select-all dark:text-gray-300"
              :class="{ 'pt-3': f.caption }"
            >
              {{ baseUrl }}{{ f.link }}
            </div>
          </div>
          <button
            class="
              bg-blue-500
              text-gray-100
              tracking-wide
              font-semibold
              focus:outline-none focus:shadow-outline
              hover:bg-blue-600
              shadow-lg
              cursor-pointer
              transition
              ease-in
              duration-300
              py-1
              px-2
              rounded-md
              text-xs
              mx-2
            "
            @click="forget(i)"
          >
            Forget
          </button>
        </div>
        <button
          class="
            mt-10
            flex
            justify-center
            py-2
            px-4
            tracking-wide
            font-semibold
            rounded-full
            bg-blue-500
            text-gray-100
            focus:outline-none focus:shadow-outline
            hover:bg-blue-600
            shadow-lg
            cursor-pointer
            transition
            ease-in
            duration-300
            text-lg
          "
          @click="clearAll"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `UnFile - My Previous Uploads`,
    }
  },
  data() {
    return {
      uploads: [],
    }
  },
  computed: {
    baseUrl() {
      return window.location.origin
    },
  },
  mounted() {
    let uploads = localStorage.getItem('unfile-uploads')
    if (uploads) {
      this.uploads = JSON.parse(uploads)
    }
  },
  methods: {
    forget(i) {
      this.uploads.splice(i, 1)
      localStorage.setItem('unfile-uploads', JSON.stringify(this.uploads))
    },
    clearAll() {
      this.uploads = []
      localStorage.removeItem('unfile-uploads')
    },
  },
}
</script>

<style>
</style>