<script setup lang="ts">
import { PlantService } from '@/services/plant.service';
import { formatPrice } from '@/assets/utils';
import InfoCard from '@/components/InfoCard.vue';
import type { PlantModel } from '@/models/plant.model';
import { globalSearch } from '@/stores/store';
import { computed, ref } from 'vue';



const plants = ref<PlantModel[]>([])

// f- filteredPlants
const f = computed(() => {
  const sada = new Date()
  const pre6Meseci = new Date(); pre6Meseci.setMonth(sada.getMonth() - 6)
  const pre1Godine = new Date(); pre1Godine.setFullYear(sada.getFullYear() - 1)

  return plants.value.filter(p => {
    const ukucanTekst = globalSearch.text.toLowerCase()
    const ime = p.name.toLowerCase()
    const plantDate = new Date(p.productionDate)
    let prosaoText = false
    const prosaoTargetGrupu = globalSearch.selectedTargetGroups.length === 0 ||
      globalSearch.selectedTargetGroups.includes(p.targetGroup)

    if (globalSearch.searchType === 'name')
      prosaoText = ime.includes(globalSearch.name.toLowerCase())

    else if (globalSearch.searchType === 'care')
      prosaoText = p.description.toLowerCase().includes(globalSearch.text.toLowerCase())


    let prosaoStarost = true
    const prosaoKategoriju = globalSearch.selectedCategories.length === 0 ||
      globalSearch.selectedCategories.includes(p.category.toLowerCase())

    if (globalSearch.plantAge === 'under_6m')
      prosaoStarost = plantDate >= pre6Meseci


    else if (globalSearch.plantAge === 'btw_6m_1y')
      prosaoStarost = plantDate > pre1Godine && plantDate < pre6Meseci


    else if (globalSearch.plantAge === 'over_1y')
      prosaoStarost = plantDate <= pre1Godine

    return prosaoText && prosaoStarost && prosaoKategoriju && prosaoTargetGrupu

  })

})

function resetFilter() {
  globalSearch.name = ''
  globalSearch.text = ''
  globalSearch.searchType = 'name'
  globalSearch.selectedCategories = []
  globalSearch.plantAge = 'all',
    globalSearch.selectedTargetGroups = []
}

PlantService.getPlants()
  .then(data => {
    plants.value = data
  })

const getAvailableTargetGroups = computed(() => {
  const groups = new Set<string>()
  plants.value?.forEach(p => {
    groups.add(p.targetGroup)
  })
  return Array.from(groups)
})

</script>

<template>
  <div class="container-fluid px-3">
    <button class="btn btn-outline-success d-lg-none mb-3" type="button" data-bs-toggle="collapse"
      data-bs-target="#filteriPadajuci">
      <i class="fa-solid fa-bars"></i> Filters
    </button>
    <div class="row g-3">
      <!-- LEVA STRANA (CHECKBOX) -->
      <div class="col-lg-2">
        <div class="collapse d-lg-block sticky-top" id="filteriPadajuci"
          style="top: 90px; z-index: 10; max-height: calc(100vh - 110px); overflow-y: auto;">
          <div class="card bg-light border-0">
            <div class="card-body">
              <h5 class="card-title fw-bold">Filters</h5>
              <hr>
              <a href="#ciljneGrupe" data-bs-toggle="collapse"
                class="text-dark text-decoration-none d-flex justify-content-between align-items-center fw-bold pb-2 mb-3">
                Audience
                <i class="fa-solid fa-chevron-down"></i>
              </a>
              <div class="collapse" id="ciljneGrupe">
                <div class="d-flex flex-wrap gap-2 pt-2 mb-3">
                  <template v-for="(g, index) in getAvailableTargetGroups" :key="index">
                    <input type="checkbox" class="btn-check" :id="'target_' + index" :value="g"
                      v-model="globalSearch.selectedTargetGroups">
                    <label class="btn btn-outline-success btn-sm rounded-pill" :for="'target_' + index">
                      {{ g }}
                    </label>
                  </template>
                </div>
              </div>
              <hr>
              <h6 class="fw-bold mt-4 mb-3">Plant Type</h6>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <input type="checkbox" class="btn-check" id="indoor" value="indoor"
                  v-model="globalSearch.selectedCategories">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="indoor">Indoor</label>
                <input type="checkbox" class="btn-check" id="outdoor" value="outdoor"
                  v-model="globalSearch.selectedCategories">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="outdoor">Outdoor</label>
                <input type="checkbox" class="btn-check" id="bouquet" value="bouquet"
                  v-model="globalSearch.selectedCategories">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="bouquet">Bouquet</label>
              </div>
              <hr>
              <h6 class="fw-bold mt-4 mb-3">Plant Age</h6>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <input type="radio" class="btn-check" name="plantAge" id="ageAll" value="all"
                  v-model="globalSearch.plantAge">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="ageAll">Any</label>
                <input type="radio" class="btn-check" name="plantAge" id="ageUnder" value="under_6m"
                  v-model="globalSearch.plantAge">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="ageUnder">Under 6 months</label>
                <input type="radio" class="btn-check" name="plantAge" id="ageMid" value="btw_6m_1y"
                  v-model="globalSearch.plantAge">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="ageMid">6 to 12 months</label>
                <input type="radio" class="btn-check" name="plantAge" id="ageOver" value="over_1y"
                  v-model="globalSearch.plantAge">
                <label class="btn btn-outline-success btn-sm rounded-pill" for="ageOver">Over 1 year</label>
              </div>
              <hr>
              <button class="btn btn-link text-success text-decoration-none w-100 mt-4"
                @click="resetFilter()">Reset</button>
            </div>
          </div>
        </div>
      </div>
      <!-- DESNA STRANA (CARDS) -->
      <div class="col-lg-10">
        <div class="row g-3">
          <div class="col-12 col-sm-6 col-lg-4 col-xl-3" v-for="p in f" :key="p.id">
            <div class="card h-100 border-0 shadow-sm position-relative">
              <RouterLink :to="`/details/${p.id}`" style="cursor: pointer;" class="text-decoration-none">
                <img :src="p.image" class="card-img-top p-3 product-img" :alt="p.name">
              </RouterLink>
              <div class="card-body text-start d-flex flex-column">
                <RouterLink :to="`/details/${p.id}`" class="text-decoration-none text-dark">
                  <h6 class="card-title fw-bold mb-0">{{ p.name }}</h6>
                </RouterLink>
                <small class="text-muted">{{ p.category }}</small>
                <small class="text-muted">{{ p.targetGroup }}</small>
                <small class="text-muted mb-0">{{ p.productionDate }}</small>
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                  <span class="fs-4 fw-bold mb-0 text-success">{{ formatPrice(p.price) }} <small
                      class="fs-6"></small></span>
                  <RouterLink :to="`/order/${p.id}`"
                    class="btn btn-success rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
                    style="width: 48px; height: 48px;">
                    <i class="fa-solid fa-cart-shopping fs-5"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InfoCard title="Not Found" v-if="f.length === 0 && plants.length > 0">
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

<style scoped></style>
