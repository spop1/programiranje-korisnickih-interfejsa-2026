<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark mb-3 sticky-top shadow-sm" data-bs-theme="dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-seedling"></i>
        Navbar
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
        <form class="d-flex" role="search">
          <input class="form-control me-2 bg-white text-dark" data-bs-theme="light" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView :key="$route.fullPath"/>
  </div>
</template>
