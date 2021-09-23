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
        class="flex flex-grow flex-wrap justify-around items-center"
        v-if="!error"
      >
        <transition
          enter-active-class="transition-all delay-1000 duration-1000 ease"
          leave-active-class="transition-all duration-1000 ease"
          enter-class="opacity-0 transform scale-0"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-0"
        >
          <div
            v-if="status && metadata"
            class="
              sm:px-4
              md:px-16
              lg:px-24
              w-full
              space-y-2
              mb-4
              flex flex-wrap
              items-center
              justify-between
            "
          >
            <p
              class="
                text-green-500
                font-semibold
                text-xl
                flex
                items-center
                justify-center
              "
            >
              Key accepted&nbsp;<CheckIcon class="w-5 h-5" />
            </p>
            <button
              class="
                flex
                justify-center
                cursor-pointer
                py-1
                px-2
                rounded-lg
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
                text-sm
              "
              @click="saveLink"
              :disabled="saveText=='Link Saved!'"
            >
              {{saveText}}
            </button>
          </div>
          <form
            @submit.prevent="getDetails"
            class="sm:px-4 md:px-16 lg:px-24 w-full space-y-2 mb-4"
            v-else-if="status"
          >
            <label class="text-sm font-bold text-gray-500 tracking-wide"
              >Enter Decryption Key</label
            >
            <div class="flex items-center space-x-4">
              <input
                class="
                  text-base
                  p-2
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-indigo-500
                  outline-none
                  w-full
                "
                type="text"
                required
                v-model="dKey"
                :disabled="files.length < 1"
              />
              <div class="flex-shrink-0">
                <button
                  class="
                    w-full
                    flex
                    justify-center
                    tracking-wide
                    font-semibold
                    cursor-pointer
                    py-2
                    px-4
                    rounded-lg
                  "
                  :class="
                    files.length < 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed	shadow'
                      : 'bg-blue-500 text-gray-100 focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300'
                  "
                  type="submit"
                  :disabled="files.length < 1"
                  v-if="!loadingDetails"
                >
                  🔑Verify
                </button>
                <Spinner class="h-1 w-1" v-else />
              </div>
            </div>
          </form>
        </transition>
        <transition
          enter-active-class="transition-all delay-1000 duration-1000 ease"
          leave-active-class="transition-all duration-1000 ease"
          enter-class="opacity-0 transform scale-0"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-0"
        >
          <div class="flex flex-col items-center self-start" v-if="status">
            <table class="table-auto mt-5">
              <tbody>
                <tr v-show="files.length > 0">
                  <td class="text-right px-5 py-1">Files</td>
                  <td class="text-left px-5 py-1">
                    {{ files.length.toLocaleString() }}
                  </td>
                </tr>
                <tr>
                  <td class="text-right px-5 py-1">Total Size</td>
                  <td class="text-left px-5 py-1" v-if="status.dagSize">
                    {{ status.dagSize | formatSize }}
                  </td>
                  <td v-else class="text-left px-5 py-1">N/A</td>
                </tr>
                <tr>
                  <td class="text-right px-5 py-1">Pins</td>
                  <td class="text-left px-5 py-1">
                    <div
                      class="
                        rounded-full
                        h-6
                        w-6
                        text-white
                        font-bold
                        text-center
                        min-w-min
                        px-1
                      "
                      :class="
                        status.pins.length < 1 ? 'bg-red-500' : 'bg-green-400'
                      "
                    >
                      {{ status.pins.length }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-right px-5 py-1">Deals</td>
                  <td class="text-left px-5 py-1">
                    <div
                      class="
                        rounded-full
                        h-6
                        w-6
                        text-white
                        font-bold
                        text-center
                        min-w-min
                        px-1
                      "
                      :class="
                        status.deals.length < 1 ? 'bg-red-500' : 'bg-green-400'
                      "
                    >
                      {{ status.deals.length }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-right px-5 py-1">Created at</td>
                  <td class="text-left px-5 py-1">
                    {{ status.created | dateTime }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex justify-center items-center my-5"
              v-if="metadata && metadata.addresses.length > 0"
            >
              <button
                v-for="address in metadata.addresses"
                :key="address.currency"
                @click="showQR = address"
                class="
                  my-3
                  border-2
                  px-3
                  py-2
                  rounded-lg
                  font-semibold
                  text-lg
                  focus:outline-none
                  focus:shadow-outline
                  hover:text-white
                  shadow-lg
                  cursor-pointer
                  transition
                  ease-in
                  duration-300
                  flex
                  justify-center
                  items-center
                  bg-white
                "
                title="Send tip to the person who uploaded these files"
                :class="
                  address.currency == 'BTC'
                    ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:border-yellow-500'
                    : 'xmrbtn'
                "
              >
                Tip Uploader&nbsp;<span
                  class="bg-white w-8 h-8 rounded-full border-2 border-white"
                  ><img
                    :src="require(`@/assets/img/${address.currency}.svg`)"
                    class=""
                /></span>
              </button>
              <PaymentModal
                :address="showQR.address"
                :currency="showQR.currency"
                @close="showQR = false"
                v-if="showQR"
              />
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="transition-all delay-1000 duration-1000 ease"
          leave-active-class="transition-all duration-1000 ease"
          enter-class="opacity-0 transform scale-0"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-0"
        >
          <div v-if="!status" class="flex flex-col justify-center items-center">
            <h1 class="text-center mb-3 text-lg text-gray-600 font-semibold">
              Finding your files..
            </h1>
            <Spinner />
          </div>
        </transition>
        <transition
          enter-active-class="transition-all delay-1000 duration-1000 ease"
          leave-active-class="transition-all duration-1000 ease"
          enter-class="opacity-0 transform scale-0"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-0"
        >
          <div
            v-if="files.length > 0"
            class="self-start mt-5"
            :class="{ 'flex-1': metadata }"
          >
            <h1
              class="text-lg font-bold text-center text-gray-600 mb-3"
              v-if="metadata"
            >
              {{ metadata.caption }}
            </h1>
            <div class="flex flex-col" v-for="(f, i) in files" :key="i">
              <div class="flex items-center flex-wrap">
                <div class="flex flex-col flex-1 mx-3">
                  <h1 class="w-full break-all font-semibold text-sm">
                    {{
                      metadata && metadata.files
                        ? metadata.files[f.name]
                        : f.name
                    }}
                  </h1>
                  <p class="text-sm whitespace-nowrap text-gray-500">
                    {{ f.size | formatSize }}
                  </p>
                </div>
                <div>
                  <SolidLockIcon
                    class="h-6 w-6 text-gray-400 min-w-min"
                    v-if="!metadata"
                  />
                  <button
                    v-else-if="metadata && f.progress == null"
                    class="
                      w-full
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
                    @click="downloadFile(i)"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div class="flex items-center">
                <ProgressBar
                  :pct="f.progress"
                  v-show="f.progress != null"
                  class="mx-3"
                /><button
                  v-if="f.progress == 100 && Boolean(f.decrypted)"
                  class="
                    text-blue-500
                    tracking-wide
                    font-semibold
                    border-2 border-blue-500
                    hover:bg-blue-500
                    hover:text-white
                    cursor-pointer
                    py-1
                    px-2
                    rounded-md
                    text-xs
                    whitespace-nowrap
                  "
                  @click="resave(f.decrypted, metadata.files[f.name])"
                >
                  Re-Save
                </button>
                <Spinner
                  class="h-1 w-1"
                  v-else-if="metadata && Boolean(f.decrypting)"
                />
              </div>
            </div>
          </div>
          <Spinner v-else-if="status && files.length < 1" class="flex-1" />
        </transition>
      </div>
      <div v-else class="text-center text-xl break-words" v-html="error"></div>
      <Modal :message="errorModal" v-show="errorModal" @ok="errorModal = ''" />
    </div>
  </div>
</template>

<script>
import { formatSize, saveFile } from '~/utils/helpers'
import {
  checkStatus,
  getEncryptedMetadata,
  getFileStream,
  getLinks,
} from '~/utils/storage'
import { decryptBlob } from '~/utils/encryption'
export default {
  data() {
    return {
      status: null,
      metadata: null,
      files: [],
      dKey: this.$route.query.key,
      showQR: false,
      error: '',
      errorModal: '',
      loadingDetails: false,
      saveText:'Save Link in My Files'
    }
  },
  async mounted() {
    try {
      this.status = await checkStatus(this.$route.params.cid)
      await this.getFilesList()
    } catch (e) {
      console.error(e)
      this.error = `Unable to get status for CID: <br><span class="break-all text-red-600">${this.$route.params.cid}</span><br> please make sure your url is correct.`
    }
    if (this.dKey) {
      this.getDetails()
    }
  },
  methods: {
    async getDetails() {
      this.loadingDetails = true
      let encryptedBlob
      try {
        encryptedBlob = await getEncryptedMetadata(this.$route.params.cid)
      } catch (e) {
        this.error = `Could not find metadata file.`
      }
      try {
        await this.decryptMetadata(encryptedBlob)
      } catch (e) {
        this.errorModal = `Unable to decrypt, please check if your key is correct.`
      }
      this.loadingDetails = false
    },
    async decryptMetadata(encryptedBlob) {
      let blob = await decryptBlob(encryptedBlob, this.dKey)
      console.log(blob)
      let text = await blob.text()
      console.log(text)
      this.metadata = JSON.parse(text)
    },
    async getFilesList() {
      let files = await getLinks(this.$route.params.cid)
      // TODO: do something when no metadata found
      this.files = files.filter(
        (f) => !(f.name == 'metadata.json.enc' || f.name == 'VERSION')
      )
    },
    resave(file, name) {
      saveFile(file, name)
    },
    downloadFile(index) {
      this.$set(this.files[index], 'progress', 0)
      getFileStream(
        this.$route.params.cid,
        this.files[index].name,
        this.updateProgress,
        index
      ).then((blob) => {
        this.$set(this.files[index], 'decrypting', true)
        console.log(blob)
        decryptBlob(blob, this.dKey)
          .then((decrypted) => {
            this.$set(this.files[index], 'decrypted', decrypted)
            saveFile(decrypted, this.metadata.files[this.files[index].name])
          })
          .finally(() => {
            this.$set(this.files[index], 'decrypting', false)
          })
      })
    },
    updateProgress(index, progress) {
      this.$set(this.files[index], 'progress', Number(progress.toFixed(2)))
    },
    saveLink() {
      let uploads = localStorage.getItem('unfile-uploads')
      if (uploads) {
        uploads = JSON.parse(uploads) || []
      }else{
        uploads = []
      }
      uploads.unshift({
        caption: this.metadata.caption || '',
        link: window.location.pathname + `?key=${this.dKey}`,
      })
      localStorage.setItem('unfile-uploads', JSON.stringify(uploads))
      this.saveText = 'Link Saved!'
    },
  },
  filters: {
    dateTime(val) {
      return new Date(val).toLocaleString()
    },
    formatSize: (val) => {
      return formatSize(val)
    },
  },
}
</script>
