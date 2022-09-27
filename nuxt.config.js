import pkg from './package.json'

export default {
  target: 'static',
  ssr: false,
  modern: 'client',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'UnFile',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Decentralized & encrypted free file storing and sharing built on Filecoin and IPFS with crypto tipping options',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://unfile.io/icon.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://unfile.io/icon.png',
      },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '512' },
      { hid: 'og:image:height', property: 'og:image:height', content: '512' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'UnFile logo' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      background_color: '#f3f4f6',
      theme_color: '#60a5fa',
      description:
        'Decentralized free file storing and sharing built on Filecoin and IPFS',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    clientVersion: pkg.version,
    paypalClientId: process.env.PAYPAL_CLIENT_ID
  },
  generate: {
    fallback: true,
  },
  sitemap: {
    hostname: 'https://unfile.io',
    gzip: true,
    exclude: ['/d', '/d/**'],
    routes: ['/donate', '/faq', '/paste'],
  },
}
