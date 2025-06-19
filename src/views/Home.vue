<script setup>
import SearchAlbum from "../components/SearchAlbum.vue";
</script>

<template>
  <div class="min-vh-100">
    <SearchAlbum class="mb-4" />

    <div class="container">
      <div
        class="d-flex justify-content-between center flex-wrap p-4 mb-4 rounded"
        id="search-background"
      >
        <div class="col-6 text-start p-2">
          <RouterLink to="/releases"><h2 class="mt-4 mx-lg-4">Novidades</h2></RouterLink>
          <p class="mt-4 mx-lg-4 col-lg-6 col-12">
            Confira os lançamentos mais recentes que ocorreram nas últimas semanas.
          </p>
        </div>

        <div class="col-6 d-flex justify-content-center align-items-center">
          <div class="col-6 mx-lg-2 mx-1">
            <img
              src="https://i.scdn.co/image/ab67616d0000b2734c27710bdda0ce5096d1b12e"
              class="rounded col-lg-10 col-12"
            />
          </div>
          <div class="col-6 mx-lg-2 mx-1">
            <img
              src="https://i.scdn.co/image/ab67616d0000b273ec92248aecf970a5e6eae916"
              class="rounded col-lg-10 col-12"
            />
          </div>
        </div>
      </div>

      <hr class="d-lg-none d-block" />

      <div class="container d-lg-flex d-block justify-content-center gap-4">
        <div
          class="d-lg-flex d-block justify-content-between align-items-center flex-wrap p-4 mb-4 rounded col-lg-6 col-12"
          id="search-background"
        >
          <div class="col-lg-6 col-12 text-start p-lg-2 p-0">
            <RouterLink to="/library">
              <h2 class="mt-4 col-lg-12 col-4 d-lg-none">Seus queridinhos</h2></RouterLink
            >
            <img
              src="https://i.scdn.co/image/ab67616d0000b273584302fee10c0d0a12c40c97"
              class="rounded col-lg-10 col-12"
            />
            <p class="mt-4 col-lg-12 col-6 d-lg-none">
              Reveja seus discos marcados como favoritos.
            </p>
          </div>

          <div class="col-lg-6 col-12 text-start p-2 d-lg-block d-none">
            <RouterLink to="/library"
              ><h2 class="mt-4 mx-lg-4">Seus queridinhos</h2></RouterLink
            >
            <p class="mt-4 mx-lg-4 col-lg-6 col-12">
              Reveja seus discos marcados como favoritos.
            </p>
          </div>
        </div>

        <div
          class="d-lg-flex d-block justify-content-between align-items-center flex-wrap p-4 mb-4 rounded col-lg-6 col-12"
          id="search-background"
        >
          <div class="col-lg-6 col-12 text-start p-2">
            <RouterLink to="/throwback"
              ><h2 class="mt-4 mx-lg-4">Esse mês...</h2></RouterLink
            >
            <p class="mt-4 mx-lg-4 col-lg-6 col-12">
              Descubra lançamentos desse mês, mas de 60 anos atrás.
            </p>
          </div>

          <div class="col-lg-6 col-12 text-start p-2">
            <img
              src="https://i.scdn.co/image/ab67616d0000b273a7865e686c36a4adda6c9978"
              class="rounded col-lg-10 col-12"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#search-background {
  background-color: #d9d9d9;
}

a {
  text-decoration: none;
  color: black;
}
</style>
