<template>
  <div>
    <h1>About</h1>
    <p>
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam tortor,
      suscipit ut magna id, vestibulum ullamcorper purus. Phasellus scelerisque,
      orci dictum malesuada molestie, tortor velit hendrerit tellus, ac
      scelerisque sapien odio et purus. Duis porttitor lorem a lorem suscipit,
      ac imperdiet ipsum lacinia. Sed dapibus dui et urna bibendum fermentum.
      <br /><br />
      Nullam commodo malesuada mi in accumsan. Nunc rutrum egestas mi sit amet
      dictum. Nunc leo tellus, ornare varius felis a, viverra consequat risus.
      Suspendisse potenti. Sed lacinia porta felis, porttitor porta ligula
      auctor sed. Vivamus eget feugiat mi. Fusce sodales iaculis nisi, nec
      vestibulum ante sollicitudin eget. Sed suscipit odio ut egestas pulvinar.
      <br /><br />
      Donec vitae ipsum neque. Etiam turpis eros, lacinia sit amet arcu nec,
      auctor laoreet ex. Fusce a elementum nisi. Nulla molestie magna at est
      facilisis suscipit. Sed quis tincidunt mauris, eget volutpat enim. Aliquam
      auctor tincidunt orci in rhoncus. Curabitur leo magna, sollicitudin vel
      arcu sit amet, dictum tincidunt elit. Donec rutrum nisi in sem ultrices
      facilisis. Suspendisse non bibendum libero, non porttitor sem. Sed in
      dictum risus. Praesent ac porttitor mi. Cras mollis non ligula eu
      fringilla. Donec blandit maximus risus sed rutrum.
      <br /><br />
      Duis rhoncus
      consectetur posuere. Integer vestibulum magna libero, eget vestibulum nibh
      convallis at. Nam ullamcorper tortor dolor, nec consequat arcu maximus
      eget. Quisque elementum in nulla pulvinar laoreet. Donec gravida
      scelerisque tincidunt. Suspendisse sit amet lobortis felis. Nunc ac mauris
      ut nulla hendrerit tincidunt. Donec lobortis orci at ex porta
      sollicitudin. Cras at consectetur orci, sit amet faucibus ipsum.
      <br /><br />
      Sed
      efficitur libero non gravida ultricies. Morbi eros nibh, consequat sed
      dolor et, vehicula blandit quam. Phasellus maximus lorem hendrerit
      accumsan molestie. Morbi eget tempor ipsum. Mauris rutrum ac nibh et
      eleifend. Nunc vestibulum augue vel elit porta, eu gravida nunc porttitor.
      Donec pellentesque, ex eu ultrices placerat, erat ipsum fringilla risus,
      nec ullamcorper est nunc facilisis ligula. Sed tempus eu leo eget rutrum.
      <br /><br />
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Curabitur vel neque rhoncus, lobortis mi vitae, blandit
      velit. Suspendisse in nibh non ex suscipit volutpat. Vivamus nisi est,
      accumsan a est quis, rutrum fringilla sem. Fusce sagittis tortor vitae
      purus pretium, cursus varius orci viverra. Proin ullamcorper justo dui,
      vel volutpat sapien interdum ut. Donec vitae nulla id libero ullamcorper
      pulvinar. Vestibulum id odio eget dolor ultrices commodo id nec lacus.
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
