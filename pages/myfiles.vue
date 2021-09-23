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
    <div class="max-w-screen-lg w-full p-10 bg-white rounded-xl z-10 shadow-xl">
      <div
        class="flex flex-col items-center justify-center"
        v-if="uploads.length < 1"
      >
        <h1 class="text-center font-bold text-2xl text-gray-500">
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
            rounded-xl
            bg-blue-500
            text-gray-100
            focus:outline-none
            focus:shadow-outline
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
        <div
          v-for="(f, i) in uploads"
          :key="i"
          class="
            flex flex-wrap
            justify-between
            items-center
            border
            p-3
            rounded
            mb-3
            w-full
          "
        >
          <div class="mx-2 break-words font-bold">{{ f.caption }}</div>
          <div class="break-all mx-2 text-sm select-all">{{ f.link }}</div>
          <button
            class="
              bg-blue-500
              text-gray-100
              tracking-wide
              font-semibold
              focus:outline-none
              focus:shadow-outline
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
            rounded-xl
            bg-blue-500
            text-gray-100
            focus:outline-none
            focus:shadow-outline
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