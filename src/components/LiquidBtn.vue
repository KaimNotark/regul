<template>
  <div class="liquid-container">
    <a href="#">
      <span>Regul</span>
      <div class="liquid"></div>
    </a>
  </div>
</template>

<script>
export default {
  name: "LiquidBtn",
};
</script>

<style lang="scss" scoped>
a {
  position: relative;
  padding: 20px 50px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  width: 200px;
  overflow: hidden;
  border-radius: 40px;
}
a span {
  position: relative;
  color: #fff;
  font-size: 27px;
  font-family: Arial, Helvetica, sans-serif;
  z-index: 1;
}
a .liquid {
  position: absolute;
  top: -80px;
  left: 0;
  width: 200px;
  height: 200px;
  background: #4973ff;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 0.1s;
}
a .liquid::after,
a .liquid::before {
  content: "";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 75%);
  background: #fff;
}
a .liquid::before {
  border-radius: 45%;
  background: rgba(20, 20, 20, 1);
  animation: animate 5s linear infinite;
}
a .liquid::after {
  border-radius: 40%;
  background: rgba(20, 20, 20, 0.5);
  animation: animate 10s linear infinite;
}
a:hover .liquid {
  top: -120px;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>
