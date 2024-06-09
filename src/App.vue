<script setup lang="ts">
import Navbar from './components/Navbar.vue'

</script>
<template>
  <div class="section">
    <div class="container">
      <Navbar></Navbar>
      <RouterView/>
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "../node_modules/highlight.js/styles/atom-one-dark.css";
/* @import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/monokai.min.css"; */


ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1, h2, h3, h4, h5, h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
