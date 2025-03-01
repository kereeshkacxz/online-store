<template>
  <div class="header_wrapper">
    <div class="header">
      <NuxtLink class="text_logo" to="/">STORE</NuxtLink>
      <div class="catalog_button">Каталог</div>
      <div class="search_field">
        <input
          placeholder="Искать..."
          class="search_input"
          v-model="searchQuery"
          @keyup.enter="searchFunc"
        />
        <NuxtImg
          preload
          src="search.svg"
          class="search_icon"
          @click="searchFunc"
        />
      </div>
      <div class="header_button">
        <NuxtImg preload src="cart.svg" class="header_button_icon" />
        <NuxtLink class="header_button_title" to="/cart">Корзина</NuxtLink>
      </div>
      <div class="header_button">
        <NuxtImg preload src="profile.svg" class="header_button_icon" />
        <NuxtLink class="header_button_title" to="/profile">Профиль</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
function searchFunc() {
  console.log(searchQuery.value);
}
</script>

<style scoped>
.header_wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 100px;
  padding-right: 100px;
}
.header {
  width: 100%;
  padding: 20px 40px;
  background-color: #ffffff;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

.text_logo {
  color: var(--main-color);
  font-family: "ADLaM Display";
  font-size: 50px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  text-decoration: none;
}
.text_logo:hover {
  color: #0187bd;
}

.catalog_button {
  color: white;
  background-color: var(--main-color);
  height: 50px;
  padding: 0px 25px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: all 0.3s;
  cursor: pointer;
}
.catalog_button:hover {
  background-color: #0187bd;
}

.search_field {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 0px 20px;
  height: 50px;
  border-radius: 50px;
  transition: border 0.3s;
  border: 2px solid white;
  flex: 1;
}
.search_field:focus-within {
  border: 2px solid var(--main-color);
}
.search_input {
  width: 100%;
  padding: 5px;
  border: none;
  outline: none;
}
.search_input::placeholder {
  color: var(--main-color);
}
.search_input:focus {
  border: none;
}
.search_icon {
  aspect-ratio: 1/1;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
}
.search_icon:hover {
  filter: brightness(0.7);
}
.header_button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: all 0.3s;
}
.header_button_title {
  color: #d1d1d1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transition: all 0.3s;
}
.header_button:hover .header_button_title {
  filter: brightness(0.7);
}
.header_button_icon {
  aspect-ratio: 1/1;
  height: 25px;
  transition: all 0.3s;
}
.header_button:hover .header_button_icon {
  filter: brightness(0.7);
}
@media (max-width: 1000px) {
  .header_wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
