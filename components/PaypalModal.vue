<template>
    <div class="h-screen w-full fixed left-0 top-0 overflow-y-auto">
        <!-- modal -->
        <div class="flex relative justify-center items-center z-50 w-full h-full">
            <div
                class="bg-white rounded shadow-lg w-10/12 lg:w-1/2 flex flex-col justify-center items-center py-10 my-20 relative"
            >
                <div id="smart-button-container">
                    <div style="text-align: center">
                        <label for="description" class="">Message</label>
                        <input
                            type="text"
                            name="descriptionInput"
                            id="description"
                            maxlength="127"
                            value
                            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 outline-none"
                        />
                    </div>
                    <p
                        id="descriptionError"
                        style="visibility: hidden; color:red; text-align: center;"
                    >Please enter a description</p>
                    <div style="text-align: center">
                        <label for="amount" class="">Donation Amount</label>
                        <input
                            name="amountInput"
                            type="number"
                            id="amount"
                            value
                            class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 outline-none mb-5"
                        />
                        <span class="">USD</span>
                    </div>
                    <p
                        id="priceLabelError"
                        style="visibility: hidden; color:red; text-align: center;"
                    >Please enter a price</p>
                    <div id="invoiceidDiv" style="text-align: center; display: none;">
                        <label for="invoiceid"></label>
                        <input name="invoiceid" maxlength="127" type="text" id="invoiceid" value />
                    </div>
                    <p
                        id="invoiceidError"
                        style="visibility: hidden; color:red; text-align: center;"
                    >Please enter an Invoice ID</p>
                    <div
                        style="text-align: center; margin-top: 0.625rem;"
                        id="paypal-button-container"
                    ></div>
                </div>
                <div class="absolute top-0 right-0 justify-center items-center w-100">
                    <button
                        class="bg-transparent hover:bg-red-600 px-3 pb-1 hover:text-white text-2xl"
                        @click="close"
                    >&times;</button>
                </div>
            </div>
        </div>
        
        <div
            class="h-screen w-full absolute left-0 top-0 bg-black bg-opacity-50 z-10 dark:bg-gray-500 dark:bg-opacity-70"
        ></div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.initPayPalButton()
    },
    methods: {
        close() {
            this.$emit('close')
        },
        initPayPalButton() {
            console.log('pay button')
            if (!window.paypal) {
                setTimeout(() => {
                    this.initPayPalButton()
                }, 500)
                return
            }
            var description = document.querySelector('#smart-button-container #description');
            var amount = document.querySelector('#smart-button-container #amount');
            var descriptionError = document.querySelector('#smart-button-container #descriptionError');
            var priceError = document.querySelector('#smart-button-container #priceLabelError');
            var invoiceid = document.querySelector('#smart-button-container #invoiceid');
            var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
            var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');

            var elArr = [description, amount];

            if (invoiceidDiv.firstChild.innerHTML.length > 1) {
                invoiceidDiv.style.display = "block";
            }

            var purchase_units = [];
            purchase_units[0] = {};
            purchase_units[0].amount = {};

            function validate(event) {
                return event.value.length > 0;
            }
            console.log(window.paypal)
            window.paypal.Buttons({
                style: {
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                    layout: 'vertical',

                },

                onInit: function (data, actions) {
                    actions.disable();

                    if (invoiceidDiv.style.display === "block") {
                        elArr.push(invoiceid);
                    }

                    elArr.forEach(function (item) {
                        item.addEventListener('keyup', function (event) {
                            var result = elArr.every(validate);
                            if (result) {
                                actions.enable();
                            } else {
                                actions.disable();
                            }
                        });
                    });
                },

                onClick: function () {
                    if (description.value.length < 1) {
                        descriptionError.style.visibility = "visible";
                    } else {
                        descriptionError.style.visibility = "hidden";
                    }

                    if (amount.value.length < 1) {
                        priceError.style.visibility = "visible";
                    } else {
                        priceError.style.visibility = "hidden";
                    }

                    if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
                        invoiceidError.style.visibility = "visible";
                    } else {
                        invoiceidError.style.visibility = "hidden";
                    }

                    purchase_units[0].description = description.value;
                    purchase_units[0].amount.value = amount.value;

                    if (invoiceid.value !== '') {
                        purchase_units[0].invoice_id = invoiceid.value;
                    }
                },

                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: purchase_units,
                        application_context: {
                            brand_name: "UnFile",
                            shipping_preference: "NO_SHIPPING"
                        }
                    });
                },

                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (orderData) {

                        // Full available details
                        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                        // Show a success message within this page, e.g.
                        const element = document.getElementById('smart-button-container');
                        element.innerHTML = '';
                        element.innerHTML = '<h3 class="text-green-500 text-2xl">Thank you for your payment!</h3>';

                        // Or go to another URL:  actions.redirect('thank_you.html');

                    });
                },

                onError: function (err) {
                    console.log(err);
                }
            }).render('#paypal-button-container');
        }
    }
}
</script>