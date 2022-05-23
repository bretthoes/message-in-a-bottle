<template>
<div>
  <input
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    class="text-input"
    :style="{width: width}"/>
</div>
</template>
<script>
export default {
  name: 'TextInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    width: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-input {
  border: 1px solid #e6e6e6;
  height: 40px;
  padding: 4px;
  margin: 4px;
  padding-left: 16px;
}
input {
  height: 100%;
  border:none;
}
input:hover {
  background-color: beige;
  opacity: 0.8;
  transition: 0.2s;
}
input:focus {
  background-color: beige;
  opacity: 0.8;
}
</style>
