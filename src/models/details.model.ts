import type { PlantModel } from "./plant.model";

export interface DetailsModel extends PlantModel{
    other: PlantModel []
}