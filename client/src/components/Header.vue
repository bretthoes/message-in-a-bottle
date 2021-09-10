<template>
  <div class="content">
    <!-- nav -->
    <nav>
      <ul>
        <li>
          <a href="#"
            ><span @click="navigateTo({ name: 'root' })">&nbsp;home</span></a
          >
        </li>
        <li>
          <a href="#" v-if="$store.state.isUserLoggedIn">
            <span>&nbsp;inbox</span>
          </a>
        </li>
        <li>
          <a href="#" v-if="$store.state.isUserLoggedIn">
            <span v-b-toggle="'collapse-1'">
              &#x25BE;{{ $store.state.user.username }}
            </span>
            <b-collapse id="collapse-1">
              <b-card>
                <ul class='dropdown'>
                  <li><a href='#' @click="navigateTo({ name: 'profile' })">my account</a></li>
                  <li>
                    <a href='#' @click="logout">
                      sign out
                    </a>
                  </li>
                </ul>
              </b-card>
            </b-collapse>
          </a>
        </li>
        <li>
          <a
            href="#"
            v-if="!$store.state.isUserLoggedIn"
            @click="openModal(false)"
            ><span>&nbsp;login</span></a
          >
        </li>
        <li>
          <a
            href="#"
            v-if="!$store.state.isUserLoggedIn"
            @click="openModal(true)"
            ><span>&nbsp;register</span></a
          >
        </li>
      </ul>
    </nav>

    <!-- login/register modal -->
    <div id="modal" class="modal">
      <form class="modal-content animate">
        <div class="imgcontainer">
          <span
            onclick="document.getElementById('modal').style.display='none'"
            class="close"
            title="Close Modal"
            >&times;</span
          >
          <img src="../assets/avatar_bottle.png" alt="Avatar" class="avatar" />
        </div>
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link"
                :class="{active: !isRegister}"
                @click="isRegister = !isRegister"
                href="#">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                :class="{active: isRegister}"
                @click="isRegister = !isRegister"
                href="#">Register</a>
            </li>
          </ul>
        </div>
        <div class="container">
          <label v-if="isRegister">Username</label>
          <input
            v-model="username"
            v-if="isRegister"
            type="text"
            name="username"
            ref="username"
            maxlength="16"
            minlength="4"
            autocomplete="off"
            required
          />
          <label v-if="isRegister">Email</label>
          <label v-if="!isRegister">Email or Username</label>
          <input
            v-model="email"
            type="text"
            name="email"
            ref="email"
            minlength="6"
            autocomplete="off"
            required
          />
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            name="psw"
            minlength="8"
            maxlength="32"
            autocomplete="off"
            required
          />
          <label v-if="isRegister">Confirm Password</label>
          <input
            v-model="repeatedPassword"
            v-if="isRegister"
            type="password"
            name="psw"
            autocomplete="off"
            required
          />
          <div class="error" v-html="error" />
          <div class="container" style="background-color:#f1f1f1">
            <button class="modal-button" @click="register" v-if="isRegister">Register</button>
            <button class="modal-button" @click="login" v-if="!isRegister">Login</button>
            <span class="psw" v-if="!isRegister">Forgot
              <a href="#" @click="navigateTo({ name: 'account-recovery' })">
                password?
              </a>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import navigateToMixin from '../Mixins/navigateToMixin'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
      error: null,
      isRegister: false
    }
  },
  mixins: [navigateToMixin],
  methods: {
    async register (e) {
      e.preventDefault()
      // Ensure confirmation password matches
      if (this.password !== this.repeatedPassword) {
        this.error = 'Repeated password does not match.'
        return
      }
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        // Close modal upon successful register
        this.closeModal()
        // Display toast on successful register
        this.makeToast('primary', 'Register Successful!', 'Welcome, ' + this.username + '!')
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async login (e) {
      e.preventDefault()
      try {
        const response = await AuthenticationService.login({
          // Pass both username and email as email input value to check on both for login.
          username: this.email,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        // Close modal upon successful login
        this.closeModal()
        // Display toast on successful login
        this.makeToast('primary', 'Login Successful!', 'Welcome back, ' + this.username + '!')
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // Return to root page on logout
      this.navigateTo({ name: 'root' })
    },
    closeModal () {
      var modal = document.getElementById('modal')
      modal.style.display = 'none'
    },
    openModal (isRegister) {
      // Determine whether to display login or register content of modal
      this.isRegister = isRegister
      // Open modal
      var modal = document.getElementById('modal')
      modal.style.display = 'block'
      // Set focus on first input
      if (isRegister) {
        // nextTick used to update DOM after data is changed but
        // before browser has rendered changes on page.
        this.$nextTick(() => this.$refs.username.focus())
      } else {
        this.$nextTick(() => this.$refs.email.focus())
      }
    }, // TODO: Toast disappears immediately after display
    makeToast (variant = null, title, body) {
      this.$root.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        noAutoHide: true,
        autoHideDelay: 10000,
        toaster: 'b-toaster-top-center'
      })
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  padding-left: 3px;

}
.dropdown > li > a {
  color: black;
  list-style-type: none;
  text-decoration: none;
}
.dropdown > li > a:hover {
  transition: 0.25s ease;
  text-decoration: underline;
}
nav {
  text-align: right;
}
nav > ul > li > a,
nav > ul,
nav > ul > li {
  list-style-type: none;
  text-decoration: none;
  color: black;
  padding-right: 12px;
  font-size: 22px;
  text-transform: lowercase;
}

nav > ul > li > a {
  display: inline-block;
  transform: skew(-12deg);
}
nav > ul > li > a > span {
  display: inline-block;
  transform: skew(12deg);
}
nav > ul > li > a:hover {
  transition: 0.75s ease;
  /*color: aquamarine;*/
  outline: 1px solid black;
}
/* modal */

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 6px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: white;
}
input:focus{
  padding: 9px 15px;
  background-color: beige;
}

.modal-button {
  background-color: #006f9e;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

.modal-button:hover {
  opacity: 0.8;
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: white;
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
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn {
    width: 100%;
  }
}
</style>
