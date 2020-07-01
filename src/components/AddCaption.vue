<template>
  <section>
    <div class="canvas">
      <Generator
        ref="gen"
        :size="canvasSize"
        :caption="caption"
        :txt="txt"
        :logoUrl="logoUrl"
        :image="image"
        :crop="crop"
      />
    </div>

    <div class="inputs">
      <p class="logo-caption">
        <textarea id="caption" name="caption" type="text" v-model="caption" /><br />
        <label for="caption">Text</label>
      </p>
      <p class="settings">
        <label for="txt-mb">Abstand unten</label>
        <input type="range" min="1" max="15" name="txt-mb" id="txt-mb" v-model="txt.mb" />
        <label for="txt-txt-ml">Abstand links</label>
        <input type="range" min="1" max="15" name="txt-txt-ml" id="txt-txt-ml" v-model="txt.ml" />
        <label for="txt-gap">Abstand dazwischen</label>
        <input type="range" min="0" max="3" name="txt-gap" id="txt-gap" v-model="txt.gap" />
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
import { mapState } from "vuex";

import logoUrl from "../assets/logo-new-top.min.svg";
import { download } from "../util";

import Generator from "./GeneratorCanvas";

export default {
  name: "AddCaption",
  components: { Generator },
  props: {
    next: Function,
  },

  data: () => ({
    canvasSize: 1152,
    caption: "",
    logoUrl: logoUrl,
    txt: { mb: 4, ml: 3, gap: 2 },
  }),

  computed: {
    ...mapState({
      image: "image",
      crop: "cropValues",
    }),
  },

  methods: {
    async save() {
      let jpgBlob = await this.$refs.gen.getBlob();
      let dataUrl = URL.createObjectURL(jpgBlob);
      download(dataUrl, "sharepic.jpg");
    },
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
