<script lang="ts" setup>
import { useLogin } from '@/hooks/login.hook';
import type { DetailsModel } from '@/models/details.model';
import { PlantService } from '@/services/plant.service';
import { UserService } from '@/services/user.service';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const details = ref<DetailsModel>()
const route = useRoute()
const id = Number(route.params.id)
const validateLogin = useLogin()
const router = useRouter()

const order = ref({
    plantId: id,
    quantity: 1
})

PlantService.getPlantById(id)
    .then(data => {
        if (data) {
            details.value = {
                ...data,
                other: []
            }
        } else {
            console.error("3. Greška: Servis nije pronašao biljku sa ovim ID-em!")
        }
    })

function createOrder() {
    if (!confirm('Are you sure you want to place an order?'))
    return

    UserService.addOrder({
        plantId: id,
        status: 'rezervisano',
        createdAt: new Date().toISOString(),
        arrivedAt: null,
        canceledAt:  null,
        totalCount: order.value.quantity,
        pricePerPlant: Number(details.value?.price)
    })

    router.push('/user')
}

onMounted(() => validateLogin())

const totalprice = computed(() => {
    const perItem = Number(details.value?.price || 0)

    return perItem * order.value.quantity


})
</script>

<template>
    <div class="container mt-4" v-if="details">
        <h2 class="mb-4">Complete Your Order</h2>
        <div class="row">
            <!-- Leva strana: Slika i osnovne informacije -->
            <div class="col-12 col-md-6 mb-3">
                <img :src="details.image" alt="plant image" class="img-fluid rounded shadow-sm">
            </div>

            <!-- Desna strana: Forma za naručivanje (Asistentov šablon) -->
            <div class="col-12 col-md-6 mb-3">
                <div class="card p-4 shadow-sm bg-light">
                    <h3 class="fw-bold mb-3">{{ details.name }}</h3>
                    <p class="text-muted mb-2"><i class="fa-solid fa-leaf text-success me-2"></i>{{ details.category }}
                    </p>
                    <p class="fs-4 fw-bold text-success mb-4">{{ totalprice }} EUR</p>

                    <!-- Input za količinu (v-model vezan za order.quantity) -->
                    <div class="mb-3">
                        <label class="form-label fw-bold">Quantity:</label>
                        <input type="number" class="form-control" v-model.number="order.quantity" min="1">
                    </div>
                    <!-- Dugme za potvrdu -->
                    <button type="button" class="btn btn-success w-100 py-2 mt-2" @click="createOrder">
                        <i class="fa-solid fa-cart-shopping me-2"></i> Confirm, and add to cart
                    </button>
                </div>
            </div>
        </div>

        <!-- Prikaz objekta za lakše praćenje i testiranje -->
        <div class="mt-4">
            <small class="text-muted">Debug - Trenutni order objekat:</small>
            <pre class="bg-dark text-light p-3 rounded mt-1">{{ order }}</pre>
        </div>
    </div>
    <div class="container mt-4 text-center" v-else>
        <h3>Učitavanje podataka... (ili podaci ne postoje)</h3>
    </div>
</template>