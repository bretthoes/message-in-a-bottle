<template>
<div>
  <nav>
    <ul>
      <li><a href="#"><b>home</b></a></li>
      <li><a href="#">inbox</a></li>
      <li><a href="#">profile</a></li>
    </ul>
  </nav>
  <h1>MESSAGE</h1>
  <h1>IN A</h1>
  <h1 class="blue">BOTTLE</h1>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
*{
}
nav {
  text-align: right;
}
ul, a {
  list-style-type: none;
  text-decoration: none;
  color: black;
  padding-right: 12px;
  font-size: 20px;
}
a:hover {
  font-weight: bold;
}
h1 {
  font-size: 48px;
  transform: scale(1.2, 1);
  font-weight: bold;
}
.blue {
  color:blue;
}
</style>
