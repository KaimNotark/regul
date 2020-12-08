<template>
  <div id="app">
    <div id="wrapper" class="wrapper">
      <!-- modal window form -->
      <transition name="fade-overlay-form">
        <div
          id="modal-overlay-form"
          class="modal-overlay-form"
          v-if="modalIsOpened"
        >
          <div modal-overlay-close="modal-overlay" class="modal__overlay">
            <button
              class="modal-button-close"
              type="button"
              @click="modalClose"
            >
              ×
            </button>
            <div class="modal-backing">
              <!-- <simplebar
                data-simplebar-auto-hide="false"
                class="modal-form__simplebar"
              > -->
              <MyReviewForm :user="dataCard" />
              <!-- </simplebar> -->
            </div>
          </div>
        </div>
      </transition>
      <!-- / modal window form -->

      <header class="header">
        <div class="header-container">
          <img src="/images/infinity-scroll.png" alt class="header-img" />
          <a
            href="https://kaimnotark.github.io/LP_DEAB/"
            class="header-link"
            target="_blank"
          >
            <span class="__capital">landing page</span>
            (open it on desktop)
          </a>
        </div>
      </header>

      <main class="main">
        <div class="main-window">
          <h2 class="main-window__title">window for test</h2>
          <hr class="main-window__devider" />
          <simplebar
            data-simplebar-auto-hide="false"
            class="main-window__scroll-simplebar"
          >
            <p class="main-window__text">Press button for load data from API</p>
            <Button @download="showRandomuser" />
            <Card :user="dataCard" />
            <button class="main-window__btn" @click="addCard">
              Add new card
            </button>
            <p class="main-window__text">
              <span class="__yellow">scrollPositionValue =</span>
              {{ scrollPositionValue }}
            </p>
            <p class="main-window__text">
              <span class="__yellow">clientHeightValue =</span>
              {{ clientHeightValue }}
            </p>
            <p class="main-window__text">
              <span class="__yellow">scrollHeightValue =</span>
              {{ scrollHeightValue }}
            </p>
            <p class="main-window__text">
              <span class="__yellow">Delta =</span>
              {{ delta }}
            </p>
            <p class="main-window__text">
              <!-- <span class="__yellow">Delta =</span> -->
              {{ delta }} >= {{ scrollHeightValue }}
            </p>
          </simplebar>

          <button class="main-window__liquid-btn" @click="showModalForm">
            <LiquidBtn />
          </button>
        </div>
        <div class="main-window">
          <h2 class="main-window__title">window for infinity scroll</h2>
          <hr class="main-window__devider" />
          <div class="main-window__scroll-native" @scroll="onScroll">
            <Card v-for="user in initUsers" :key="user.id" :user="user" />
          </div>
        </div>
      </main>

      <footer class="footer">
        <a
          href="https://kaimnotark.github.io/LP_DEAB/"
          class="footer-link"
          target="_blank"
        >
          <span class="__capital">landing page</span>
          (open it on cell phone)
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
/**
 * @file The root component from which all other components will be rendered.
 */
/**
 * "simplebar" - module used for customizing the scrollbar.
 */
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

import Button from "./components/Button.vue";
import Card from "./components/Card.vue";

import { Randomuser } from "./Api";

import LiquidBtn from "./components/LiquidBtn.vue";
import MyReviewForm from "./components/MyReviewForm.vue";

