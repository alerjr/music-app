<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { createAlbum } from "../services/albums.js";

const clientId = "3fbfb697d64046cea5904fffb80b767c";
const clientSecret = "5649f07acfd942acb3e2828b92372724";

const token = ref("");
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

const saveAlbum = async (album) => {
  try {
    await createAlbum(album);
    alert("Álbum salvo na sua biblioteca!");
  } catch (err) {
    console.error("Erro ao salvar:", err);
  }
};

const searchAlbumsByDecades = async () => {
  const decades = [
    "1950-1959",
    "1960-1969",
    "1970-1979",
    "1980-1989",
    "1990-1999",
    "2000-2009",
    "2010-2015",
  ];
  const market = "GB";
  const targetMonth = 5; // Junho
  const tempAlbums = [];

  for (const range of decades) {
    for (let offset = 0; offset < 100; offset += 50) {
      try {
        const res = await axios.get("https://api.spotify.com/v1/search", {
          params: {
            q: `year:${range}`,
            type: "album",
            market,
            limit: 50,
            offset,
          },
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        const filtered = res.data.albums.items.filter((album) => {
          const precision = album.release_date_precision;
          if (precision === "month" || precision === "day") {
            const month = parseInt(album.release_date.slice(5, 7), 10) - 1;
            return month === targetMonth;
          }
          return false;
        });

        tempAlbums.push(...filtered);
      } catch (err) {
        console.error(
          `Erro em ${range} offset ${offset}:`,
          err.response?.data || err.message
        );
      }
    }
  }

  albums.value = tempAlbums;
};

onMounted(async () => {
  loading.value = true;
  try {
    await getToken();
    await searchAlbumsByDecades();
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container min-vh-100">
    <h1 class="mt-4">Lançamentos passados</h1>

    <div class="container rounded mt-4 mb-2" id="search-background">
      <div
        v-if="albums.length"
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
              :src="album.images[0]?.url"
              alt="Capa"
              class="rounded mx-2 album-cover"
            />

            {{ album.artists[0]?.name }} <br />

            {{ album.name }}, {{ album.release_date.slice(0, 4) }}
          </li>
        </ul>
      </div>

      <div
        class="d-flex align-items-center justify-content-center col-12"
        v-if="!albums.length && loading"
      >
        <div class="spinner-border m-2" role="status">
          <span class="sr-only"></span>
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
