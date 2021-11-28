<template>
  <transition name='modal-fade'>
    <div class='modal-background'>
      <!-- login/register modal -->
      <div class='modal'
        role='dialog'>
        <form class='modal-content animate'>
          <div class='img-container'>
            <span
              @click="close"
              class='close'
              title='Close Modal'
              >&times;</span
            >
            <img
              src='@/assets/avatar_bottle.png'
              alt='Avatar'
              class='avatar' />
          </div>
          <div>
            <ul class='nav nav-tabs'>
              <li class='nav-item'>
                <a
                  class='nav-link'
                  :class='{ active: !isRegister }'
                  @click='isRegister = !isRegister'
                  href='#'
                  >Login</a
                >
              </li>
              <li class='nav-item'>
                <a
                  class='nav-link'
                  :class='{ active: isRegister }'
                  @click='isRegister = !isRegister'
                  href='#'
                  >Register</a
                >
              </li>
            </ul>
          </div>
          <div class='container'>
            <label v-if='isRegister'>Username</label>
            <input
              v-model='username'
              v-if='isRegister'
              type='text'
              name='username'
              ref='username'
              minlength='4'
              maxlength='16'
              autocomplete='off'
              required
            />
            <label v-if='isRegister'>Email</label>
            <label v-if='!isRegister'>Email or Username</label>
            <input
              v-model='email'
              type='text'
              name='email'
              ref='email'
              minlength='4'
              maxlength='32'
              autocomplete='off'
              required
            />
            <label>Password</label>
            <input
              v-model='password'
              type='password'
              name='psw'
              minlength='8'
              maxlength='32'
              autocomplete='off'
              required
            />
            <label v-if='isRegister'>Confirm Password</label>
            <input
              v-model='repeatedPassword'
              v-if='isRegister'
              type='password'
              name='psw'
              autocomplete='off'
              required
            />
            <div class='error'>{{error}}</div>
            <div
              class='container'
              style='background-color:#f1f1f1'>
              <button
                class='modal-button'
                @click='register'
                v-if='isRegister'>
                Register
              </button>
              <button
                class='modal-button'
                @click='login'
                v-if='!isRegister'>
                Login
              </button>
              <span
                class='psw'
                v-if='!isRegister'
                >Forgot
                <a
                  href='#'
                  @click='(navigateTo({ name: "account-recovery" }))'>
                  password?</a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import navigateToMixin from '@/mixins/navigateToMixin'
export default {
  name: 'Modal',
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

        // Close modal upon successful login
        this.$emit('close')
        // Display toast on successful register
        this.$toasted.show('Successfully Registered!', {
          theme: 'outline',
          position: 'top-center',
          duration: 200
        })
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
        this.$emit('close')
        // Display toast on successful login
        this.$toasted.show('Welcome back!', {
          theme: 'outline',
          position: 'top-center',
          duration: 2000
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    close () {
      this.$emit('close')
    },
    updateIsRegister (isRegister) {
      this.isRegister = isRegister
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/* modal */
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}
.modal {
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
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
  top: -25px;
  color: #000;
  font-size: 45px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}
.modal-content {
  background-color: white;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 330px; /* Could be more or less, depending on screen size */
}
/* Full-width input fields */
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 6px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: white;
}
input:focus {
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
.img-container {
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
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
