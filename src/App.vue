<script setup lang="ts">
import { globalSearch } from './store';


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
        </ul>
        <form class="d-flex flex-grow-1 mx-lg-5" role="search" @submit.prevent>
          <div class="input-group bg-secondary rounded-pill p-1">
            <input class="form-control bg-transparent border-0 text-white shadow-none px-3" type="search"
              placeholder="Search plants..." aria-label="Search" v-model="globalSearch.text" />
            <button class="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-2"
              type="submit" title="Search">
              <i class="fa-solid fa-magnifying-glass m-1"></i>
            </button>
          </div>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 flex-row gap-4 align-items-center">
          <li class="nav-item">
            <RouterLink class="nav-link fs-5 text-white" active-class="active" to="/login">
              <i class="fa-regular fa-circle-user"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fs-5 position-relative text-white" active-class="active" to="/">
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

  <RouterView :key="$route.fullPath" />
</template>
