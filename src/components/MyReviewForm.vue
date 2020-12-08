<template>
  <div class="form-container">
    <form class="form" id="formId" name="form" autocomplete="on">
      <!-- @submit="onSubmit"
      @reset="onReset" -->
      <div class="form-header">
        <h2 class="form-header__title">Мой отзыв</h2>
      </div>

      <hr class="form-devider" />

      <div class="form-main">
        <div class="form-main__person">
          <img :src="user.imgUrl" alt="avatar" class="form-main__avatar" />
          <div class="form-main__topic">
            <h2 class="form-main__title">Фоточки в свадебном платьице</h2>
            <p class="form-main__text">{{ user.name }}</p>
          </div>
        </div>

        <div class="form-main__rating-container">
          <RatingInForm
            v-for="(rating, index) in ratings"
            v-model="ratings[index]"
            :key="rating.id"
            :rating="rating"
          />
        </div>

        <label for="" class="form-main__comment-label"></label>
        <textarea
          name="comment"
          id="comment-id"
          cols="30"
          rows="10"
          class="form-main__comment-textarea"
          autocomplete="off"
          maxlength="500"
          placeholder="Комментарий"
          spellcheck="true"
          @input="changeComment"
        ></textarea>
        <p class="form-main__characters-value">{{ numberOfCharacters }}/500</p>
      </div>

      <hr class="form-devider" />

      <div class="form-footer">
        <button type="submit" class="form-footer__button">Отправить</button>
      </div>
    </form>
  </div>
</template>
<script>
import RatingInForm from "./RatingInForm.vue";

export default {
  name: "MyReviewForm",

  components: {
    RatingInForm,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    textOfComment: "",
    numberOfCharacters: 0,

    ratings: [
      {
        id: "0",
        title: "Скорость",
      },
      {
        id: "1",
        title: "Скорость отдачи видео",
      },
      {
        id: "2",
        title: "Качество",
      },
      {
        id: "3",
        title: "Пунктуальность",
      },
    ],
  }),

  methods: {
    changeComment() {
      this.textOfComment = document.getElementById("comment-id").value;
      this.numberOfCharacters = this.textOfComment.length;
    },
  },
};
</script>
<style lang="scss">
@import "../stylesheets/variables.scss";

%title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: $color-text-main;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border: 1px solid $color-input-focus;
}

// change text color by placeholder
::-webkit-input-placeholder {
  /* Chrome */
  color: $color-text-light;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: $color-text-light;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: $color-text-light;
  opacity: 1;
}
:-moz-placeholder {
  /* Firefox 4 - 18 */
  color: $color-text-light;
  opacity: 1;
}

// change background color by autofill
// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,
// input:-webkit-autofill:active {
//   -webkit-box-shadow: 0 0 0px 10em $color-input-background inset !important;
// }

@-webkit-keyframes autofill {
  to {
    color: $color-text-main;
    background-color: $color-input-background;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
  -webkit-box-shadow: inset 0 0 0 10em $color-input-background !important;
}

.form {
  width: 560px;
  height: 655px;
  background-color: $color-white;
  padding: 23px;

  &-devider {
    margin-top: 17px;
    width: 560px;
    border: none;
    color: $color-form-devider;
    background-color: $color-form-devider;
    height: 1px;
    margin-left: -23px;
  }

  &-header {
    width: 100%;
    height: 56px;
    left: 0px;
    top: 0px;
    background: #ffffff;
    border-radius: 16px 16px 0px 0px;

    &__title {
      left: 32px;
      top: 16px;
      @extend %title;
    }
  }
  &-main {
    &__person {
    }
    &__avatar {
      width: 102px;
      height: 68px;
    }
    &__topic {
    }
    &__title {
      @extend %title;
    }
    &__text {
      width: 374px;
      height: 16px;
      left: 0px;
      top: 28px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: $color-text-light;
    }

    &__comment-textarea {
      resize: none;
    }
  }
  &-footer {
    width: 560px;
    height: 68px;
    left: 0px;
    top: 588px;
    border-radius: 0px 0px 16px 16px;
    &__button {
      width: 105px;
      height: 36px;
      right: 0px;
      top: 0px;
      background: $color-button-background-blue;
      border-radius: 6px;
    }
  }
}
</style>
