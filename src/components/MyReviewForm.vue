<template>
  <div class="form-container">
    <form
      class="form"
      id="formId"
      name="form"
      autocomplete="on"
      @submit="onSubmit"
    >
      <!-- @reset="onReset" -->
      <div class="form-header">
        <h2 class="form-header__title">Мой отзыв</h2>
        <button
          type="button"
          @click="modalClose"
          class="form-header__close-btn"
        >
          ×
        </button>
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
            @raitingNumber="raitingNumber"
            @raitingIndex="raitingIndex(index)"
          />
        </div>

        <label for="" class="form-main__comment-label"></label>
        <textarea
          name="comment"
          id="comment-id"
          cols="30"
          rows="1"
          class="form-main__comment-textarea"
          autocomplete="off"
          maxlength="500"
          placeholder="Комментарий"
          spellcheck="true"
          @input="changeComment"
        ></textarea>
        <p class="form-main__characters-value">{{ numberOfCharacters }}/500</p>
      </div>

      <div class="form-main__photo-container">
        <LoadPhoto @isFileInInput="isFileInInput" />
        <div class="form-main__photos">
          <img src="../images/01_boat.png" alt="boat" class="form-main__img" />
          <img src="../images/02_pair.png" alt="pair" class="form-main__img" />
          <img src="../images/03_girl.png" alt="girl" class="form-main__img" />
          <img
            src="../images/04_wedding.png"
            alt="wedding"
            class="form-main__img"
          />
        </div>
      </div>

      <hr class="form-devider" />

      <div class="form-footer">
        <button type="submit" class="form-footer__submit-button">
          Отправить
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import RatingInForm from "./RatingInForm.vue";
import LoadPhoto from "./LoadPhoto.vue";

export default {
  name: "MyReviewForm",

  components: {
    RatingInForm,
    LoadPhoto,
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

    raitingBuffer: 0,
    ratingSpeed: 0,
    ratingVideo: 0,
    ratingQuality: 0,
    ratingPunctuality: 0,

    isValid: false,
    isFileInInput: false,

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
    isFileInInput(value) {
      this.isFileInInput = value;
      // console.log("Form--isFileInInput()-isFileInInput", this.isFileInInput);
    },

    changeComment() {
      this.textOfComment = document.getElementById("comment-id").value;
      this.numberOfCharacters = this.textOfComment.length;
    },

    modalClose() {
      this.$emit("modalClose");
      // console.log("bnt close was pressed");
    },

    Validation() {
      if (
        this.textOfComment == 0 ||
        this.ratingSpeed == 0 ||
        this.ratingVideo == 0 ||
        this.ratingQuality == 0 ||
        this.ratingPunctuality == 0
        // !this.isFileInInput
      ) {
        return (this.isValid = false);
      } else {
        return (this.isValid = true);
      }
    },

    onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();

      this.Validation();
      console.log("onSubmit-isValid", this.isValid, this.isFileInInput);

      if (this.isValid) {
        const payload = {
          comment: this.textOfComment,
          ratingSpeed: this.ratingSpeed,
          ratingVideo: this.ratingVideo,
          ratingQuality: this.ratingQuality,
          ratingPunctuality: this.ratingPunctuality,
        };

        this.$emit("addFeedback", payload);

        // this.onReset();
        event.target.reset();
        this.modalClose();
        alert("Спасибо, отзыв опубликован!");
      } else {
        alert("Форма заполнена не полностью. Пожалуйста, заполните все поля.");
      }
    },

    raitingNumber(selected) {
      // console.log("FORM -- raitingNumber - № = " + selected);
      this.raitingBuffer = selected;
    },

    raitingIndex(index) {
      if (index === 0) this.ratingSpeed = this.raitingBuffer;
      if (index === 1) this.ratingVideo = this.raitingBuffer;
      if (index === 2) this.ratingQuality = this.raitingBuffer;
      if (index === 3) this.ratingPunctuality = this.raitingBuffer;
    },
  },
};
</script>

<style lang="scss">
@import "../stylesheets/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

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
  color: $color-text-placeholder;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: $color-text-placeholder;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: $color-text-placeholder;
  opacity: 1;
}
:-moz-placeholder {
  /* Firefox 4 - 18 */
  color: $color-text-placeholder;
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
  padding: 0px 32px 0px 32px;
  border-radius: 16px;

  &-devider {
    margin-top: 17px;
    width: 560px;
    border: none;
    color: $color-form-devider;
    background-color: $color-form-devider;
    height: 1px;
    margin-left: -32px;
  }

  &-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 20px;
    left: 0px;
    margin-top: 16px;
    background: #ffffff;
    border-radius: 16px 16px 0px 0px;

    &__title {
      left: 32px;
      top: 16px;
      @extend %title;
    }

    &__close-btn {
      display: block;
      color: $color-text-placeholder;
      font-size: 30px;
      padding: 0px 0px 0px 0px;
      margin-top: -5px;
      // margin-right: 10px;
      background: $color-white;
      border: none;
      transition: background-color 0.1s ease, border-color 0.3s ease;
      cursor: pointer;
    }
    &__close-btn:hover {
      color: $color-text-main;
    }
    &__close-btn:focus {
      outline: none;
    }
    &__close-btn:active {
      color: $color-button-background-blue;
    }
  }
  &-main {
    &__person {
      display: flex;
      margin-top: 24px;
    }
    &__avatar {
      width: 102px;
      height: 68px;
      border-radius: 6px;
    }
    &__topic {
      margin-left: 20px;
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

    &__rating-container {
      display: flex;
      flex-wrap: wrap;
      width: 440px;
      height: 136px;
    }

    &__comment-label {
    }

    &__comment-textarea {
      width: 496px;
      height: 100px;
      resize: none;
      margin-top: 16px;
      padding: 12px;
      background: #fafafa;
      border: 1px solid #eaecf0;
      box-sizing: border-box;
      border-radius: 6px;
    }

    &__characters-value {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      color: $color-text-placeholder;
      margin: 0;
    }

    &__photo-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    &__photos {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    &__img {
      margin-left: 8px;
    }
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
    width: 496px;
    height: 68px;
    left: 0px;
    top: 588px;
    border-radius: 0px 0px 16px 16px;

    &__submit-button {
      width: 105px;
      height: 36px;
      margin: 16px 0 16px 0;
      border: solid 1px $color-button-background-blue;
      background: $color-button-background-blue;
      border-radius: 6px;
      color: #ffffff;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      transition: background-color 0.1s ease, border-color 0.3s ease;
      cursor: pointer;
    }
    &__submit-button:hover {
      border-color: #3c8e96;
      background-color: #3c8e96;
    }
    &__submit-button:focus {
      outline: none;
      border: 1px solid #3c8e96;
    }
    &__submit-button:active {
      border: 2px solid #53c6d1;
      background-color: #ffffff;
      color: #53c6d1;
    }
  }
}
</style>
