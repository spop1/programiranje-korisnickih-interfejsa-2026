<script setup lang="ts">
import { PlantService } from '@/services/plant.service';
import { formatPrice } from '@/assets/utils';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { DetailsModel } from '@/models/details.model';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const details = ref<DetailsModel>()

const order = ref({
    plantId: id,
    quantity: 1
})

const totalPrice = computed(() => {
    if (!details.value) return 0
    return details.value.price * order.value.quantity
})

function addToCart() {
    console.log("Spremno za slanje u korpu:", order.value)
    router.push('/order/' + order.value.plantId)
}

PlantService.getPlantById(id)
    .then(plant => {
        if (plant) {
            PlantService.getPlants().then(all => {
                const similar = all.filter(p => p.category == plant.category && p.id != plant.id)
                    .slice(0, 3)

                details.value = {
                    ...plant,
                    other: similar
                }
            })
        }
    })
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

                <!-- Birač količine i ukupna cena -->
                <div class="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <div class="d-flex align-items-center">
                        <span class="me-3">Quantity:</span>
                        <div class="input-group" style="width: 130px;">
                            <button class="btn btn-outline-secondary" type="button"
                                @click="order.quantity > 1 ? order.quantity-- : null">-</button>
                           <input type="number" class="form-control text-center" v-model.number="order.quantity" min="1">
                            <button class="btn btn-outline-secondary" type="button" @click="order.quantity++">+</button>
                        </div>
                    </div>
                    <div class="fs-4 fw-bold text-success">
                        {{ totalPrice }} EUR
                    </div>
                </div>

                <!-- Dugme sa ikonom -->
                <button class="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2 py-2"
                    @click="addToCart">
                    <i class="fa-solid fa-cart-shopping fs-5"></i>
                    <span>Dodaj u korpu</span>
                </button>
            </div>
        </div>
        <!-- REVIEWS -->
        <div class="mt-3" v-if="details && details.reviews.length > 0">
            <div class="col-12 mb-2">
                <h5>Reviews:</h5>
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
        <!-- SIMILAR PLANTS -->
        <div class="mt-5" v-if="details && details.other?.length > 0">
            <h3 class="mb-4">Recommended:</h3>
            <div class="row">
                <div class="col-md-4 mb-4" v-for="p in details.other" :key="p.id">
                    <div class="card h-100 shadow-sm">
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
                                <span class="fs-4 fw-bold mb-0">{{ formatPrice(p.price) }} <small
                                        class="fs-6">RSD</small></span>
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
        </div>
    </div>
</template>
