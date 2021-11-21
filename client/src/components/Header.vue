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
            <span @click="navigateTo({ name: 'inbox' })">&nbsp;inbox</span>
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
                    my profile</a></li>
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
    <modal
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
      // Return to root page on logout
      this.navigateTo({ name: 'root' })
      // TODO verify this works from all pages
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
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

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn {
    width: 100%;
  }
}
</style>
