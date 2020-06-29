<template>
  <section>
    <p>
      <svg style="width: 35rem; height: 35rem;">
        <defs>
          <clipPath id="imageClip">
            <rect x="0" y="0" :width="crop.width" :height="crop.height" />
          </clipPath>
        </defs>
        <g>
          <image
            :xlink:href="imageSrc"
            clip-path="url(#imageClip)"
            :width="crop.width"
            :height="crop.height"
          />
        </g>
      </svg>
    </p>

    <p>
      <label for="caption">Text: </label>
      <input id="caption" name="caption" type="text" @keypress="updateCaption" />
    </p>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    next: Function,
  },
  data: () => ({
    caption: "",
    canvasSize: 768,
  }),
  computed: {
    imageSrc() {
      return this.$store.state.image.src;
    },
    crop() {
      return this.$store.state.cropValues;
    },
  },

  methods: {
    updateCaption(e) {
      this.caption = e ? e.target.value : "";
      // let canvas = this.$refs.canvas;
      // let ctx = canvas.getContext("2d");
    },
  },
  mounted() {
    this.updateCaption();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
}
</style>
