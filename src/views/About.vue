<script setup></script>

<template>
  <div class="container min-vh-100">
    <h1 class="mt-4 text-lg-start text-center">Sobre o app</h1>

    <div class="d-flex flex-wrap justify-content-between mt-4">
      <div class="col-lg-3 col-12 card p-4 mb-2">
        <img src="../assets/peep-25.svg" alt="" />
        <hr />
        <h2 class="mt-4">Descrição</h2>
        <p class="mb-3">
          Essa aplicação tem como foco ser uma plataforma para salvar e também favoritar
          escolhas musicais dos mais variados catálogos de artistas, disponibilizados pelo
          Spotify, além de fornecer recomendações personalizadas por data.
        </p>
      </div>

      <div class="col-lg-3 col-12 card p-4 mb-2">
        <img src="../assets/peep-standing-3.svg" />
        <hr />
        <h2 class="mt-4">Objetivo</h2>
        <p class="mb-3">
          Aqui o objetivo é buscar a partir da
          <a href="https://developer.spotify.com/documentation/web-api" target="blank"
            >API</a
          >
          do Spotify álbuns e músicas para deixar armazenados na biblioteca do usuário,
          permitindo que tais informações persistam na aplicação para consulta posterior e
          também para que seja possível favoritar e excluir determinados registros que o
          usuário desejar.
        </p>
      </div>

      <div class="col-lg-5 col-12 card p-4 mb-4">
        <img src="../assets/peep-sitting-12.svg" />
        <hr />
        <h2 class="mt-4">Tecnologias, bibliotecas e frameworks utilizados</h2>
        <div class="d-flex mt-4 flex-wrap align-items-center justify-content-between">
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            HTML
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            CSS
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            Javascript
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            Vue
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            Bootstrap
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            Supabase
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-4 mx-2 mb-2 text-center rounded"
          >
            Axios
          </div>
          <div
            class="bg-dark text-light p-2 col-xl-3 col-5 mx-2 mb-2 text-center rounded"
          >
            Vue3Marquee
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 6rem;
}

img {
  height: 15rem;
}

.card {
  background-color: #d9d9d9;
  border: 0;
}

a {
  text-decoration: none;
  color: rgb(99, 99, 99);
}

.text-light {
  color: #d9d9d9;
}

.bg-dark:hover {
  opacity: 75%;
  cursor: default;
}
</style>
