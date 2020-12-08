<template>
  <!-- 
Site:
https://www.vuescript.com/star-rating-component-vue-2/
https://github.com/craigh411/vue-star-rating

yarn add vue-star-rating
  -->
  <div class="form__rating-container">
    <p class="form__rating-title">{{ rating.title }}</p>
    <star-rating
      :star-size="13"
      :show-rating="false"
      inactive-color="#ffffff"
      :active-color="colorStar"
      :border-color="colorStar"
      :border-width="2"
      :padding="0"
      :rating="ratingValue"
      @rating-selected="setRating"
    ></star-rating>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "RatingInForm",

  components: {
    StarRating,
  },

  props: {
    rating: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selected: 0,
      isFiveStars: true,
      colorStar: "#53C6D1",
      ratingValue: 0,
      selectedRating: 0,
    };
  },

  methods: {
    setColorStar(key) {
      switch (key) {
        case 1:
          this.colorStar = "#53C6D1";
          break;
        case 2:
          this.colorStar = "#53C6D1";
          break;
        case 3:
          this.colorStar = "#53C6D1";
          break;
        case 4:
          this.colorStar = "#53C6D1";
          break;
        case 5:
          this.colorStar = "#53C6D1";
          break;
      }
    },

    onReset() {
      this.ratingValue = 0;
      this.colorStar = "#ff5d00";
      this.selectedRating = 0;

      this.$emit("raitingNumber", this.selectedRating);
      this.$emit("raitingIndex");
    },

    setRating(selected) {
      this.selectedRating = selected;
      this.ratingValue = selected;

      this.setColorStar(selected);

      this.$emit("raitingNumber", this.selectedRating);
      this.$emit("raitingIndex");

      selected = 0;
    },
  },

  created() {
    // switch (+this.rating.id) {
    //   case 0:
    //     this.ratingValue = this.allApplicants[
    //       this.rowIndexForEdit
    //     ].ratingSummary;
    //     break;
    //   case 1:
    //     this.ratingValue = this.allApplicants[this.rowIndexForEdit].ratingTest;
    //     break;
    //   case 2:
    //     this.ratingValue = this.allApplicants[
    //       this.rowIndexForEdit
    //     ].ratingInterview;
    //     break;
    // }
    this.setColorStar(this.ratingValue);
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/variables.scss";

.form__rating-container {
  display: flex;
  flex-direction: column;
}

.form__rating-title {
  color: $color-text-main;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  line-height: 12px;
  text-transform: uppercase;
}
</style>
