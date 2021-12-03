<template>
  <footer>
    <svg viewBox="0 0 120 20">
      <defs>
        <filter>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 13 -9"
          />
          <xfeBlend in="SourceGraphic" />
        </filter>
        <path
          id="wave"
          d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 20 h -240 z"
        />
      </defs>
      <use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2"></use>
      <use id="wave2" class="wave" xlink:href="#wave" x="0" y="0"></use>
    </svg>
  </footer>
</template>

<script>
export default {
  name: 'FooterWaves'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  width: 100vw;
  position: fixed;
  bottom: 0px;
}
footer div {
  background-color: var(--col-deepblue);
  margin: -5px 0px 0px 0px;
  padding: 0px;
  color: #fff;
  text-align: center;
}
svg {
  width: 100%;
  overflow: visible;
}

.wave {
  animation: wave 3s linear;
  animation-iteration-count: infinite;
  fill: #006f9e;
}
#wave2 {
  animation-duration: 10s;
  animation-direction: reverse;
  opacity: 0.6;
}
#wave3 {
  animation-duration: 12s;
  opacity: 0.3;
}
@keyframes wave {
  to {
    transform: translateX(-100%);
  }
}
</style>