export default {
  name: "app",

  components: {
    simplebar,
    Button,
    Card,
    LiquidBtn,
    MyReviewForm,
  },

  data() {
    return {
      /**
       * "scrollPositionValue" - scrollbar slider coordinate on the Y axis.
       * @type {Number}
       */
      scrollPositionValue: 0,
      /**
       * "clientHeightValue" - height of the scroll viewport.
       * @type {Number}
       */
      clientHeightValue: 0,
      /**
       * "scrollHeightValue" - height of the scroll area.
       * @type {Number}
       */
      scrollHeightValue: 0,
      /**
       * "delta" - sum of scrollPositionValue and clientHeightValue.
       * @type {Number}
       */
      delta: null,

      /**
       * A complete list of all data about one user.
       *
       * @type {Array <Object>}
       */
      allRandomuser: [],
      /**
       * Array of users that is loaded when creating a page.
       * Including those users, that will be uploaded in future.
       *
       * @type {Array <Object>}
       */
      initUsers: [],

      /**
       * Object used to fill in a single card.
       *
       * @type {{name: String, mail: String, imgUrl: String}} - user data.
       */
      dataCard: {
        name: "",
        mail: "",
        imgUrl: "",
      },

      modalIsOpened: false,
    };
  },

  methods: {
    /**
     * Generates user data to fill in a single card
     *
     * @async
     * @property {Function} showRandomuser
     * @returns {{name: String, mail: String, imgUrl: String}} - user data.
     */
    async showRandomuser() {
      // console.log("APP -- method showRandomuser run.");
      await this.getRandomuser();
      this.parsing();
    },

    /**
     * Loads all data about one user from the server.
     *
     * @async
     * @property {Function} getRandomuser - sends a request to the server to get user data.
     * @returns {Array} - all user data
     */
    async getRandomuser() {
      // console.log("APP -- method getRandomuser run.");
      try {
        this.allRandomuser = await Randomuser.showRandomuser();
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Selects only the name, the E-mail and the photo of the user
     * from all user data.
     *
     * @property {Function} parsing
     * @returns {{name: String, mail: String, imgUrl: String}} - user data.
     */
    parsing() {
      // console.log("APP -- method parsing run.");
      this.dataCard.name =
        this.allRandomuser.results[0].name.title +
        ". " +
        this.allRandomuser.results[0].name.first +
        " " +
        this.allRandomuser.results[0].name.last;
      // console.log("APP -- name = " + this.dataCard.name);

      this.dataCard.mail = this.allRandomuser.results[0].email;
      this.dataCard.imgUrl = this.allRandomuser.results[0].picture.large;
    },

    /**
     * Generates a list of users for initial display on the page.
     *
     * @async
     * @property {Function} initRandomusers - sends the 10 requests to the server to get data of 10 users.
     * @returns {Array} - 10 users data.
     */
    async initRandomusers(initUsers) {
      for (let i = 0; i < 10; i++) {
        // console.log("APP -- initRandomusers.");
        await this.getRandomuser();
        this.parsing();
        // console.log("APP -- initRandomusers - name = " + this.dataCard.name);
        initUsers.push({
          name: this.dataCard.name,
          mail: this.dataCard.mail,
          imgUrl: this.dataCard.imgUrl,
        });
        // console.log("APP -- initRandomusers - initUsers = ") + this.initUsers;
      }
    },
    /**
     * Makes a request to the server
     * and generates data for one user to fill out a single card.
     *
     * @async
     * @property {Function} addCard
     */
    async addCard() {
      await this.getRandomuser();
      this.parsing();
      this.initUsers.push({
        name: this.dataCard.name,
        mail: this.dataCard.mail,
        imgUrl: this.dataCard.imgUrl,
      });
    },
    /**
     * Calculates the bottom position of the scroll slider
     * and loads a new card from the server.
     *
     * @property {Function} onScroll - the method is started when the user scrolls.
     * @returns {{name: String, mail: String, imgUrl: String}} - user data.
     */
    onScroll() {
      var container = event.target;
      this.scrollPositionValue = container.scrollTop;
      this.clientHeightValue = container.clientHeight;
      this.scrollHeightValue = container.scrollHeight;
      this.delta = this.scrollPositionValue + this.clientHeightValue;

      if (
        this.scrollPositionValue + this.clientHeightValue + 5 >=
        this.scrollHeightValue
      ) {
        this.addCard();
        // console.log("APP -- method onScroll run. - if=true");
      }

      // console.log("APP -- method onScroll run." + this.scrollPosition);
    },

    showModalForm() {
      console.log("APP--showModalForm()-RUN");
      this.modalOpen();
    },
    modalOpen() {
      console.log(`APP--modalOpen()-${this.modalIsOpened}`);
      this.modalIsOpened = true;
    },
    modalClose() {
      console.log(`APP--modalClose()-${this.modalIsOpened}`);
      this.modalIsOpened = false;
    },
  },

  /**
   * Launches the method when the page loads,
   * which generates the initial list of users cards.
   *
   * @property {Function} created
   * @returns {Array} - 10 users cards.
   */
  created() {
    // console.log("APP -- created initRandomusers.");
    this.initRandomusers(this.initUsers);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

@import "./stylesheets/variables.scss";
@import "./stylesheets/resets.scss";

%link-hover {
  content: "";
  position: absolute;
  bottom: -10px;
  width: 46%;
  height: 2px;
  background-color: $color-yellow-light;
}

$font-family-primary: "Roboto", "Verdana", "Arial", sans-serif;

html {
  scroll-behavior: smooth;
  overflow: hidden;
}

.wrapper *,
.wrapper *::before,
.wrapper *::after {
  box-sizing: border-box;
}

body {
  font-family: $font-family-primary;
  box-sizing: border-box;
}

#app {
  font-family: $font-family-primary;
}

.header {
  width: 100%;
  position: relative;

  &-container {
    display: flex;
    justify-content: space-between;
    padding: 15px 27px;
    background-color: $color-gray;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  }

  &-img {
    user-select: none;
  }

  &-link {
    color: $color-white;
    font-size: 14px;
    height: 12px;
    margin-top: 12px;
    letter-spacing: 1px;
    text-decoration: none;
    position: relative;
  }

  &-link:hover::before {
    @extend %link-hover;
    right: 0;
  }

  &-link:hover::after {
    @extend %link-hover;
    left: 0;
  }

  &-link:hover {
    text-decoration: none;
    color: $color-yellow-main;
  }
}

.main {
  display: flex;
  justify-content: center;
  margin: 20px;
  height: calc(100vh - (115px + 50px));
  min-height: 370px;

  &-window {
    padding: 10px;
    margin: 10px;
    width: 575px;
    height: 100%;
    min-height: 350px;
    border: 2px solid $color-yellow-main;
    border-radius: 10px;

    &__title {
      color: $color-yellow-light;
      text-transform: uppercase;
    }

    &__devider {
      border: 0;
      height: 2px;
      background: $color-yellow-main;
    }

    &__btn {
      width: 100px;
      height: 40px;
      margin: 30px;
      border: solid 2px $color-yellow-light;
      background: $color-yellow-pale;
      border-radius: 3px;
      color: $color-black;
      font-family: Roboto;
      font-size: 11px;
      font-weight: 700;
      line-height: 13px;
      text-transform: uppercase;
      transition: background-color 0.1s ease, border-color 0.3s ease;
      cursor: pointer;
    }
    &__btn:hover {
      border-color: $color-yellow-dark;
      background-color: $color-yellow-main;
      font-weight: bold;
      letter-spacing: 2px;
    }
    &__btn:focus {
      outline: none;
      border: 2px solid $color-yellow-dark;
    }
    &__btn:active {
      border: 2px solid $color-yellow-light;
      background-color: $color-yellow-dark;
      color: $color-gray;
    }

    &__scroll-simplebar {
      height: 400px;
      overflow: auto;
      overflow-x: hidden;
    }

    &__scroll-native {
      height: calc(100vh - (115px + 130px));
      overflow: auto;
      overflow-x: hidden;
    }

    &__liquid-btn {
      position: relative;
      margin: 50px 50px;
      display: block;
      border: none;
      color: none;
      background-color: $color-white;
      border-radius: 40px;
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: $color-gray;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);

  &-link {
    color: $color-white;
    font-size: 14px;
    height: 12px;
    margin-top: 15px;
    letter-spacing: 1px;
    text-decoration: none;
    position: relative;
  }

  &-link:hover::before {
    @extend %link-hover;
    right: 0;
  }

  &-link:hover::after {
    @extend %link-hover;
    left: 0;
  }

  &-link:hover {
    text-decoration: none;
    color: $color-yellow-main;
  }
}

.__capital {
  text-transform: uppercase;
}

.__yellow {
  color: $color-yellow-dark;
}

.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
  background-color: $color-yellow-light;
}

// begin -- modal overlay form
.fade-overlay-form-enter-active,
.fade-overlay-form-leave-active {
  transition: opacity 0.5s;
}
.fade-overlay-form-enter,
.fade-overlay-form-leave-to {
  opacity: 0;
}
.modal-overlay-form {
  display: inline;
  z-index: 900;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  padding: 67px;
  background: rgba(0, 0, 0, 0.5);
  transition: visibility 200ms ease-in, opacity 200ms ease-in;
}

.modal__overlay {
  display: flex;
  justify-content: flex-end;
}

.modal-button-close {
  display: block;
  width: 30px;
  height: 30px;
  font-size: 24px;
  padding: 0px 5px 1px 6px;
  margin-top: 12px;
  margin-right: 10px;
  background: $color-white;
  border: 1px solid $color-white;
  border-radius: 3px;
  transition: background-color 0.1s ease, border-color 0.3s ease;
  cursor: pointer;
}
.modal-button-close:hover {
  background-color: $color-button-background-gray;
  border-color: $color-text-black;
}
.modal-button-close:focus {
  outline: none;
  background-color: $color-button-background-gray;
  border-color: $color-text-black;
}
.modal-button-close:active {
  background-color: $color-header__dark-gray;
  border-color: $color-input-focus;
  color: $color-input-focus;
}
.modal-backing {
  width: 560px;
  height: 655px;
  // padding-top: 20px;
  background-color: $color-white;
  border-radius: 16px;
}
.modal-form__simplebar {
  width: 590px;
  height: 655px;
}
// end -- modal overlay form
</style>
