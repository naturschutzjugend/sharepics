<template>
  <section>
    <p>
      <canvas
        ref="canvas"
        :width="canvasSize"
        :height="canvasSize"
        class="preview"
      ></canvas>
    </p>

    <p class="logo-caption">
      <textarea
        id="caption"
        name="caption"
        type="text"
        @keyup="updateCaption"
      /><br />
      <label for="caption">Text</label>
    </p>
    <!-- <p class="settings">
      <label for="txt-mb">Abstand unten </label>
      <input type="text" name="txt-mb" id="txt-mb" v-model="txtMb" />
      <label for="txt-txt-ml">Abstand links </label>
      <input type="text" name="txt-txt-ml" id="txt-txt-ml" v-model="txtMl" />
      <label for="txt-gap">Abstand dazwischen </label>
      <input type="text" name="txt-gap" id="txt-gap" v-model="txtGap" />
    </p> -->
    <p class="last">
      <a download="sharepic.png" class="btn primary" @click="save">Speichern</a>
      <button type="button" class="btn secondary restart" @click="next">
        Noch eins machen
      </button>
    </p>
  </section>
</template>

<script>
import logoUrl from "../assets/logo-new-top.svg";

export default {
  name: "HelloWorld",
  props: {
    next: Function
  },
  data: () => ({
    caption: "",
    canvasSize: 768,
    logo: null
  }),
  methods: {
    updateCaption(e) {
      this.caption = e ? e.target.value : "";

      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");

      let { x, y, width, height } = this.$store.state.cropValues;
      let targetW = this.canvasSize,
        targetH = this.canvasSize,
        image = this.$store.state.image;
      ctx.drawImage(image, x, y, width, height, 0, 0, targetW, targetH);

      let logo = this.logo;
      let aspect = logo.naturalWidth / logo.naturalHeight;
      let logoW = targetW / 4;
      let logoH = logoW / aspect;
      ctx.drawImage(logo, targetW - logoW - (8 * 160) / 23, -1, logoW, logoH);

      ctx.font = "64px Amaranth";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 8;
      ctx.fillStyle = "white";
      let lines = this.caption.split("\n");
      for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
        let targetY = targetH - 64 - (16 + 64) * (lines.length - 1 - i);
        ctx.strokeText(text, 32, targetY);
        ctx.fillText(text, 32, targetY);
      }
    },
    save(e) {
      let link = e.target;
      let canvas = this.$refs.canvas;
      let data = canvas
        .toDataURL("image/jpeg", 0.8)
        .replace("image/jpeg", "image/octet-stream");
      // data = URL.createObjectURL(data);
      link.setAttribute("href", data);
    }
  },
  mounted() {
    this.logo = new Image();
    this.logo.src = logoUrl;
    this.logo.addEventListener("load", () => this.updateCaption());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
}

.logo-caption {
  text-align: left;
  width: 100%;

  textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--blue);
    border-radius: 0.25rem;
    height: 6rem;
    font-family: "Source Sans Pro", Helvetica, sans-serif;
    padding: 0.5rem;
  }
}

.last {
  margin-bottom: 4rem;
}

.restart {
  margin-left: 2rem;
}
</style>
