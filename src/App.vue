<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { UserService } from './services/user.service';
import { globalSearch } from './stores/store';

const router = useRouter()
const route = useRoute()


function logout() {
  if (!confirm('Are you sure you want to sign out?'))
    return

  UserService.logout()
  router.push('/login')
}

</script>
<template>
  <nav class="navbar navbar-expand-lg bg-dark mb-3 sticky-top shadow-sm" data-bs-theme="dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-seedling"></i>
        Plants
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" aria-current="page" to="/">
              <i class="fa-solid fa-house"></i>
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" aria-current="page" to="/about">
              <i class="fa-solid fa-circle-info"></i>
              About
            </RouterLink>
          </li>
          <!-- ULOGOVAN -->
          <template v-if="UserService.getActiveUser()">
            
            <li class="nav-item">
              <button type="button" class="nav-link" @click="logout()">
                <i class="fa-solid fa-right-to-bracket"></i> Logout
              </button>
            </li>

          </template>
          <!-- NIJE ULOGOVAN -->
          <template v-else>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/login">
                <i class="fa-solid fa-user"></i> Login
              </RouterLink>
            </li>
          </template>
        </ul>
        <!-- PRETRAGA -->
        <form v-if="!route.meta.hideSearch" class="d-flex flex-grow-1 mx-lg-5" role="search" @submit.prevent>
          <div class="input-group bg-secondary rounded-pill p-1">
            <select v-model="globalSearch.searchType"
              class="form-select bg-transparent border-0 text-white shadow-none" style="max-width: 130px">
              <option value="" disabled class="text-dark">Search by:</option>
              <option value="name" class="text-dark">Name</option>
              <option value="care" class="text-dark">Description & Care</option>
            </select>
            <input v-if="globalSearch.searchType === 'name'" class="form-control bg-transparent border-0 text-white border-start shadow-none px-3" type="search"
              placeholder="Search by name..." v-model="globalSearch.name" />
              <input v-if="globalSearch.searchType === 'care'" class="form-control bg-transparent border-0 text-white border-start shadow-none px-3" type="search"
              placeholder="Search by care..." v-model="globalSearch.text" />
            <button class="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-2"
              type="submit">
              <i class="fa-solid fa-magnifying-glass m-1"></i>
            </button>
          </div>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 flex-row gap-4 align-items-center">
          <li class="nav-item">
            <RouterLink class="nav-link fs-5 text-white" active-class="active" to="/login">
              Account
              <i class="fa-regular fa-circle-user"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fs-5 position-relative text-white" active-class="active" to="/user">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success  text-dark"
                style="font-size: 0.65rem;">
                0
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
