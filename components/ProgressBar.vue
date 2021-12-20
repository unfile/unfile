<template>
  <div
    class="
      w-full
      bg-gray-100
      rounded-full
      overflow-hidden
      shadow-inner
      h-6
      dark:bg-gray-600
    "
  >
    <div
      class="bg-blue-400 text-xs leading-none py-3 text-center"
      :style="`width: ${pct}%`"
    ></div>
    <div class="text-center w-full -mt-6 font-semibold text-white text-shadow">
      {{ pct }}%
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pct: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style>
.text-shadow {
  text-shadow: 0px 0px 3px black;
}
</style>