
<template>
  <div>
    <button
      v-on="$listeners"
      v-bind="$attrs"
      class="button"
      :class="[buttonColor, buttonPosition, buttonSize]">
      <slot>
        Button
      </slot>
    </button>
  </div>
</template>
<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String
    },
    buttonColor: {
      type: String
    },
    buttonPosition: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  cursor: pointer;
  width: 100px;
  height: 40px;
  font-size: 16px;
  border: 1px solid black;
  box-shadow: 1px 2px;
  margin: 6px;
}
.button:hover {
  text-decoration: underline;
  border: 3px solid black;
  box-shadow: 2px 3px;
  background-color: #B1D3E1;
}
.button.red {
  background-color: #e1b1b1bb;
}
.button.red:hover {
  background-color: #e49b99;
}
.button.blue {
  background-color: #b1d3e1bb;
}
.button.blue:hover {
  background-color: #99cde4;
}
.button.left {
  float: left;
}
.button.right {
  float: right;
}
.button.center {
  margin: auto;
}
.button.large {
  font-size: 22px;
  width: 150px;
  height: 60px;
}
.button.medium {
  font-size: 16px;
  width: 100px;
  height: 40px;
}
.button.small {
  font-size: 14px;
  width: 80px;
  height: 30px;
}
.button.ultra-wide {
  width: 50%;
}
.button.circle {
  border-radius: 33px;
  width: 40px;
}
</style>
