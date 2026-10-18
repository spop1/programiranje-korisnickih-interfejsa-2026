<script setup lang="ts">
import { PlantService } from '@/assets/services/plant.service';
import { formatPrice } from '@/assets/utils';
import InfoCard from '@/components/InfoCard.vue';
import type { PlantModel } from '@/models/plant.model';
import { globalSearch } from '@/store';
import { ref, watch } from 'vue';



const plants = ref<PlantModel[]>([])
const filtered = ref<PlantModel[]>([])


// Funkcija filtriranja po datumu
watch(globalSearch, () => {
  const sada = new Date()
  const pre6Meseci = new Date(); pre6Meseci.setMonth(sada.getMonth() - 6)
  const pre1Godine = new Date(); pre1Godine.setFullYear(sada.getFullYear() - 1)

  filtered.value = plants.value.filter(p => {
    const ukucanTekst = globalSearch.text.toLowerCase()
    const ime = p.name.toLowerCase()
    const prosaoText = ime.includes(ukucanTekst)
    const plantDate = new Date(p.productionDate)
    let prosaoStarost = true

    if (globalSearch.plantAge === 'under_6m')
      prosaoStarost = plantDate >= pre6Meseci

    else if (globalSearch.plantAge === 'over_1y')
      prosaoStarost = plantDate <= pre1Godine

    return prosaoText && prosaoStarost

  })

})

function resetFilter() {
  globalSearch.text = ''
  globalSearch.category = 'any'
  globalSearch.plantAge = 'all'
}

PlantService.getPlants()
  .then(data => {
    plants.value = data
    filtered.value = data
  })

function getAvailableDates() {
  const dates = new Set<string>()
  plants.value?.forEach(p => {
    dates.add(p.productionDate)
  })
  return Array.from(dates)
}
</script>

<template>
  <div class="container-fluid px-3">
    <!-- <InfoCard></InfoCard> -->
    <div class="row g-3">
            <!-- LEVA STRANA (CHECKBOX) -->
      <div class="col-12 col-md-2">
        <div class="card sticky-top" style="top: 90px; z-index: 10;">
          <div class="card-body">
            <h5 class="card-title">Filters</h5>
            <hr>
            <p>Pretraga i sortiranje</p>
          </div>
          <div class="card-footer mt-4">
            <label class="form-label fw-bold">Plant Age</label>
            <select class="form-select" v-model="globalSearch.plantAge">
              <option value="all">Any</option>
              <option value="under_6m">Under 6 months</option>
              <option value="over_1y">Over 1 year</option>
            </select>
            <button class="btn btn-outline-success w-100 mt-3" @click="resetFilter()">Reset</button>
          </div>
        </div>
      </div>
      <!-- DESNA STRANA (CARDS) -->
      <div class="col-12 col-md-9">
        <div class="row g-3">
          <div class="col-12 col-sm-6 col-lg-4 col-xl-3" v-for="p in filtered" :key="p.id">
            <div class="card h-100 border-0 shadow-sm position-relative">
              <RouterLink :to="`/details/${p.id}`" style="cursor: pointer;" class="text-decoration-none">
                <img :src="p.image" class="card-img-top p-3 product-img" :alt="p.name">
              </RouterLink>
              <div class="card-body text-start d-flex flex-column">
                <RouterLink :to="`/details/${p.id}`" class="text-decoration-none text-dark">
                  <h6 class="card-title fw-bold mb-0">{{ p.name }}</h6>
                </RouterLink>
                <small class="text-muted">{{ p.category }}</small>
                <small class="text-muted mb-0">{{ p.productionDate }}</small>
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                  <span class="fs-4 fw-bold mb-0">{{ formatPrice(p.price) }} <small class="fs-6">RSD</small></span>

                  <button
                    class="btn btn-success rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
                    style="width: 48px; height: 48px;">
                    <i class="fa-solid fa-cart-shopping fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InfoCard title="Not Found"v-if="filtered.length == 0 && filtered.length < plants.length">
          <p>
            Couldn't find any plants for that criteria.
          </p>
          <button type="button" class="btn btn-primary" @click="resetFilter()">
            Reset Filters
          </button>
        </InfoCard>

        <InfoCard title="Loading" v-if="plants.length == 0">
          Loading data... please wait
        </InfoCard>
      </div>
    </div>
  </div>
  </template>

<style scoped>
.product-img {
  height: 250px;
  object-fit: cover;
  width: 100%;
}
</style>
