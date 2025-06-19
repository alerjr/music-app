<script setup></script>

<template>
  <footer class="footer mt-auto text-dark bg-light">
    <!-- Copyright -->
    <div class="text-center p-3 w-100">
      Desenvolvido por Alessandro Rocha Junior
      <a href="https://github.com/alerjr" target="blank"
        ><img src="../assets/git.svg" class="col-1 mx-lg-2 mx-1 logo"
      /></a>
      {{ new Date().getFullYear() }}.
    </div>
    <!-- Copyright -->
  </footer>
</template>

<style scoped>
footer {
  font-size: 1rem;
}

.logo {
  width: 2rem;
}

.logo:hover {
  opacity: 75%;
  cursor: pointer;
}
</style>
