<template>
  <section>
    <div class="canvas">
      <canvas ref="canvas" :width="canvasSize" :height="canvasSize" class="preview"></canvas>
    </div>

    <div class="inputs">
      <p class="logo-caption">
        <textarea id="caption" name="caption" type="text" @keyup="updateCaption" /><br />
        <label for="caption">Text</label>
      </p>
      <p class="settings">
        <label for="txt-mb">Abstand unten </label>
        <input
          type="range"
          min="1"
          max="15"
          name="txt-mb"
          id="txt-mb"
          v-model="txtMb"
          @change="updateCaption()"
        />
        <label for="txt-txt-ml">Abstand links </label>
        <input
          type="range"
          min="1"
          max="15"
          name="txt-txt-ml"
          id="txt-txt-ml"
          v-model="txtMl"
          @change="updateCaption()"
        />
        <label for="txt-gap">Abstand dazwischen </label>
        <input
          type="range"
          min="0"
          max="3"
          name="txt-gap"
          id="txt-gap"
          v-model="txtGap"
          @change="updateCaption()"
        />
      </p>
      <p class="last">
        <button type="button" class="btn primary" @click="save">
          Speichern
        </button>
        <button type="button" class="btn secondary restart" @click="next">
          Noch eins machen
        </button>
      </p>
    </div>
  </section>
</template>

<script>
import logoUrl from "../assets/logo-new-top.svg";
import { download } from "../util";

export default {
  name: "AddCaption",
  props: {
    next: Function,
  },
  data: () => ({
    caption: "",
    canvasSize: 1152,
    logo: null,
    txtMb: 4,
    txtMl: 3,
    txtGap: 2,
  }),
  methods: {
    updateCaption(e) {
      this.caption = e ? e.target.value : this.caption;

      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");

      // projekct the cropped background image on the canvas
      let { x, y, width, height } = this.$store.state.cropValues;
      let targetW = this.canvasSize,
        targetH = this.canvasSize,
        image = this.$store.state.image;
      ctx.drawImage(image, x, y, width, height, 0, 0, targetW, targetH);

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
      let fontSize = this.canvasSize / 12;
      ctx.font = `${fontSize}px Amaranth`;
      ctx.strokeStyle = "black";
      ctx.lineWidth = fontSize / 8;
      ctx.fillStyle = "white";

      // draw text outline and filling
      let lines = this.caption.split("\n");
      let grid = fontSize / 4;
      for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
        let gapHeight = grid * this.txtGap;
        let targetY = targetH - this.txtMb * grid - (fontSize + gapHeight) * (lines.length - 1 - i);
        let targetX = grid * this.txtMl;
        ctx.strokeText(text, targetX, targetY);
        ctx.fillText(text, targetX, targetY);
      }
    },
    save() {
      let canvas = this.$refs.canvas;
      canvas.toBlob(
        blob => {
          let dataUrl = URL.createObjectURL(blob);
          download(dataUrl, "sharepic.jpg");
        },
        "image/jpeg",
        0.8,
      );
    },
  },
  mounted() {
    this.logo = new Image();
    this.logo.src = logoUrl;
    this.logo.addEventListener("load", () => this.updateCaption());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  margin: 3rem 1rem;
  gap: 2rem;

  @media screen and (min-width: 960px) {
    flex-direction: row;
  }
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

.restart {
  margin-left: 2rem;
}

.settings {
  display: grid;
  gap: 1rem;
  text-align: right;
  grid-template-columns: 2fr 3fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: 2fr 3fr 2fr 3fr;
  }
}

.inputs {
  display: flex;
  flex-direction: column;
}
</style>
