<template>
  <div class="load-photo__container">
    <label for="" class="load-photo__label">
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
};
</script>

<style lang="scss"></style>
