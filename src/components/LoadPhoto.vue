<template>
  <div class="load-photo__container">
    <label :for="loadId" class="load-photo__label">
      <p class="load-photo__text">&#10010;</p>
      <input
        @change="addFile($event.target.files)"
        id="loadId"
        type="file"
        name="fileName"
        autocomplete="off"
        accept="image/jpeg, image/gif, image/png"
        class="load-photo__input"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "LoadPhoto",

  data: () => ({
    isFileInInput: false,
  }),

  methods: {
    addFile(files) {
      this.isFileInInput = files.length > 0;
      // console.log("LoadPhoto--addFile-isFileInInput", this.isFileInInput);
      this.$emit("isFileInInput", this.isFileInInput);
    },
  },
};
</script>

<style lang="scss">
@import "../stylesheets/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

.load {
  &-photo {
    &__container {
    }

    &__label {
      display: block;
      position: relative;
      justify-content: center;
      width: 80px;
      height: 80px;
      border: solid 1px #eaecf0;
      // margin-left: 4px;
      cursor: pointer;
      background: #f3f4f6;
      border-radius: 6px;
      color: #9aa2b7;
      transition: background-color 0.1s ease, border-color 0.3s ease;
    }
    &__label:hover {
      border-color: #9b9ca0;
      background-color: #bbbcbd;
      color: $color-text-main;
    }
    &__label:active {
      border-color: $color-button-background-blue;
      background-color: #bbbcbd;
      color: $color-button-background-blue;
    }

    &__text {
      font-size: 14px;
      // font-weight: 700;
      // line-height: 10px;
      text-transform: uppercase;
      margin: 33px;
    }

    &__input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
  }
}
</style>
