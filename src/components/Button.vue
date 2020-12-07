<template>
  <div class="button-container">
    <svg
      aria-hidden="true"
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-download2" viewBox="-9 -9 50 50">
          <title>Download</title>
          <path
            d="M28 16h-5l-7 7-7-7h-5l-4 8v2h32v-2l-4-8zM0 28h32v2h-32v-2zM18 10v-8h-4v8h-7l9 9 9-9h-7z"
          />
        </symbol>
      </defs>
    </svg>

    <svg class="button-icon button-icon__hover" @click="download">
      <use xlink:href="#icon-download2" />
    </svg>
  </div>
</template>

<script>
/**
 * @file "Button.vue" download button based on svg icons.
 */
export default {
  name: "Button",

  methods: {
    /**
     * When a button "download" is clicked, 
     * it sends the "button is pressed" event 
     * to the parent component App.vue.
     * 
     * @property {Function} download
     */
    download() {
      // console.log("BUTTON -- button DOWNLOAD was pressed.");
      this.$emit("download");
    }
  }
};
</script>

<style lang="scss">
@import "../stylesheets/variables.scss";

.button {
  &-container {
    margin: 30px;
  }

  &-icon {
    display: inline-block;
    width: 50px;
    height: 40px;
    stroke-width: 0;
    stroke: $color-yellow-light;
    fill: $color-yellow-light;

    &__hover {
      width: 36px;
      height: 36px;
      margin-left: 6px;
      border: solid 1px $color-yellow-light;
      border-radius: 3px;
      background: $color-white;
      transition: background-color 0.1s ease, border-color 0.3s ease;
      cursor: pointer;
    }

    &__hover:hover {
      background-color: $color-yellow-main;
      border-color: $color-yellow-light;
    }
    &__hover:focus {
      outline: none;
      background-color: $color-yellow-light;
      border-color: $color-yellow-main;
    }
    &__hover:active {
      background-color: $color-yellow-dark;
      border-color: $color-gray;
    }
  }
}
</style>
