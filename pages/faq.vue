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
      <h1 class="text-center font-bold text-2xl">FAQ</h1>
      <ul>
        <li class="mt-5"><b>Q:</b> Where are my files saved?</li>
        <li>
          <b>A:</b> UnFile uses
          <a
            href="https://web3.storage/"
            target="_external"
            class="text-blue-500"
            >Web3.Storage</a
          >
          technology to store the files using
          <a
            href="https://filecoin.io/"
            target="_external"
            class="text-blue-500"
            >FileCoin</a
          >
          deals and distribute them using
          <a href="https://ipfs.io/" target="_external" class="text-blue-500"
            >IPFS</a
          >. Your files are distributed on a decentralized network making it
          censorship resistant. It's also <b>FREE</b> and unlimited.
        </li>
        <li class="mt-5"><b>Q:</b> Can you open my files?</li>
        <li>
          <b>A:</b> No, Since the files get encrypted before they are uploaded,
          there is no way to open them without your key.
        </li>
        <li class="mt-5">
          <b>Q:</b> What kind of encryption is used to secure my files?
        </li>
        <li>
          <b>A:</b> UnFile is using
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
            target="_external"
            class="text-blue-500"
            >WebCryptoAPI</a
          >
          to encrypt the files, each file is encrypted locally in your browser
          using AES-GCM algorithm.
        </li>
        <li class="mt-5">
          <b>Q:</b> What information is visible and not encrypted?
        </li>
        <li>
          <b>A:</b> All file names are encrypted with the caption and any crypto
          payment address. The only visible information will be files sizes as
          well as the version of the uploader for future compatibility.
        </li>
        <li class="mt-5"><b>Q:</b> What is the size limit for upload?</li>
        <li>
          <b>A:</b> Web3.Storage have a limit of 32 GiB for each content
          archive, this means the total size of files in a single upload cannot exceed that
          limit, This may be increased in the future. There is another limit for
          individiual file size since browsers cannot encrypt files larger than
          2 GiB. If your file is larger than this you can split it into multiple
          parts using a zip archive or similar methods.
        </li>
        <li class="mt-5">
          <b>Q:</b> Are there any restrictions on what to upload?
        </li>
        <li>
          <b>A:</b> There are none, UnFile is free to use and modify to suit your
          needs. However, please don't use it in anything considered immoral.
        </li>
      </ul>
      <div class="flex flex-wrap justify-center items-center mt-5">
        <button
          @click="btcQR = true"
          class="
            m-3
            border-2 border-yellow-500
            text-yellow-500
            px-3
            py-2
            rounded-lg
            font-semibold
            text-lg
            focus:outline-none
            focus:shadow-outline
            hover:bg-yellow-500
            hover:border-yellow-500
            hover:text-white
            shadow-lg
            cursor-pointer
            transition
            ease-in
            duration-300
            flex
            justify-center
            items-center
          "
        >
          Donate Bitcoin&nbsp;<span
            class="bg-white w-8 h-8 rounded-full border-2 border-white"
            ><img src="@/assets/img/BTC.svg"
          /></span>
        </button>
        <button
          @click="xmrQR = true"
          class="
            m-3
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
            xmrbtn
          "
        >
          Donate Monero&nbsp;<span
            class="bg-white w-8 h-8 rounded-full border-2 border-white"
            ><img src="@/assets/img/XMR.svg"
          /></span>
        </button>
        <PaymentModal
          :address="'bc1qmu6yj6e49wjvf6qgdcf98tmm48f4dxxajxqjga'"
          :currency="'BTC'"
          @close="btcQR = false"
          v-if="btcQR"
          key="btc"
        />
        <PaymentModal
          :address="'898swoLtFZ3NqPAAVUpFwf9MVtnyy17MASvyhLstFYDmZ5C4rvSyGSiXvRny5uic2jRsFqWsdfmHGPmapVMhHizL2pWhyEb'"
          :currency="'XMR'"
          @close="xmrQR = false"
          v-if="xmrQR"
          key="xmr"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btcQR: false,
      xmrQR: false,
    }
  },
}
</script>

<style>
</style>