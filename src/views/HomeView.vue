<script setup lang="ts">
import { PlantService } from '@/assets/services/plant.service';
import { formatPrice } from '@/assets/utils';
import type { PlantModel } from '@/models/plant,model';
import { ref } from 'vue';



const plants = ref<PlantModel[]>()

PlantService.getPlants()
  .then(data => plants.value = data)
</script>

<template>
  <div class="container mt-5">
    <!-- <div class="d-flex justify-content-end mb-4">
      <button @click="" class="btn btn-outline-success">
        Sort by Price
      </button>
    </div> -->
    <div class="row">
      <div class="col-12 col-md-3" v-for="p in plants" :key="p.id">
        <div class="card text-center">
          <img :src="p.image" class="card-img-top" :alt="p.name">
          <div class="card-body">
            <h5 class="card-title">{{ p.name }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ formatPrice(p.price) }} EUR</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ p.category }} </h6>
            <!-- <p class="card-text"></p> -->
            <RouterLink :to="`/details${p.id}`" class="btn btn-primary">
              Details
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <pre>{{ plants }}</pre>
</template>
