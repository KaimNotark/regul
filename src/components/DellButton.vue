<template>
  <div class="dell-btn__container">
    <svg
      aria-hidden="true"
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <symbol id="icon-home_w_svg" viewBox="-250 -250 1500 1500">
          <title>Домашняя страница</title>
          <path
            d="M799.4,936.9H200.1c-36.1,0-65.4-27.4-65.4-61.1V345.5c0-33.7,29.3-61.1,65.4-61.1h599.3c36.1,0,65.4,27.4,65.4,61.1v530.3C864.8,909.5,835.4,936.9,799.4,936.9z M200.1,340.3c-5.9,0-9.5,3.4-9.5,5.2v530.3c0,1.8,3.6,5.2,9.5,5.2h599.3c5.9,0,9.5-3.4,9.5-5.2V345.5c0-1.8-3.6-5.2-9.5-5.2H200.1z"
          />
          <path
            d="M924.6,340.3H75.4c-36.1,0-65.4-26.7-65.4-59.5v-80.9c0-32.8,29.3-59.5,65.4-59.5h849.2c36.1,0,65.4,26.7,65.4,59.5v80.9C990,313.6,960.7,340.3,924.6,340.3z M65.9,280.6c0.5,1,3.6,3.8,9.5,3.8h849.2c5.9,0,9-2.8,9.5-3.8v-80.5c-0.5-1-3.6-3.8-9.5-3.8H75.4c-5.9,0-9,2.8-9.5,3.8V280.6z"
          />
          <path
            d="M617.7,196.3H386.2c-36.1,0-65.4-26.7-65.4-59.5v-14.2c0-32.8,29.3-59.5,65.4-59.5h231.4c36.1,0,65.4,26.7,65.4,59.5v14.2C683.1,169.6,653.7,196.3,617.7,196.3z M376.7,136.6c0.5,1,3.6,3.8,9.5,3.8h231.4c5.9,0,9-2.8,9.5-3.8v-13.8c-0.5-1-3.6-3.8-9.5-3.8H386.2c-5.9,0-9,2.8-9.5,3.8V136.6z"
          />
        </symbol>
      </g>
    </svg>

    <svg class="dell-btn-icon dell-btn-icon__hover">
      <use xlink:href="#icon-home_w_svg" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "DellButton",
};
</script>

<style lang="scss">
@import "../stylesheets/variables.scss";

.dell-btn-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.6);
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;

  &__hover {
    font-size: 18px;
    color: $color-white;
    transition: color 0.3s ease, border-color 0.3s ease,
      background-color 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    cursor: pointer;
  }

  &__hover:hover {
    color: $color-button-background-blue;
    border-color: $color-button-background-blue;
    background-color: rgba(0, 0, 0, 0.8);
  }
  &__hover:focus {
    outline: none;
    color: $color-button-background-blue;
    border-color: $color-button-background-blue;
    background-color: #000000;
  }
  &__hover:active {
    color: $color-nav__button-dark-blue;
    border-color: $color-nav__button-dark-blue;
    background-color: #000000;
  }
}
</style>
