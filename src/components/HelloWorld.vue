<template>
  <section>
    <p>Herzlich willkommen zum NAJU-Sharepic-Generator.</p>
    <button type="button" class="btn primary" @click="next">
      Sharepic erstellen
    </button>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    next: Function,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
