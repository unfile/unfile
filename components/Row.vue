<template>
  <tr>
    <td class="p-3 flex items-center">
      <SolidLockIcon
        class="h-4 w-4 text-gray-400"
        v-if="!metadata"
      /><OpenLockIcon class="h-4 w-4 text-green-300" v-else />&nbsp;
      {{ metadata && metadata.files ? metadata.files[file.name].name : file.name }}
    </td>
    <td class="p-3">{{ file.size | formatSize }}</td>
    <td class="p-3">
      <button
        v-show="metadata"
        class="
          w-full
          flex
          justify-center
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
        "
        @click="downloadFile"
      >
        Download
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
    },
    file: {
      type: Object,
    },
  },
}
</script>

<style>
</style>