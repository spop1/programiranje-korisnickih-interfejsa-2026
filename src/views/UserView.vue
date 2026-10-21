<script lang="ts" setup>
import { useLogin } from '@/hooks/login.hook';
import { UserService } from '@/services/user.service';
import { onMounted, ref } from 'vue';

const validateLogin = useLogin()
const user = ref(UserService.getActiveUser())

onMounted(() => validateLogin())
</script>

<template>
    <div class="card">
        <table class="table align-middle mb-0 table-striped" v-if="user">
            <thead>
                <tr>
                    <th scope="col">Biljka</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cijena</th>
                    <th scope="col" class="text-end">Akcije</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in user.orders" :key="u.createdAt">
                    <td class="fw-bold">Biljka #{{ u.plantId }}</td>
                    <td>
                        <span v-if="u.status === 'rezervisano'" class="badge bg-primary">Rezervisano</span>
                        <span v-else-if="u.status === 'pristiglo'" class="badge bg-success">Pristiglo</span>
                        <span v-else-if="u.status === 'otkazano'" class="badge bg-secondary">Otkazano</span>
                        <span v-else class="badge bg-dark">{{ u.status }}</span>
                    </td>

                    <td>{{ u.pricePerPlant }} EUR</td>

                    <td class="text-end">
                        <button v-if="u.status === 'rezervisano'"
                            class="btn btn-sm btn-outline-secondary me-2">Uredi</button>
                        <button v-if="u.status === 'pristiglo'"
                            class="btn btn-sm btn-outline-warning me-2">Ocjeni</button>
                        <button v-if="u.status === 'pristiglo'" class="btn btn-sm btn-danger">Izbriši</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-end">
                        <span class="fw-bold fs-4">Total: 0EUR</span>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div class="card-footer d-flex justify-content-end bg-white ">
            <button type="button" class="btn btn-success ms-auto">
                <i class="fa-solid fa-credit-card"></i> Checkout
            </button>
        </div>
    </div>
    <pre>{{ UserService.getActiveUser() }}</pre>
</template>