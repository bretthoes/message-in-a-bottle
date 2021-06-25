<template>
<div class="content">
  <!-- nav -->
  <nav>
    <ul>
      <li><a href="#"><span @click="navigateTo({name: 'root'})">&nbsp;home</span></a></li>
      <li><a href="#"><span>&nbsp;inbox</span></a></li>
      <li><a href="#"><span>&nbsp;login</span></a></li>
      <li><a href="#" onclick="document.getElementById('id01').style.display='block'"><span>&nbsp;register</span></a></li>
    </ul>
  </nav>
  <!-- TODO: move to home page, shouldn't be part of header -->
  <h1>MESSAGE<br />
  IN A<br />
  <span class="blue">BOTTLE</span></h1>

  <!-- login/register modal -->
  <div id="id01" class="modal">
    <form class="modal-content animate" method="post">
        <div class="imgcontainer">
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
            <img src="../assets/avatar_bottle.png" alt="Avatar" class="avatar">
        </div>
        <div>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#">Register</a>
            </li>
        </ul>
        </div>
        <!-- TODO: add functionality to switch between login and register tabs.
                  Hide necessary components in each. -->
        <div class="container">
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required />
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              v-model="password" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="psw"
              required />
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              v-model="email" />
            <div class="error" v-html="error" />
            <div class="container" style="background-color:#f1f1f1">
                <button @click="register">Register</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register (e) {
      e.preventDefault()
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
// Get the modal
var modal = document.getElementById('id01')

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
</script>

<style scoped>
nav {
  text-align: right;
}
nav > ul > li > a, nav > ul, nav > ul > li {
  list-style-type: none;
  text-decoration: none;
  color: black;
  padding-right: 12px;
  font-size: 20px;
  text-transform: lowercase;
}
nav a {
  display: inline-block;
  transform: skew(-12deg);
}
nav span {
  display: inline-block; transform: skew(12deg);
}
nav a:hover {
  transition: 0.75s ease;
  /*color: aquamarine;*/
  outline: 1px solid black;
}
.blue {
  background: linear-gradient(to right, #30CFD0 0%, aquamarine 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
h1 {
  font-size: 52px;
  transform: scale(1.2, 1);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: inline-block;
}

/* modal */

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 6px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: lightseagreen;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
    margin: auto;
    padding-top: 9px;
    font-size: 12px;
}

.error {
  color: red;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 330px; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)}
  to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
  from {transform: scale(0)}
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn {
     width: 100%;
  }
}
</style>
