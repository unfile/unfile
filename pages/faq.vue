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
    <div class="max-w-screen-lg w-full p-10 bg-white rounded-xl z-10 shadow-xl dark:bg-gray-800">
      <h1 class="text-center font-bold text-2xl dark:text-gray-100">FAQ</h1>
      <ul>
        <li class="mt-5 dark:text-gray-200"><b>Q:</b> Where are my files saved?</li>
        <li class="dark:text-gray-200">
          <b>A:</b> UnFile uses
          <a
            href="https://web3.storage/"
            target="_external"
            class="text-blue-500 dark:text-blue-300"
            >Web3.Storage</a
          >
          technology to store the files using
          <a
            href="https://filecoin.io/"
            target="_external"
            class="text-blue-500 dark:text-blue-300"
            >FileCoin</a
          >
          deals and distribute them using
          <a href="https://ipfs.io/" target="_external" class="text-blue-500 dark:text-blue-300"
            >IPFS</a
          >. Your files are distributed on a decentralized network making it
          censorship resistant. It's also <b>FREE</b>, opensource and unlimited.
        </li>
        <li class="mt-5 dark:text-gray-200"><b>Q:</b> Can you open my files?</li>
        <li class="dark:text-gray-200">
          <b>A:</b> No, Since the files get encrypted before they are uploaded,
          there is no way to open them without your key.
        </li>
        <li class="mt-5 dark:text-gray-200">
          <b>Q:</b> What kind of encryption is used to secure my files?
        </li>
        <li class="dark:text-gray-200">
          <b>A:</b> UnFile is using
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
            target="_external"
            class="text-blue-500 dark:text-blue-300"
            >WebCryptoAPI</a
          >
          to encrypt the files, each file is encrypted locally in your browser
          using AES-GCM algorithm.
        </li>
        <li class="mt-5 dark:text-gray-200">
          <b>Q:</b> What information is visible and not encrypted?
        </li>
        <li class="dark:text-gray-200">
          <b>A:</b> All file names are encrypted with the caption and any crypto
          payment address. The only visible information will be files sizes as
          well as the version of the uploader for future compatibility.
        </li>
        <li class="mt-5 dark:text-gray-200"><b>Q:</b> What is the size limit for upload?</li>
        <li class="dark:text-gray-200">
          <b>A:</b> Web3.Storage have a limit of 31 GiB for each content
          archive, this means the total size of files in a single upload cannot
          exceed that limit, This may be increased in the future. There is
          another limit for individiual file size since browsers cannot encrypt
          files larger than 2 GiB. If your file is larger than this you can
          split it into multiple parts using a zip archive or similar methods.
        </li>
        <li class="mt-5 dark:text-gray-200"><b>Q:</b> How does tipping work?</li>
        <li class="dark:text-gray-200">
          <b>A:</b> You type the address of the wallet where you wish to receive
          tips and a button will appear to the users with the QR code
          automatically generated. We currently support <b>BTC</b> and
          <b>XMR</b> as well as <b>LNUrl-pay</b> protocol. Let us know if you
          think more should be supported.
        </li>
        <li class="mt-5 dark:text-gray-200"><b>Q:</b> I have a suggestion, where do I send it?</li>
        <li class="dark:text-gray-200">
          <b>A:</b> Please write any feature requests or suggestion in our
          <a
            href="https://github.com/unfile/unfile"
            target="_external"
            class="text-blue-500 dark:text-blue-300"
            >GitHub repository</a
          >
        </li>
        <li class="mt-5 dark:text-gray-200">
          <b>Q:</b> Are there any restrictions on what to upload?
        </li>
        <li class="dark:text-gray-200">
          <b>A:</b> There are none, UnFile is free to use and modify to suit
          your needs. However, please don't use it in anything considered
          immoral.
        </li>
      </ul>
      <hr class="w-full mt-5 dark:border-gray-400" />
      <div class="flex flex-wrap justify-center items-center mt-5">
        <h1 class="text-xl text-center font-semibold text-gray-600 w-full mb-3 dark:text-white">
          If you like this project and want to see more features added, consider
          tipping us using these methods
        </h1>
        <BitcoinButton address="bc1qmu6yj6e49wjvf6qgdcf98tmm48f4dxxajxqjga" />
        <LightningInvoiceButton />
        <MoneroButton
          address="898swoLtFZ3NqPAAVUpFwf9MVtnyy17MASvyhLstFYDmZ5C4rvSyGSiXvRny5uic2jRsFqWsdfmHGPmapVMhHizL2pWhyEb"
        />
        <PaypalButton />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `UnFile - FAQ`,
    }
  },
}
</script>

<style>
</style>