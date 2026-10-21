import type { PlantModel } from "@/models/plant.model"
import axios from "axios"

const client = axios.create({
    baseURL: '/'
})

export class PlantService {
    static async getPlants(): Promise<PlantModel[]> {
        let response = await client.request({
            method: 'GET',
            url: '/data/plants.json'
        })
        return response.data.sort((a: any, b: any) =>
            a.price - b.price
        )
    }

    static async getPlantById(id: number) {
        const allPlants = await PlantService.getPlants()
        
        return allPlants.find(p => p.id === id )
    }
}
