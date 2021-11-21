<template>
  <div class="container">
    <base-title>All Quizzes</base-title>
    <b-row>
      <b-col md="3">
        <br />
        <div class="search">
          <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="search" type="search" placeholder="Search quizzes"></b-form-input>
        </b-input-group>
        </div>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group
          label="Per page:"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          align="left">
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm">
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <base-button
          @click="navigateTo({name: 'quizzes-create'})"
          v-if="$store.state.isUserAdmin"
          buttonPosition="right">Add Quiz
        </base-button>
      </b-col>
    </b-row>
    <br />
    <b-table
      striped
      bordered
      outlined
      head-variant='light'
      sort-icon-right
      :items="quizzes"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      responsive="sm"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc">
      <template #cell(name)="data">
        <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a>
      </template>
      <template #cell(actions)="row">
        <p style="display:inline;">
          <a href="#" @click="navigateTo({name: 'quiz', params: { quizId: row.item.id }})">Open</a>
        </p>
        <p style="display:inline;" v-if="$store.state.isUserAdmin">
          &nbsp;|&nbsp;<a href="#" v-if="$store.state.isUserAdmin" @click="deleteQuiz(row.item.id)">Delete</a>
        </p>
      </template>
      <template #cell(odds)="row">
        <p>1 / {{calculateOdds(row.item.Questions)}}</p>
      </template>
    </b-table>
    <br />
    <b-row>
      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="quizzes.length"
          :per-page="perPage"
          size="md"
          align="center"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseTitle from '@/components/BaseTitle'
import QuizzesService from '@/services/QuizzesService'
import navigateToMixin from '@/mixins/navigateToMixin'
import dateFormat from 'dateformat'
import _ from 'lodash'
export default {
  components: {
    BaseButton, BaseTitle
  },
  mixins:
    [navigateToMixin],
  data () {
    return {
      quizzes: [],
      sortBy: 'title',
      sortDesc: false,
      search: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 25, { value: 99, text: 'Max' }],
      fields: [
        {
          key: 'title', label: 'Title', sortable: true
        },
        {
          key: 'questionCount', label: 'Questions', sortable: true
        },
        {
          key: 'createdAt',
          label: 'Date Added',
          sortable: true,
          formatter: (value) => {
            return this.getFormmatedDate(value)
          }
        },
        {
          key: 'odds', label: 'Odds of match', sortable: false
        },
        {
          key: 'actions', label: 'Actions', sortable: false
        }
      ]
    }
  },
  watch: {
    // set wait time to 500ms to prevent spam
    // service calls from within search bar
    search: _.debounce(async function (value) {
      const route = {
        name: 'quizzes'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 400),
    // when $route.query.search is defined/changed, call
    // our handler to populate results from search
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.search = value
        try {
          this.quizzes = (await QuizzesService.index(value)).data
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  async mounted () {
    try {
      // redirect home if not logged in
      if (!this.$store.state.isUserLoggedIn) this.navigateTo({ name: 'root' })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async deleteQuiz (quizId) {
      try {
        // delete quiz
        await QuizzesService.delete(quizId)
        // refresh
        this.quizzes = (await QuizzesService.index()).data
      } catch (err) {
        console.log(err)
      }
    },
    calculateOdds (questions) {
      let odds = 1
      for (let question of questions) {
        odds += (odds * question.QuestionOptions.length) - odds
      }
      return odds.toString()
    },
    getFormmatedDate (date) {
      return dateFormat(date, 'mmmm dS, yyyy')
    },
    getFormattedDate: function (date) {
      return dateFormat(date, 'mmmm dS, yyyy')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
