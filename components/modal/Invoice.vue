<script setup>
import QRCodeStyling from 'qr-code-styling';

const props = defineProps({
  lightningInvoice: {
    type: String,
    default: 'default lightningInvoice string'
  }
});

/**
 * https://www.npmjs.com/package/qr-code-styling
 * @type {QRCodeStyling}
 */
const qrCode = new QRCodeStyling({
  width: 400,
  height: 400,
  type: "svg",
  data: props.lightningInvoice,
  //image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
  },
  dotsOptions: {
    color: "#000000",
    type: "rounded"
  },
  backgroundOptions: {
    color: "#e9ebee",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  },
  cornersSquareOptions: {},
  cornersDotOptions: {}
});

onMounted(() => {
  // Generate QR code from lightningInvoice property
  qrCode.append(document.getElementById('canvas'));
  // @todo set listener if invoice has been paid
});
</script>

<template>
  <div class="text-white break-all">
    <span class="block mb-4 text-center text-4xl">
      2100 sats
    </span>
    <div id="canvas"></div>
    <code class="text-sm mt-4 block">{{ lightningInvoice }}</code>
  </div>
</template>

<style scoped>

</style>