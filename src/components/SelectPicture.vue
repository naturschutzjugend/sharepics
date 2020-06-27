<template>
  <form @submit.prevent="next">
    <input
      type="file"
      class="hidden"
      name="upload-pic"
      id="upload-pic"
      @change="selectFile"
      accept="image/jpeg,image/png,image/webp"
    />
    <template v-if="!fileSelected">
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
      <p v-if="fileSelected">
        <Croppr
          :src="fileObj"
          alt="selected image"
          className="preview"
          @cropEnd="$store.commit('SET_CROP_VALUES', $event)"
          @load="$store.commit('IMAGE_LOADED', $event)"
        />
      </p>
      <p><button type="submit" class="btn primary">Bild verwenden</button></p>
    </template>
  </form>
</template>

<script>
import Croppr from "./Croppr";

export default {
  name: "HelloWorld",
  components: { Croppr },
  data: () => ({
    fileSelected: null
  }),
  computed: {
    fileObj() {
      return URL.createObjectURL(this.fileSelected);
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
<style scoped lang="scss"></style>
