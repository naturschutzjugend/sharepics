<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <HelloWorld v-if="screen == 'HelloWorld'" :next="next" />
      <SelectPicture v-if="screen == 'SelectPicture'" :next="next" />
      <AddCaption v-if="screen == 'AddCaption'" :next="next" />
    </transition>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import SelectPicture from "./components/SelectPicture.vue";
import AddCaption from "./components/AddCaptionCanvas.vue";
import "typeface-amaranth";

export default {
  name: "App",
  data: () => ({
    screen: "HelloWorld",
    canvas: null
  }),
  components: {
    HelloWorld,
    SelectPicture,
    AddCaption
  },
  methods: {
    next() {
      switch (this.screen) {
        case "HelloWorld":
          this.screen = "SelectPicture";
          break;
        case "SelectPicture":
          this.screen = "AddCaption";
          break;
        case "AddCaption":
          this.screen = "SelectPicture";
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@mixin visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

#app {
  --blue: hsl(198, 87%, 38%);
  --indigo: hsl(254, 26%, 47%);
  --purple: hsl(293, 25%, 47%);
  --pink: hsl(332, 52%, 49%);
  --red: hsl(356, 72%, 49%);
  --orange: hsl(24, 79%, 58%);
  --yellow: hsl(57, 85%, 68%);
  --green: hsl(140, 52%, 32%);
  --lime: hsl(95, 39%, 43%);
  --teal: hsl(177, 96%, 35%);
  --cyan: hsl(191, 67%, 52%);

  --primary: var(--green);
  --secondary: var(--lime);
  --corporate: var(--red);

  font-family: "Source Sans Pro", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@mixin btn($colorname) {
  &.#{$colorname} {
    color: var(--#{$colorname});
    border-color: var(--#{$colorname});

    &:hover,
    &:focus {
      background: var(--#{$colorname});
    }
  }
}

.btn {
  background: transparent;
  border-radius: 50rem;
  border: 1px solid;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  transition: all 150ms ease;
  text-decoration: none;
  cursor: pointer;

  @include btn("primary");
  @include btn("secondary");

  &:hover,
  &:focus {
    color: white;
  }

  &:focus {
    outline: none;
  }
}

.hidden {
  @include visually-hidden;
}

.fade {
  &-enter {
    transform: translateY(3rem);
  }
  &-leave-to {
    transform: translateY(-3rem);
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.75s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.preview,
.croppr-container {
  height: 100%;
  width: 100%;
  // max-height: 35rem;
  max-width: 35rem;
}
</style>
