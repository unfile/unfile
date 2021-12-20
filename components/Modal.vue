<template>
  <div
    class="
      modal
      h-screen
      w-full
      fixed
      left-0
      top-0
      flex
      justify-center
      items-center
      bg-black bg-opacity-50
      z-50
      dark:bg-gray-500 dark:bg-opacity-70
    "
  >
    <!-- modal -->
    <div class="bg-white rounded shadow-lg w-10/12 md:w-1/3 dark:bg-gray-800">
      <!-- modal header -->
      <div class="px-4 py-2 flex justify-between items-center" v-if="title">
        <h3 class="font-semibold text-lg dark:text-white">{{ title }}</h3>
        <button class="text-black close-modal dark:text-white" @click="close">&cross;</button>
      </div>
      <!-- modal body -->
      <div class="px-10 py-5 break-words dark:text-white">
        {{ message }}
      </div>
      <div class="flex justify-end items-center w-100 px-10 pb-5">
        <!-- <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">Cancel</button> -->
        <button
          class="bg-blue-600 hover:bg-blue-700 px-3 py-1 px-2 rounded text-white darl:bg-blue-500"
          @click="okClicked"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
    title: {
      type: String,
      default:''
    },
  },
  methods: {
    okClicked() {
      this.$emit('ok')
    },
    close(){
        this.$emit('close')
    }
  },
}
</script>

<style>
</style>