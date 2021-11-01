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
                  <li><a href='#'
                  @click="navigateTo({
                    name: 'user',
                    params: {
                      userId: $store.state.user.id
                    }
                  })">
                    my account</a></li>
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
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      ref="modalComponent"
    />
  </div>
</template>

<script>
import navigateToMixin from '@/mixins/navigateToMixin'
import Modal from '@/components/Modal.vue'
import modalMixin from '@/mixins/modalMixin'
export default {
  name: 'Header',
  components: {
    Modal
  },
  mixins: [navigateToMixin, modalMixin],
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // Return to root page on logout
      this.navigateTo({ name: 'root' })
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
