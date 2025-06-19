<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap");

input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: none;
}

* {
  font-family: "Onest", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
</style>
