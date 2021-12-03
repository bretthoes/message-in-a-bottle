<template>
  <div>
    <nav>
      <ul>
        <li>
          <a href="#">
            <span @click="navigateTo({ name: 'root' })">&nbsp;home</span>
            </a>
        </li>
        <li v-if="$store.state.isUserLoggedIn">
          <a href="#" v-if="$store.state.user.isAdmin">
            <span @click="navigateTo({ name: 'stats' })">&nbsp;stats</span>
          </a>
        </li>
        <li v-if="$store.state.isUserLoggedIn">
          <a href="#">
            <span @click="navigateTo({ name: 'inbox' })">&nbsp;inbox</span>
          </a>
        </li>
        <li v-if="$store.state.isUserLoggedIn">
          <a href="#">
            <span v-b-toggle="'collapse-1'">
              &#x25BE;{{ $store.state.user.username }}
            </span>
            <b-collapse id="collapse-1">
              <b-card>
                <ul class='dropdown'>
                  <li><a href='#'
                    v-b-toggle="'collapse-1'"
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
        <li v-if="!$store.state.isUserLoggedIn">
          <a
            href="#"
            @click="openModal(false)"
            ><span>&nbsp;login</span></a
          >
        </li>
        <li v-if="!$store.state.isUserLoggedIn">
          <a
            href="#"
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
/**
 * Component for header nav used on all pages of app.
 */
export default {
  name: 'Header',
  components: {
    Modal
  },
  mixins: [navigateToMixin, modalMixin],
  methods: {
    /**
     * Gets called when the user logs out.
     */
    logout () {
      // Return to root page on logout
      this.navigateTo({ name: 'root' })
      // dispatch current token and user on logout
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // Display toast on logout
      this.$toasted.show('Logout Successful.', {
        theme: 'outline',
        position: 'bottom-center',
        duration: 5000
      })
    }
  }
}
</script>

<style scoped>
* {
  list-style-type: none;
  text-decoration: none;
  text-transform: lowercase;
  color: black;
  font-size: 22px;
}
.dropdown > li > a {
  transform: skew(12deg);
  display: inline-block;
}
.dropdown > li > a:hover {
  text-decoration: underline;
  color: black;
}
nav {
  text-align: right;
}
nav > ul > li > a,
nav > ul,
nav > ul > li {
  padding-right: 12px;
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
  outline: 1px solid black;
}
</style>
