<template>
  <div>
    <h1>About</h1>
    <p>
      <br />
      Welcome!<br />
      This website has a bunch of fun quizzes that will match you with other users
      only if you answer <i><b>every single question</b></i> the same. This means if
      you get a match, you can revel in how unbelievably similar your preferences are!
      This also means there will be an astronomically low amount of matches, but hey,
      that's <strike>allegedly</strike> the fun!
      <br /><br />
      Head back to the home page and the use the other big button in the middle of the
      screen to see all the quizzes. Before you start a quiz though, you'll have to make
      an account. I know I know, it sucks, but we need a way to actually create those
      matches, remember? It's really quick!
      <br /><br />
      Good luck and have fun!
    </p>
  </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "Montserrat", sans-serif;
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadein 1s; /* Firefox < 16 */
      -ms-animation: fadein 1s; /* Internet Explorer */
       -o-animation: fadein 1s; /* Opera < 12.1 */
          animation: fadein 1s;
}
p {
  text-align: justify;
  margin: auto;
  width: 70%;
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
     -moz-animation: fadein 2s; /* Firefox < 16 */
      -ms-animation: fadein 2s; /* Internet Explorer */
       -o-animation: fadein 2s; /* Opera < 12.1 */
          animation: fadein 2s;
}
@media only screen and (max-width: 600px) {
  p {
    width: 90%;
  }
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
h1 {
  font-size: 32px;
  letter-spacing: 1px;
  /* transform: scale(1.2, 1);
  -ms-transform: scale(1.2, 1);
  -moz-transform: scale(1.2, 1);
  -webkit-transform: scale(1.2, 1);
  -o-transform: scale(1.2, 1); */
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
}
</style>
