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
    <transition
      enter-active-class="transition-all delay-300 duration-300 ease"
      leave-active-class="transition-all duration-300 ease"
      enter-class="opacity-0 transform -translate-x-full"
      enter-to-class="opacity-100 transform -translate-x-0"
      leave-class="opacity-100 transform -translate-x-0"
      leave-to-class="opacity-0 transform -translate-x-full"
    >
      <UploadBox
        @upload="startUpload"
        @passwordCreated="updatePassword"
        :password="password"
        v-if="!showProgress"
      />
      <Progress
        v-else
        :password="password"
        :pct="pct"
        :cid="cid"
      />
    </transition>
  </div>
</template>

<script>
import { storeFiles } from '~/utils/storage'
export default {
  data() {
    return {
      showProgress: false,
      password: '',
      pct: 0,
      cid: '',
    }
  },
  methods: {
    async startUpload(data) {
      this.showProgress = true
      const cid = await storeFiles(
        data.files,
        data.password,
        data.caption,
        data.addresses,
        this.$config.clientVersion,
        this.progressCallback
      )
      if (cid) {
        this.pct = 100
        this.cid = cid
      }
    },
    progressCallback(pct) {
      console.log(pct)
      this.pct = pct
    },
    updatePassword(password) {
      this.password = password
    },
  },
}
</script>
