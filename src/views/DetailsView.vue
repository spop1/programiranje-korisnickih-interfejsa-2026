<script setup lang="ts">
import { PlantService } from '@/assets/services/plant.service';
import type { PlantModel } from '@/models/plant.model';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)

const details = ref<PlantModel>()
PlantService.getPlantById(id)
    .then(rsp => details.value = rsp)
</script>

<template>
    <div class="container-fluid px-4">
        <div class="row" v-if="details">
            <div class="col-12 col-md-6 mb-3">
                <img :src="details.image" alt="image" class="img-fluid">
            </div>
            <div class="col-12 col-md-6 mb-3">
                <div class="card fs-5 lh-lg bg-light">
                    <div class="card-header border-bottom-0 bg-transparent">
                        <strong>
                            {{ details.name }}
                        </strong>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-transparent">
                                <strong>{{ details.price }} EUR</strong>
                            </li>
                            <li class="list-group-item bg-transparent">
                                <i class="fa-solid fa-leaf text-success me-2"></i>
                                {{ details.category }}
                            </li>
                            <li class="list-group-item bg-transparent">
                                <i class="fa-solid fa-people-group text-info me-2"></i>
                                {{ details.targetGroup }}
                            </li>
                            <li class="list-group-item bg-transparent">
                                <i class="fa-solid fa-book-open text-primary me-2"></i>
                                {{ details.description }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- RATES -->
        <div class="mt-3" v-if="details && details.reviews.length > 0">
            <div class="col-12 mb-2">
                <h5>Rates:</h5>
            </div>
            <div class="row mb-3" v-for="p in details.reviews" :key="p.username">
                <div class="col-12 col-md-6">
                    <div class="card fs-5 shadow-sm bg-light">
                        <div class="card-header border-bottom-0 bg-transparent">
                            <strong>
                                {{ p.rating }}</strong>
                            <span class="text-warning ms-1">
                                <i class="fa-solid fa-star"></i>
                            </span>
                            <div class="float-end">
                                <span class="text-secondary"> {{ p.username }} {{ p.date }}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">
                                {{ p.comment }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <p>ID: {{ id }}</p>
    <pre>{{ details }}</pre> -->
</template>

