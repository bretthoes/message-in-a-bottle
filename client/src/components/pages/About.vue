<template>
  <div>
    <base-title>About</base-title>
    <p>
      <br />
      Welcome!
      <br />
      This website has a bunch of fun quizzes that will match you with other users,
      and you can then chat with them in your inbox (link to inbox in top right).
      But, there's a catch! You only match if you answer <i><b>every single question
      </b></i> on the quiz with the same answer. This means if you get a match, you
      can revel in how unbelievably cool and similar you two are! This also means
      there will be an astronomically low amount of matches, but hey, that's
      <strike>allegedly</strike> the fun!
      <br />
      <br />
      Head back to the home page and the use the other big button in the middle of the
      screen to see all the quizzes. Before you start a quiz though, you'll have to make
      an account. I know I know, it sucks, but we need a way to actually create those
      matches, right? It's really quick!
      <br />
      <br />
      Good luck and have fun!
    </p>
  </div>
</template>

<script>
import BaseTitle from '@/components/ui/BaseTitle'
export default {
  name: 'About',
  components: {
    BaseTitle
  }
}
</script>

<!-- Add "scop
BaseTitleed" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: justify;
  margin: auto;
  width: 70%;
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
}
</style>
