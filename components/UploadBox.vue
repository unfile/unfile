<template>
  <div
    class="
      sm:max-w-lg
      w-full
      p-10
      bg-white
      rounded-xl
      z-10
      shadow-xl
      dark:bg-gray-800
    "
  >
    <div class="text-center" v-if="selectedFiles.length < 1 && !encrypting">
      <h1 class="mb-5 text-sm text-gray-400 dark:text-gray-200">
        Your files will be encrypted locally on your device then sent to a
        decentralized storage.
      </h1>
    </div>
    <form class="space-y-3">
      <div class="grid grid-cols-1 space-y-2">
        <div class="flex items-center justify-center w-full">
          <transition
            enter-active-class="transition-all delay-300 duration-300 ease"
            leave-active-class="transition-all duration-300 ease"
            enter-class="opacity-0 transform scale-0"
            enter-to-class="opacity-100 transform scale-100"
            leave-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-0"
          >
            <div
              id="drop-area"
              class="
                flex flex-col
                rounded-lg
                border-4 border-dashed
                dark:border-gray-500
                w-full
                h-64
                p-9
                group
                text-center
              "
              @dragenter.prevent="highlight"
              @dragover.prevent="highlight"
              @dragleave.prevent="unhighlight"
              @drop.prevent="
                unhighlight($event)
                fileDropped($event)
              "
              ref="dropArea"
              v-show="!encrypting && selectedFiles.length < 1"
            >
              <div
                class="
                  h-full
                  w-full
                  text-center
                  flex flex-col
                  items-center
                  justify-center
                "
              >
                <CloudIcon class="w-20 h-20 text-blue-300 animate-bounce" />
                <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10"></div>
                <p class="pointer-none text-gray-500 dark:text-gray-400">
                  <span class="font-semibold"
                    ><span class="text-sm">Drag and drop</span> files here
                    <br />
                    or<br
                  /></span>
                  <label
                    for="file-input"
                    class="
                      w-full
                      flex
                      justify-center
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
                      p-2
                      rounded-lg
                      mt-2
                    "
                    >Click to Select</label
                  >
                  <input
                    type="file"
                    id="file-input"
                    class="hidden"
                    @change="fileSelected"
                    multiple
                  />
                </p>
              </div>
            </div>
          </transition>
          <transition
            enter-active-class="transition-all delay-300 duration-300 ease"
            leave-active-class="transition-all duration-300 ease"
            enter-class="opacity-0 transform scale-0"
            enter-to-class="opacity-100 transform scale-100"
            leave-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-0"
          >
            <div
              class="
                flex flex-col
                rounded-lg
                w-full
                h-64
                group
                text-center
                justify-around
                items-center
              "
              v-show="encrypting || selectedFiles.length > 0"
            >
              <LockIcon
                v-if="
                  selectedFiles.length == Object.keys(encryptedFiles).length &&
                  !encrypting
                "
                class="text-green-500 h-30 w-30 min-w-min dark:text-green-400"
              />
              <div
                v-else
                class="text-center flex flex-col justify-around items-center"
              >
                <h1
                  class="
                    font-bold
                    text-lg
                    mb-3
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  Encrypting<span v-if="selectedFiles.length > 0"
                    >&nbsp;{{ Object.keys(encryptedFiles).length }}/{{
                      selectedFiles.length
                    }}</span
                  ><span v-else>...</span>
                </h1>
                <Spinner />
              </div>
              <h1
                class="
                  font-semibold
                  text-center
                  my-3
                  text-gray-400
                  dark:text-gray-200
                "
              >
                Total size:&nbsp;<span v-if="totalSize > 0">{{
                  totalSize | formatSize
                }}</span>
              </h1>
            </div>
          </transition>
        </div>
        <transition
          enter-active-class="transition-all delay-500 duration-300 ease-out"
          leave-active-class="transition-all delay-500 duration-300 ease-in"
          enter-class="opacity-0 transform scale-0"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-0"
        >
          <div
            class="text-center mt-5"
            v-if="encrypting || selectedFiles.length > 0"
          >
            <h4
              class="
                text-sm
                font-bold
                text-gray-400
                tracking-wide
                dark:text-gray-200
              "
            >
              Decryption Key:
            </h4>
            <h2
              class="
                text-sm
                font-bold
                text-red-500
                tracking-widest
                my-3
                select-all
                dark:text-red-400
              "
              :class="{ 'filter blur-sm': blurPassword }"
              @mouseenter="blurPassword = false"
              @mouseleave="blurPassword = true"
            >
              {{ password }}
            </h2>
            <p class="text-sm text-gray-400 dark:text-gray-200">
              Your files cannot be opened without this key
            </p>
          </div>
        </transition>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <label
          class="
            text-sm
            font-bold
            text-gray-500
            tracking-wide
            dark:text-gray-300
          "
          >Caption</label
        >
        <input
          class="
            text-base
            p-2
            border border-gray-300
            rounded-lg
            outline-none
            dark:bg-gray-800 dark:text-white dark:border-gray-500
          "
          type="text"
          placeholder="Optional"
          v-model="caption"
        />
        <button
          class="p-2 text-blue-400 font-semibold dark:text-blue-300"
          v-if="!showAddress"
          @click="showAddress = true"
        >
          + Add Bitcoin or Monero tipping address
        </button>
        <label
          class="
            text-sm
            font-bold
            text-gray-500
            tracking-wide
            dark:text-gray-300
          "
          v-if="showAddress"
          >Wallet address or LNUrl to receive tips</label
        >
        <WalletInput v-if="showAddress" @validated="setAddress" />
      </div>
      <div>
        <button
          :disabled="selectedFiles.length < 1 || encrypting || uploading"
          :class="{
            'bg-gray-100 text-gray-400 cursor-not-allowed	shadow dark:bg-gray-600':
              selectedFiles.length < 1 || encrypting || uploading,
            'bg-blue-500 text-gray-100 focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300':
              !(selectedFiles.length < 1 || encrypting || uploading),
          }"
          class="
            mt-5
            w-full
            flex
            justify-center
            p-4
            tracking-wide
            font-semibold
            rounded-xl
          "
          @click.prevent="uploadClicked"
        >
          Upload
        </button>
      </div>
    </form>
    <Modal :message="errorMsg" v-show="errorMsg" @ok="errorMsg = ''" />
  </div>
