import { storeFiles } from '~/utils/storage'

export default {
    data() {
        return {
            showProgress: false,
            password: '',
            pct: 0,
            cid: '',
            caption: ''
        }
    },
    methods: {
        async startUpload(data, isText) {
            this.showProgress = true
            this.caption = data.caption || ''
            const cid = await storeFiles(
                data.files,
                data.password,
                data.caption,
                data.addresses,
                this.$config.clientVersion,
                this.progressCallback,
                isText
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
    }
}