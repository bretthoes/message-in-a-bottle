<template>
  <div class="message">
    <slot>
      Message
    </slot>
  </div>
</template>
<script>
export default {
  name: 'BaseMessage',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  border: 1px solid #e6e6e6;
  background-color: #e6e6e6;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  margin: 4px;
  -ms-word-break: break-all;
  word-break: break-all;

 /* Non standard for webkit */
  word-break: break-word;

  -webkit-hyphens: auto;
     -moz-hyphens: auto;
      -ms-hyphens: auto;
          hyphens: auto;
}
</style>