</template>
<script>
import { Password, encryptBlob } from '~/utils/encryption'
import { formatSize, MAXSIZE, MAX_TOTAL_SIZE } from '~/utils/helpers'
import Modal from './Modal.vue'
export default {
  components: { Modal },
  props: {
    password: {
      type: String,
    },
  },
  filters: {
    formatSize: (val) => {
      return formatSize(val)
    },
  },
  data() {
    return {
      encrypting: false,
      blurPassword: true,
      caption: '',
      uploading: false,
      showAddress: false,
      address: '',
      selectedFiles: [],
      encryptedFiles: {},
      totalSize: 0,
      errorMsg: '',
      currency: null,
    }
  },
  methods: {
    setAddress(address, currency) {
      this.address = address
      this.currency = currency
    },
    highlight(e) {
      // e.preventDefault()
      this.$refs.dropArea.classList.remove('dark:border-gray-500')
      this.$refs.dropArea.classList.add('border-red-500')
      this.$refs.dropArea.classList.add('dark:border-red-400')
    },
    unhighlight(e) {
      // e.preventDefault()
      this.$refs.dropArea.classList.remove('border-red-500')
      this.$refs.dropArea.classList.remove('dark:border-red-400')
      this.$refs.dropArea.classList.add('dark:border-gray-500')
    },
    reset() {
      this.selectedFiles = []
      this.encryptedFiles = {}
      this.totalSize = 0
      this.encrypting = false
    },
    checkFiles(files) {
      let total = 0
      let bufArray = []
      bufArray.push(new Uint8Array(1 * 1024 * 1024)) // 1 mb for metadata

      for (const file of files) {
        try {
          let test = new Uint8Array(file.size)
          bufArray.push(test)
        } catch (e) {
          this.errorMsg = `Files are larger than what your browser memory allows to encrypt, please try another browser or free some memory.`
          this.reset()
          return false
        }
        if (file.size > MAXSIZE) {
          this.errorMsg = `The file ${
            file.fullPath || file.name
          } is larger than the allowed single file size, please split it into parts.`
          this.reset()
          return false
        }
        total += file.size
        if (total > MAX_TOTAL_SIZE) {
          this.errorMsg = `Total files size is larger than allowed, please remove some files and consider splitting the uploads to multiple parts.`
          this.reset()
          return false
        }
      }
      return true
    },
    async fileSelected(e) {
      if (e.target.files.length < 1) {
        console.log('nothing selected')
        return
      }
      console.log(e.target.files)
      this.selectedFiles = e.target.files
      await this.handleFileSelected()
    },
    async fileDropped(e) {
      if (!e.dataTransfer) {
        return
      }

      // Convert the FileList to an Array
      // This is necessary for IE11
      let files = []
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        files[i] = e.dataTransfer.files[i]
      }

      // Even if it's a folder, files.length will contain the folders.
      if (files.length) {
        this.encrypting = true
        this.selectedFiles = []
        let results = []
        let { items } = e.dataTransfer
        if (items && items.length && items[0].webkitGetAsEntry != null) {
          // The browser supports dropping of folders, so handle items instead of files
          results = results.concat(await this._addFilesFromItems(items))
        } else {
          for (const f of files) {
            results.push(f)
          }
        }
        this.selectedFiles = results
        await this.handleFileSelected()
      }
    },
    traverseDirectory(entry) {
      const reader = entry.createReader()
      // Resolved when the entire directory is traversed
      return new Promise((resolve, reject) => {
        const iterationAttempts = []
        var readEntries = () => {
          // According to the FileSystem API spec, readEntries() must be called until
          // it calls the callback with an empty array.  Seriously??
          reader.readEntries(
            (entries) => {
              if (!entries.length) {
                // Done iterating this particular directory
                resolve(Promise.all(iterationAttempts))
              } else {
                // Add a list of promises for each directory entry.  If the entry is itself
                // a directory, then that promise won't resolve until it is fully traversed.
                iterationAttempts.push(
                  Promise.all(
                    entries.map((ientry) => {
                      if (ientry.isFile) {
                        // DO SOMETHING WITH FILES
                        return ientry
                      }
                      // DO SOMETHING WITH DIRECTORIES
                      return this.traverseDirectory(ientry)
                    })
                  )
                )
                // Try calling readEntries() again for the same dir, according to spec
                readEntries()
              }
            },
            (error) => reject(error)
          )
        }
        readEntries()
      })
    },
    async getFile(fileEntry) {
      try {
        return await new Promise((resolve, reject) =>
          fileEntry.file(resolve, reject)
        )
      } catch (err) {
        console.log(err)
      }
    },
    async flattenEntries(a) {
      let gathered = []
      for (let i of a) {
        if (i.isFile) {
          let f = await this.getFile(i)
          f.fullPath = i.fullPath
          gathered.push(f)
        } else {
          gathered = gathered.concat(await this.flattenEntries(i))
        }
      }
      return gathered
    },
    async _getItem(item) {
      let result = []
      var entry
      if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
        if (entry.isFile) {
          result.push(item.getAsFile())
        } else if (entry.isDirectory) {
          // Append all files from that directory to files
          const res = await this.traverseDirectory(entry)
          for (let entry of res) {
            if (entry instanceof Array) {
              result = result.concat(await this.flattenEntries(entry))
            } else {
              result.push(entry)
            }
          }
        }
      } else if (item.getAsFile != null) {
        if (item.kind == null || item.kind === 'file') {
          result.push(item.getAsFile())
        }
      }
      return result
    },
    async _addFilesFromItems(items) {
      let result = []
      let requests = []
      for (let item of items) {
        requests.push(this._getItem(item))
      }
      let responses = await Promise.all(requests)
      for (let r of responses) {
        result = result.concat(r)
      }
      console.log(result)
      return result
    },
    async encryptAndEmit(file, password, index) {
      const obj = await encryptBlob(file, password)
      this.encryptedFiles[index] = obj
      this.totalSize += obj.file.size
    },
    async handleFileSelected() {
      if (this.selectedFiles.length < 1) {
        console.log('no files selected')
        this.encrypting = false
        return
      }
      if (!this.checkFiles(this.selectedFiles)) {
        return
      }
      const password = Password.generate(16)
      this.$emit('passwordCreated', password)
      this.encrypting = true
      this.encryptedFiles = {}
      for (var i = 0; i < this.selectedFiles.length; i++) {
        try {
          await this.encryptAndEmit(this.selectedFiles[i], password, i)
        } catch (e) {
          this.errorMsg = `Unable to encrypt file ${
            this.selectedFiles[i].fullPath || this.selectedFiles[i].name
          }, please make sure you have permissions to read the file.`
          this.reset()
          break
        }
      }
      console.log(this.encryptedFiles)
      this.encrypting = false
    },
    uploadClicked() {
      if (Object.keys(this.encryptedFiles).length == 0) {
        console.log('no file selected')
        return
      }
      if (this.address && !this.currency) {
        this.errorMsg = `Your tipping address is not recognized a valid format, please add a correct BTC or XMR address.`
        return
      }
      this.uploading = true
      let addresses = []
      if (this.address && this.currency) {
        addresses.push({ address: this.address, currency: this.currency })
      }
      this.$emit('upload', {
        files: this.encryptedFiles,
        password: this.password,
        caption: this.caption,
        addresses: addresses,
      })
    },
  },
}
</script>
<style>
.has-mask {
  position: absolute;
  clip: rect(10px, 150px, 130px, 10px);
}
</style>