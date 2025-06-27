<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import {
  createAlbum,
  fetchAlbums,
  favoriteAlbum,
  deleteAlbum,
} from "../services/albums.js";

import favoritedIcon from "../assets/favorited.svg";
import unfavoritedIcon from "../assets/unfavorited.svg";
import noImage from "../assets/solid.jpeg";

const clientId = "3fbfb697d64046cea5904fffb80b767c";
const clientSecret = "5649f07acfd942acb3e2828b92372724";

const token = ref("");
const searchQuery = ref("");
const albums = ref([]);

const loading = ref(true);

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

const searchAlbums = async () => {
  if (!searchQuery.value.trim()) {
    albums.value = [];
    return;
  }
  if (!token.value) await getToken();

  const res = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${token.value}` },
    params: {
      q: searchQuery.value,
      type: "album",
      market: "BR",
    },
  });

  albums.value = res.data.albums.items;
};

watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === "") {
    albums.value = [];
    return;
  }
  searchAlbums();
});

const saveAlbum = async (album) => {
  try {
    await createAlbum(album);
    alert("Álbum salvo na sua biblioteca!");
  } catch (err) {
    console.error("Erro ao salvar:", err);
  }
};

onMounted(async () => {
  albums.value = await fetchAlbums();
  console.log("Álbuns carregados:", albums.value);

  loading.value = false;
});

const toggleFavorite = async (album) => {
  try {
    const newFavoriteState = !album.favorite;
    await favoriteAlbum(album.id, { favorite: newFavoriteState });
    album.favorite = newFavoriteState;
  } catch (err) {
    console.error("Erro ao atualizar favorito:", err);
  }
};

const handleDelete = async (id) => {
  try {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await deleteAlbum(id);
      albums.value = albums.value.filter((album) => album.id !== id);
    }
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error.message);
  }
};
</script>

<template>
  <div class="container">
    <h1 class="mt-4" v-if="$route.path === '/'">Pesquise novas escolhas</h1>
    <h1 class="mt-4" v-if="$route.path === '/library'">Sua biblioteca</h1>

    <div
      class="container rounded mt-4 mb-2"
      id="search-background"
      v-if="$route.path === '/'"
    >
      <input
        v-model="searchQuery"
        placeholder="Nome do álbum"
        class="mt-3 col-12 rounded p-2 mb-2"
      />

      <div
        v-if="albums.length && searchQuery != ''"
        class="d-flex align-items-center justify-content-center col-12"
      >
        <ul class="d-flex flex-wrap col-10 list-unstyled p-3 rounded">
          <li
            v-for="album in albums"
            :key="album.id"
            class="col-lg-4 col-md-6 col-12 d-block my-2 d-flex"
          >
            <img src="../assets/add.svg" class="col-1 add" @click="saveAlbum(album)" />
            <img
              :src="album.images?.[0]?.url || noImage"
              alt="Capa"
              class="rounded mx-2 album-cover"
            />

            {{ album.artists?.[0]?.name || "Artista desconhecido" }} <br />

            {{ album.name || "Álbum desconhecido" }},
            {{ album.release_date?.slice(0, 4) || "Ano desconhecido" }}
          </li>
        </ul>
      </div>

      <div
        v-if="searchQuery === ''"
        class="d-flex align-items-center justify-content-center col-12"
      >
        <ul
          class="d-lg-flex d-block justify-content-around flex-wrap col-10 list-unstyled p-3 rounded"
        >
          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>

          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>

          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>

          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>

          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>

          <li
            class="col-lg-2 col-md-6 col-12 d-block my-2 d-flex bg-grey mx-2 rounded"
          ></li>
        </ul>
      </div>
    </div>

    <div class="rounded mt-4" id="search-background" v-if="$route.path === '/library'">
      <div v-if="loading" class="d-flex justify-content-center p-2">
        <div class="spinner-border m-2" role="status">
          <span class="sr-only"></span>
        </div>
      </div>

      <!-- wrapper para centralizar o conteúdo -->
      <div v-if="albums.length" class="m-2 mx-auto" style="max-width: 1200px">
        <!-- ul com largura adaptável e centralizada -->
        <ul
          class="container d-flex flex-wrap justify-content-start"
          style="max-width: 1000px; margin: 0 auto"
        >
          <li
            v-for="album in albums"
            :key="album.id"
            class="col-lg-2 bg-light m-2 list-unstyled p-2 rounded"
          >
            <img :src="album.img" class="rounded mx-2 album-cover mt-2" />
            <p class="mt-2 mx-2">
              <b>{{ album.artist }}</b
              ><br />
              {{ album.album }}<br />
              {{ album.album_year }}<br />
              <img
                :src="album.favorite ? favoritedIcon : unfavoritedIcon"
                class="col-lg-2 col-1 add mt-2"
                @click="toggleFavorite(album)"
              />
              <img
                src="../assets/remove.svg"
                class="col-lg-2 col-1 add mt-2 mx-2"
                @click="handleDelete(album.id)"
              />
            </p>
          </li>
        </ul>
      </div>

      <div v-if="!albums.length && !loading" class="m-2 mx-auto p-2">
        <div class="d-flex justify-content-center">
          <img src="../assets/peep-61.svg" class="col-lg-2 col-6" />
        </div>

        <p class="d-flex flex-wrap justify-content-center p-2 fs-5 mx-2 mt-2">
          Adicione seus álbuns favoritos!
        </p>
        <div class="modal-footer d-flex justify-content-center mx-2">
          <RouterLink to="/">
            <button type="button" class="btn btn-dark mb-2">Clique aqui</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#search-background {
  background-color: #d9d9d9;
}

input {
  background-color: #bbbbbb;
  border: 0;
}

.add {
  cursor: pointer;
}

.add:hover {
  opacity: 75%;
}

.album-cover {
  height: 100px;
}

.bg-grey {
  height: 100px;
  width: 100px;
  background: linear-gradient(106deg, #d9d9d9, #bbbbbb, #d9d9d9);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.container {
  margin-top: 6rem;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  box-sizing: border-box;
}
</style>
