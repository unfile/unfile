<template>
    <div class="
        md:py-12
        px-4
        sm:px-6
        lg:px-8
        relative
        flex
        items-center
        justify-center
        flex-1
      ">
        <transition enter-active-class="transition-all delay-300 duration-300 ease"
            leave-active-class="transition-all duration-300 ease" enter-class="opacity-0 transform -translate-x-full"
            enter-to-class="opacity-100 transform -translate-x-0" leave-class="opacity-100 transform -translate-x-0"
            leave-to-class="opacity-0 transform -translate-x-full">
            <PasteBox @upload="startUpload" @passwordCreated="updatePassword" :password="password"
                v-if="!showProgress" />
            <Progress v-else :password="password" :pct="pct" :cid="cid" :caption="caption" />
        </transition>
    </div>
</template>
  
<script>
import UploadHandlingMixin from '~/mixins/upload-handling'
export default {
    head() {
        return {
            title: `UnFile - Decentralized text paste sharing`,
        }
    },
    mixins: [UploadHandlingMixin]
}
</script>
  