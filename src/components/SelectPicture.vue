<template>
  <section>
    <input
      type="file"
      class="hidden"
      name="upload-pic"
      id="upload-pic"
      @change="selectFile"
      accept="image/jpeg,image/png,image/webp"
    />
    <template v-if="fileSelected === null">
      <p>Bitte wähle ein Foto.</p>
      <p>
        <label class="btn secondary" for="upload-pic">
          Foto wählen
        </label>
      </p>
    </template>
    <template v-else>
      <p>
        <span>Wähle einen Ausschnitt oder ein </span>
        <label class="btn secondary" for="upload-pic">
          anderes Foto
        </label>
      </p>
      <p>
        <Croppr
          :src="fileObj"
          alt="selected image"
          className="preview"
          @cropEnd="$store.commit('SET_CROP_VALUES', $event)"
          @load="$store.commit('IMAGE_LOADED', $event)"
        />
      </p>
      <p id="bottom">
        <button type="button" class="btn primary" @click="next">
          Bild verwenden
        </button>
      </p>
    </template>
    <a class="to-bottom" href="#bottom"></a>
  </section>
</template>

<script>
// TODO: keyboard focus for label button
import Croppr from "./Croppr";

export default {
  name: "SelectPicture",
  components: { Croppr },
  data: () => ({
    fileSelected: null
  }),
  computed: {
    fileObj() {
      return this.fileSelected && URL.createObjectURL(this.fileSelected);
    }
  },
  methods: {
    selectFile(e) {
      this.fileSelected = e.target.files[0];
    }
  },
  props: {
    next: Function
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes fade-bottomlink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.to-bottom {
  opacity: 0;
  animation: fade-bottomlink 0.5s 1s forwards;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: block;
  width: 2rem;
  height: 2rem;
  background: var(--primary);
  border-radius: 0.25rem;
  z-index: 9999;

  &::after {
    position: absolute;
    left: 0.55rem;
    top: 0.35rem;
    content: " ";
    width: 0.75rem;
    height: 0.75rem;
    border-right: 0.125rem solid white;
    border-bottom: 0.125rem solid white;
    transform: rotate(45deg);
  }

  @media screen and (min-width: 36rem) {
    display: none;
  }
}
</style>
