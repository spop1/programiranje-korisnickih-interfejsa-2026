import type { PlantModel } from "@/models/plant,model"
import axios from "axios"


export class PlantService {
    static async getPlants() : Promise<PlantModel[]> {
        let response = await axios.request({
            method: 'GET',
            url: '/data/plants.json'
        })
        return response.data.sort((a: any, b:any) => 
                a.price - b.price
        )
    }
}