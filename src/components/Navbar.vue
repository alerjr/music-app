<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { Vue3Marquee } from "vue3-marquee";

import favoritedIcon from "../assets/favorited.svg";
import unfavoritedIcon from "../assets/unfavorited.svg";

const token = ref("");
const searchQuery = ref("");
const songs = ref([]);

const pickedSong = ref("");

const setpickedSong = (song) => {
  pickedSong.value = `${song.artists[0]?.name} - ${song.name}`;
};

const savepickedSong = () => {
  if (!pickedSong.value) return;
  localStorage.setItem("mySong", pickedSong.value);
  alert("Música salva!");
};

onMounted(() => {
  const saved = localStorage.getItem("mySong");
  if (saved) {
    pickedSong.value = saved;
  }
});

const clientId = "3fbfb697d64046cea5904fffb80b767c";
const clientSecret = "5649f07acfd942acb3e2828b92372724";

const getToken = async () => {
  const authHeader = btoa(`${clientId}:${clientSecret}`);
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  token.value = res.data.access_token;
};

const searchSongs = async () => {
  if (!token.value) await getToken();

  const res = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${token.value}` },
    params: {
      q: searchQuery.value,
      type: "track,artist",
      market: "BR",
    },
  });

  songs.value = res.data.tracks.items;
};

watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === "") {
    songs.value = [];
    return;
  }
  searchSongs();
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <RouterLink
        to="/"
        class="navbar-brand mx-2"
        v-bind:style="
          $route.path == '/'
            ? 'cursor: default; opacity: 100%; font-weight: 700'
            : 'opacity: 75%'
        "
      >
        <img src="../assets/cd.svg" class="col-1 mb-lg-0 mb-2 nav-logo" />
      </RouterLink>

      <!-- Toggler atualizado para Bootstrap 5 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Tudo que colapsa precisa estar aqui dentro -->
      <div
        class="collapse navbar-collapse d-lg-flex justify-content-lg-end text-start m-2"
        id="navbarCollapse"
      >
        <ul class="navbar-nav me-auto mx-2">
          <li class="nav-item active">
            <RouterLink
              to="/library"
              class="nav-link"
              v-bind:style="
                $route.path == '/library'
                  ? 'cursor: default; opacity: 100%; font-weight: 700'
                  : ''
              "
              >Minhas escolhas
            </RouterLink>
          </li>
          <li class="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <a class="nav-link">Ouvindo agora</a>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link"
              v-bind:style="
                $route.path == '/about'
                  ? 'cursor: default; opacity: 100%; font-weight: 700'
                  : ''
              "
              >Sobre</RouterLink
            >
          </li>
        </ul>

        <form class="mx-2 col-lg-5 col-12 listening rounded">
          <Vue3Marquee speed="50">
            <div class="p-2">Ouvindo: {{ pickedSong }}</div>
          </Vue3Marquee>
        </form>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h1 class="text-center modal-title fs-3 mb-2" id="exampleModalLabel">
            Ouvindo agora
          </h1>

          <div class="d-flex justify-content-center">
            <img src="../assets/guitar.svg" class="col-4" />
          </div>
          <p class="text-center">Defina qual música melhor te define no momento:</p>

          <div class="container col-10">
            <input
              class="form-control mb-2"
              type="search"
              placeholder="Ouvindo"
              aria-label="Search"
              v-model="searchQuery"
            />

            <ul class="list-unstyled mx-2" v-if="searchQuery">
              <li v-for="song in songs" :key="song.id" class="mt-2">
                {{ song.artists[0]?.name }} - {{ song.name }}
                <img
                  :src="`${
                    pickedSong === song.artists[0]?.name + ' - ' + song.name
                      ? favoritedIcon
                      : unfavoritedIcon
                  }`"
                  class="col-1 like"
                  @click="setpickedSong(song)"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-dark mb-2" @click="savepickedSong">
            Salvar música
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}

.nav-logo {
  width: 2rem;
}

.modal-header,
.modal-footer {
  border-top: 0;
  border-bottom: 0;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: none;
  background-color: #bbbbbb;
}

input,
.listening {
  background-color: #bbbbbb;
  border: 0;
}

.like {
  width: 1rem;
  cursor: pointer;
}

.listening {
  font-size: 0.9rem;
}
</style>
