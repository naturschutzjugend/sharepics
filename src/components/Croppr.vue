<template>
  <img v-if="src" :src="src" :alt="alt" :class="className" @load="load" />
</template>

<script>
import Croppr from "croppr";
import "croppr/dist/croppr.css";

export default {
  name: "HelloWorld",
  data: () => ({
    croppr: null
  }),
  props: {
    alt: String,
    className: String,
    src: String
  },
  methods: {
    load(e) {
      if (this.croppr === null) {
        this.croppr = new Croppr(e.target, {
          aspectRatio: 1,
          onCropEnd: val => this.$emit("cropEnd", val)
        });
      } else {
        this.croppr.setImage(e.target.src);
      }

      this.$emit("cropEnd", this.croppr.getValue());
      this.$emit("load", e.target);
    }
  }
};
</script>
