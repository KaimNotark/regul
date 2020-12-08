<template>
  <div class="photo__container">
    <img :src="photo.imgUrl" :alt="photo.alt" class="photo__image" />
  </div>
</template>

<script>
export default {
  name: "Photo",

  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
