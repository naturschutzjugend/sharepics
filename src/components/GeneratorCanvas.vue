<template>
  <canvas ref="canvas" :width="size" :height="size" class="preview"></canvas>
</template>

<script>
export default {
  name: "GeneratorCanvas",
  props: {
    size: Number,
    caption: String,
    logoUrl: String,
    txt: Object,
    image: Image,
    crop: Object,
  },

  data: () => ({
    logo: null,
  }),

  mounted() {
    this.logo = new Image();
    this.logo.addEventListener("load", () => this.updateCaption(this.caption, this.txt));
    this.logo.src = this.logoUrl;
  },

  methods: {
    updateCaption(caption, txt) {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");

      // project the cropped background image on the canvas
      let { x, y, width, height } = this.crop;
      let targetW = this.size,
        targetH = this.size;
      ctx.drawImage(this.image, x, y, width, height, 0, 0, targetW, targetH);

      // put the logo on the canvas
      const logoRelToW = 0.25;
      const najuNSize = 25;
      let logo = this.logo;
      let aspect = logo.naturalWidth / logo.naturalHeight;
      let logoW = targetW * logoRelToW;
      let logoH = logoW / aspect;
      let najuNSizeRelative = (najuNSize / logo.naturalWidth) * logoW;
      let logoPosX = targetW - logoW - 1 * najuNSizeRelative;
      ctx.drawImage(logo, logoPosX, -1, logoW, logoH);

      // text styles
      let fontSize = this.size / 12;
      ctx.font = `${fontSize}px Amaranth`;
      ctx.strokeStyle = "black";
      ctx.lineWidth = fontSize / 8;
      ctx.fillStyle = "white";

      // draw text outline and filling
      let lines = caption.split("\n");
      let grid = fontSize / 4;
      for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
        let gapHeight = grid * txt.gap;
        let targetY = targetH - txt.mb * grid - (fontSize + gapHeight) * (lines.length - 1 - i);
        let targetX = grid * txt.ml;
        ctx.strokeText(text, targetX, targetY);
        ctx.fillText(text, targetX, targetY);
      }
    },

    getBlob() {
      let canvas = this.$refs.canvas;
      return new Promise(resolve => canvas.toBlob(blob => resolve(blob), "image/jpeg", 0.8));
    },
  },

  watch: {
    caption(newVal) {
      this.updateCaption(newVal, this.txt);
    },
    txt: {
      handler(newVal) {
        this.updateCaption(this.caption, newVal);
      },
      deep: true,
    },
  },
};
</script>
