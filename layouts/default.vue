<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="relative top-0 z-10 w-full">
      <div class="flex justify-center px-10 py-5">
        <n-link to="/" class="mr-auto font-bold text-xl px-4 py-2"
          >UnFile</n-link
        >
        <div class="flex items-center items-center ml-auto">
          
          <n-link
            to="/faq"
            class="
              rounded-full
              font-bold
              px-4
              py-2
              transition
              duration-300
              ease-in-out
              betterhover:hover:bg-blue-500
              betterhover:hover:text-white
              mr-1
              whitespace-nowrap
              text-sm
            "
            :class="$route.name=='faq'?'bg-blue-500 text-white':'text-blue-500'"
            >How it works</n-link
          >
          <n-link
            to="/donate"
            class="
              rounded-full
              font-bold
              px-4
              py-2
              transition
              duration-300
              ease-in-out
              betterhover:hover:bg-blue-500
              betterhover:hover:text-white
              mr-1
              text-sm
            "
            :class="$route.name=='donate'?'bg-blue-500 text-white':'text-blue-500'"
            >Donate</n-link
          >
          <a
            href="https://github.com/unfile/unfile"
            target="_external"
            class="
              px-4
              py-2
            "
            title="View source code"
            ><GithubIcon class=""/></a>
        </div>
      </div>
    </div>
    <div
      v-if="checked"
      class="flex justify-center items-center flex-grow min-h-screen-80"
    >
      <Security v-if="!(secure || ['faq', 'donate'].indexOf($route.name) != -1 )" />
      <Nuxt v-else />
    </div>
    <div
      v-else
      class="
        md:py-12
        px-4
        sm:px-6
        lg:px-8
        relative
        flex
        items-center
        justify-center
        min-h-screen-80
      "
    >
      <Spinner />
    </div>
    <div class="relative top-0 z-10 w-full">
      <div class="flex justify-start px-10 py-5">
        <p class="text-gray-400">v{{ $config.clientVersion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      secure: true,
      checked: false,
    }
  },
  async mounted() {
    if (!window.isSecureContext) {
      // Page is a secure context so service workers are now available
      console.log('not secure context detected')
      this.secure = false
    } else {
      console.log('secure')
    }
    this.checked = true
  },
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.min-h-screen-80 {
  min-height: 83vh;
}
.xmrbtn{
  color: #ff6600;
  border-color: #ff6600;
}
.xmrbtn:hover{
  background-color: #ff6600;
}
</style>